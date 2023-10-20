const compression = require("compression");
const cors = require("cors");
const express = require("express");

const app = express();
const port = 3000;

const { indexRouter } = require("./src/router/indexRouter");
const { userRouter } = require("./src/router/userRouter");

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });


// 정적 파일 제공
app.use(express.static("publ"));

/* express 미들웨어 설정 */
// body json 파싱
app.use(express.json());

// cors 설정 : 개발하는 단계에서는 당장 보안을 느슨하게 설정함
app.use(cors());


// 클라이언트-서버 통신을 위한 HTTP 요청 압축
app.use(compression());

// app.get("/users", function(req, res) {
//     return res.send("hello"); // 응답으로 hello라는 문자열을 보냄
// });

// app.post("/user", function(req, res) {
//     const name = req.body.name;
//     return res.send(name); // 응답으로 hello라는 문자열을 보냄
// });

/* 라우터 분리 */
// app이 express 객체가 된다
indexRouter(app);
userRouter(app);

app.listen(port, () => {
    console.log(`Express app listening at port: ${port}`);
});