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


//post ( 보통 json으로 데이터 주고 받고, 이것을 읽어올 준비가 됨.)
app.use(express.json());


//get방식. post 방식
//★ 보안 (데이터 주고받을 때,
//개발자도 알면 안되지만 일반인보다는 좀 더 아는 위치)

// 회원 정보 주고 받을 때, post.
// select은 검색기능은 get. ( 검색속도 느리면 화나요 )
// db에서 insert, update, delete ( 이 친구들 사용할 때, post )
app.post('/send1', (req, res) => {
    console.log('send');
    let data = req.body; //post는 데이터를 body에다가 넣기 때문에.
    let name = '배트맨';
    console.log(data);
    if(data != undefined && data.name != null) {
        name = data.name;
    }

    connection.query('SELECT * FROM STU_SCORE WHERE NAME = ?', [name], (err, rows) => {
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
});

//회원가입할 때, get방식 통신 ( 회원가입만 )
//post방식 하나 그냥 똑같이 만드면 됩니다.