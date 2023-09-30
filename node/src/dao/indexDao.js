const { pool } = require("../../database");

exports.getUserRows = async function() {
    try {
        // pool 객체를 사용해 데이터 베이스에 접근, 접근이 잘되는지 테스트를 한다.
        const connection = await pool.getConnection(async (conn) => conn);

        // 접근이 잘되면 쿼리를 날리는 부분이다.
        try {
            // 쿼리
            const selectUserQuery = "SELECT * FROM users;";
            // 쿼리를 날리는 부분
            const [row] = await connection.
                query(selectUserQuery);
            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.

            return row;
            
        } catch (err) {
            console.error(` #### getUserRows Query error ####`);            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
            return false;
        } // } finally {
        //     connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
        // }
    } catch (err) {
        console.error(` #### getUserRows DB error ####`);
        return false;
    }
}


exports.insertTodo = async function(userIdx, content, type) {
    try {
        // pool 객체를 사용해 데이터 베이스에 접근, 접근이 잘되는지 테스트를 한다.
        const connection = await pool.getConnection(async (conn) => conn);

        // 접근이 잘되면 쿼리를 날리는 부분이다.
        try {
            // 쿼리
            const insertTodoQuery = "insert into todos(userIdx, content, type) values (?, ?, ?);";

            const insertTodoParams = [userIdx, content, type];

            // 쿼리를 날리는 부분
            const [row] = await connection.
                query(insertTodoQuery, insertTodoParams);
            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.

            return row;
            
        } catch (err) {
            console.error(` #### insertTodo Query error #### \n ${err}`);            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
            return false;
        } // } finally {
        //     connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
        // }
    } catch (err) {
        console.error(` #### insertTodo DB error #### \n ${err}`);
        return false;
    }
}