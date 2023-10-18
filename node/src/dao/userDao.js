const { pool } = require("../../database");

exports.insertUser = async function(email, password, nickname) {
    try {
        // pool 객체를 사용해 데이터 베이스에 접근, 접근이 잘되는지 테스트를 한다.
        const connection = await pool.getConnection(async (conn) => conn);

        // 접근이 잘되면 쿼리를 날리는 부분이다.
        try {
            // 쿼리
            const insertUserQuery = "insert into users (email, password, nickname) values(?, ?, ?);"
            const insertUserParams = [email, password, nickname];
            // 쿼리를 날리는 부분
            const [row] = await connection.
                query(insertUserQuery, insertUserParams);
            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.

            return row;
            
        } catch (err) {
            console.error(` #### insertUser Query error ####`);            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
            return false;
        } // } finally {
        //     connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
        // }
    } catch (err) {
        console.error(` #### insertUser DB error ####`);
        return false;
    }
};


exports.selectUserByEmail = async function(email) {
    try {
        // pool 객체를 사용해 데이터 베이스에 접근, 접근이 잘되는지 테스트를 한다.
        const connection = await pool.getConnection(async (conn) => conn);

        // 접근이 잘되면 쿼리를 날리는 부분이다.
        try {
            // 쿼리
            const selectUserByEmailQuery = "select * from users where email = ?;"
            const selectUserByEmailParams = [email];
            // 쿼리를 날리는 부분
            const [row] = await connection.
                query(selectUserByEmailQuery, selectUserByEmailParams);
            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.

            return row;
            
        } catch (err) {
            console.error(` #### selectUser Query error ####`);            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
            return false;
        } // } finally {
        //     connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
        // }
    } catch (err) {
        console.error(` #### selectUser DB error ####`);
        return false;
    }
};


exports.selectUser = async function(email, password) {
    try {
        // pool 객체를 사용해 데이터 베이스에 접근, 접근이 잘되는지 테스트를 한다.
        const connection = await pool.getConnection(async (conn) => conn);

        // 접근이 잘되면 쿼리를 날리는 부분이다.
        try {
            // 쿼리
            const selectUserQuery = "select * from users where email = ? and password = ?;"
            const selectUserParams = [email,password];
            // 쿼리를 날리는 부분
            const [row] = await connection.
                query(selectUserQuery, selectUserParams);
            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.

            return row;
            
        } catch (err) {
            console.error(` #### selectUser Query error ####`);            
            connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
            return false;
        } // } finally {
        //     connection.release(); // 과부하가 걸릴지 않도록 커넥션을 끊어야한다.
        // }
    } catch (err) {
        console.error(` #### selectUser DB error ####`);
        return false;
    }
};
