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

// 데이터 저장은 POST 사용
// 전달받은 데이터를 users 배열에 추가해서 회원정보를 API 시스템 내에 저장한 후에, 생성됐을 때 알맞는 http 상태코드를 반환
// http response로 반환되는 JSON 데이터의 형태가 다음과 같은 구조가 되도록
// {
//   "message" : "userCreated"
// }

const httpRequestListener = function (request, response) {
  const { url, method } = request;

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
    }
  }
}

server.on("request", httpRequestListener);
server.listen(8000, '127.0.0.1', function() {
  console.log('Listening to requests on port 8000');
});