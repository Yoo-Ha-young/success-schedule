const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./secret");
exports.jwtMiddleware = async function(req, res, next) {
    // 헤더에서 토큰 꺼내기
    const token = req.headers["x-access-token"];

    // 토큰이 없는 경우
    if(!token) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "로그인이 되어 있지 않습니다.",
        });
    }
    // 토큰이 있다면 유효한 토큰인지 검증
    try{
        const verifiedToken = jwt.verify(token, jwtSecret);
        req.verifiedToken = verifiedToken;
        next();
    } catch {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "토큰 검증 실패",
        });
    }
};

// const jwt = require("jsonwebtoken");

// const token = jwt.sign(
//     { userIdx: 1 }, // payload 정의 (회원에 대한 정보들)
//     "a123" // 서버 비밀키
// );

// console.log(token);

// // jwt 토큰 검증
// const verifiedToken = jwt.verify(token, "a123");
// console.log(verifiedToken)