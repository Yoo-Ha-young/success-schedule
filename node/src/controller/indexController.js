const indexDao = require("../dao/indexDao.js");

exports.createTodo = async function(req, res) {
    const {userIdx, content, type} = req.body;

    // validation
    if(!userIdx || !content || !type) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "입력값이 누락됐습니다."
        });
    }

    // content 20글자 초과 불가
    if(content.length > 20) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "콘텐츠는 20글자 이하로 설정해주세요."
        });
    }

    // type: do, decide, delete, delegate
    const validTypes = ["do", "decide", "delete", "delegate"];
    if(!validTypes.includes(type)) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "유효한 타입이 아닙니다."
        });
    }

    const insertTodoRow = await indexDao.insertTodo(userIdx, content, type);
    if (!insertTodoRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청에 실패했습니다. 관리자에게 문의해주세요."
        });
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: "일정 생성 성공"
    });
};