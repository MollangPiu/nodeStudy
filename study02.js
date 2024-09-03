const express = require('express');
const app = express();
//모두 허용
const cors = require('cors');
//일부만 허용 ( 안 쓴다. )
const corsOption = {
    origin: 'http://localhost:8080',
    optionSuccessStatus: 200
}

//cors 설정 (모두 허용 )
app.use(cors());
// app.use(cors(corsOption)); corsOption정의만큼 허용


//DB 설정
const mysql = require('mysql2');
const connection = mysql.createConnection(
{
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'cyci2024',
    database: 'mydb'
}
);
connection.connect();


//node의 기본 port는 3000, vue, react는 기본port 3000
app.listen(3000, function() {
    console.log('node start');
})

//node 불러오는 방법
app.get('/' ,(req, res) => {
    console.log('page 실행');
    res.send('hello world');
})

//db를 get방식으로 불러오기.
app.get('/db', (req, res) => {
    console.log('/db');
    connection.query('SELECT * FROM STU_SCORE', (err, rows) => {
        if(err) {
            console.err('err: ', err);
        }
        else if(rows[0]) {
            console.log(rows);
            let responseData = new Object();
            responseData.status = 200; //통신코드 중, 200은 성공을 의미
            responseData.list = rows;
            res.json(responseData);
        }
    })
})


//db를 get방식으로 불러오기. ( 검색 기능 )
//java에서 배울 때, statment, preparedStatement
app.get('/get', (req, res) => {
    console.log('/get');
    console.log(req.query);
    let name = req.query.userId;
    console.log('name: ', name);

    connection.query('SELECT * FROM STU_SCORE WHERE NAME = ?', [name], (err, rows) => {
        if(err) {
            console.err('err: ', err);
        }
        else if(rows[0]) {
//            console.log(rows);
            let responseData = new Object();
            responseData.status = 200; //통신코드 중, 200은 성공을 의미
            responseData.list = rows;
            res.json(responseData);
        }
    })
})

//이 방법 그대로 사용하면, 큰 일납니다.
app.get('/get2', (req, res) => {
    console.log('/get');
    console.log(req.query);
    let name = req.query.userId;
    console.log('name: ', name);

    connection.query('SELECT * FROM STU_SCORE WHERE NAME = \''+name+'\'', (err, rows) => {
        if(err) {
            console.err('err: ', err);
        }
        else if(rows[0]) {
//            console.log(rows);
            let responseData = new Object();
            responseData.status = 200; //통신코드 중, 200은 성공을 의미
            responseData.list = rows;
            res.json(responseData);
        }
    })
})