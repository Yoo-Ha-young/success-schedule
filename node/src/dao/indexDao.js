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

exports.selectTodoByType = async function(userIdx, type){
    try {
        // pool 객체를 사용해 데이터 베이스에 접근, 접근이 잘되는지 테스트를 한다.
        const connection = await pool.getConnection(async (conn) => conn);

        // 접근이 잘되면 쿼리를 날리는 부분이다.
        try {
            // 쿼리
            const selectTodoQuery = "select todoIdx, content, status from todos where userIdx = ? and type = ? and not(status = 'D');";

            const selectTodoParams = [userIdx, type];

            // 쿼리를 날리는 부분
            const [row] = await connection.
                query(selectTodoQuery, selectTodoParams);
            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.

            return row;
            
        } catch (err) {
            console.error(` #### selectTodo Query error #### \n ${err}`);            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
            return false;
        } // } finally {
        //     connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
        // }
    } catch (err) {
        console.error(` #### selectTodo DB error #### \n ${err}`);
        return false;
    }
}

exports.selectValidTodo = async function(userIdx, todoIdx){
    try {
        // pool 객체를 사용해 데이터 베이스에 접근, 접근이 잘되는지 테스트를 한다.
        const connection = await pool.getConnection(async (conn) => conn);

        // 접근이 잘되면 쿼리를 날리는 부분이다.
        try {
            // 쿼리
            const selectValidQuery = "select * from todos where userIdx = ? and todoIdx = ? and not(status='D');";

            const selectValidParams = [userIdx, todoIdx];

            // 쿼리를 날리는 부분
            const [row] = await connection.
                query(selectValidQuery, selectValidParams);
            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.

            return row;
            
        } catch (err) {
            console.error(` #### select valid Query error #### \n ${err}`);            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
            return false;
        } // } finally {
        //     connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
        // }
    } catch (err) {
        console.error(` #### select valid DB error #### \n ${err}`);
        return false;
    }
}

exports.updateTodo = async function(userIdx, todoIdx, content, status){
    try {
        // pool 객체를 사용해 데이터 베이스에 접근, 접근이 잘되는지 테스트를 한다.
        const connection = await pool.getConnection(async (conn) => conn);

        // 접근이 잘되면 쿼리를 날리는 부분이다.
        try {
            // 쿼리
            // const updateTodoQuery = "select * from todos where userIdx = ? and todoIdx = ? and not(status='D');";
            const updateTodoQuery = "update todos set content = ifnull(?, content) , status = ifnull(?, status) where userIdx = ? and todoIdx = ?;";

            const updateTodoParams = [content, status, userIdx, todoIdx];

            // 쿼리를 날리는 부분
            const [row] = await connection.
                query(updateTodoQuery, updateTodoParams);
            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.

            return row;
            
        } catch (err) {
            console.error(` #### update todo Query error #### \n ${err}`);            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
            return false;
        } // } finally {
        //     connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
        // }
    } catch (err) {
        console.error(` #### update todo DB error #### \n ${err}`);
        return false;
    }
}

exports.deleteTodo = async function(userIdx, todoIdx){
    try {
        // pool 객체를 사용해 데이터 베이스에 접근, 접근이 잘되는지 테스트를 한다.
        const connection = await pool.getConnection(async (conn) => conn);

        // 접근이 잘되면 쿼리를 날리는 부분이다.
        try {
            // 쿼리
            const deleteTodoQuery = "update todos set status = 'D' where userIdx = ? and todoIdx = ?;";
            const deleteTodoParams = [userIdx, todoIdx];

            // 쿼리를 날리는 부분
            const [row] = await connection.query(deleteTodoQuery, deleteTodoParams);
            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.

            return row;
            
        } catch (err) {
            console.error(` #### delete todo Query error #### \n ${err}`);            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
            return false;
        } 

    } catch (err) {
        console.error(` #### delete todo DB error #### \n ${err}`);
        return false;
    }
}