const http = require('http');
const server = http.createServer();

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
]

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    description: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    description: "Request/Response와 Stateless!!",
    userId: 1,
  },
];

// 기존 하드코딩된 내용을 나와야 할 결과 틀에 맞춰 변환
let postsList = [];
for (let i = 0; i < posts.length; i++) {
  let temp = {
    userID: posts[i].userId,
    userName: users[i].name,
    postingId: posts[i].id,
    postingTitle: posts[i].title,
    postingContent: posts[i].description,
  };
  postsList.push(temp)
};

// 데이터 저장은 POST 사용
// 전달받은 데이터를 users 배열에 추가해서 회원정보를 API 시스템 내에 저장한 후에, 생성됐을 때 알맞는 http 상태코드를 반환
// http response로 반환되는 JSON 데이터의 형태가 다음과 같은 구조가 되도록
// {
//   "message" : "userCreated"
// }

const httpRequestListener = function (request, response) {
  const { url, method } = request;

  if (method === 'GET') {
    if (url === '/posting_get') {
      
      // 클라이언트에서 내용 받기
      let body = '';

      request.on('data', (data) => {
        body += data;
      });

      request.on('end', () => {
        const list = JSON.parse(body);

        postsList.push({
          userID: list.userID,
          userName: list.userName,
          postingId: list.postingId,
          postingTitle: list.postingTitle,
          postingContent: list.postingContent,
        })
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({"data" : postsList}));
      })
    }
  }

  if (method === 'POST') {
    if (url === '/users/signup') {
      let body = '';

      request.on('data', (data) => {
        body += data;
      });

      request.on('end', () => {
        const user = JSON.parse(body);

        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });

        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({"users" : users}));
      });
    } else if (url === '/users/posting') {
      let body = '';

      request.on('data', (data) => {
        body += data;
      });

      request.on('end', () => {
        const post = JSON.parse(body);

        posts.push({
          id: post.id,
          title: post.title,
          description: post.description,
          userId: post.userId,
        });

        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({"posts" : posts}));
      });
    }
  }
}

server.on("request", httpRequestListener);
server.listen(8000, '127.0.0.1', function() {
  console.log('Listening to requests on port 8000');
});