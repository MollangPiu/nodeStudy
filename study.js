const express = require('express');
const app = express();
const cors = require('cors');
// mysql 
const mysql = require('mysql2');




app.listen(3000, function () {
    console.log('start');
})

//CORS 적용
app.use(cors());

//Database 접근
const db = require('./DBconnection.js');
console.log(db());
// mysql 연결 설정 체크하기
const connection = mysql.createConnection(db())
connection.connect();



app.get('/', (req, res) => { res.send('Hello World'); })

//get 방식 파밍하기
//http://localhost:3000/get?a=apple&b=banana
app.get('/get', (req, res) => {
    let data = req.query;
    console.log(data);
    console.log(data.a);
    console.log(data.b);
})

app.get('/json', (req, res) => {
    let obj = {a: 'apple', b: 'banana'};
    res.json(obj);
})


//get 연결시 호출 확인하기
app.get('/con', (req, res) => {
    console.log('hello');

    var query = connection.query('SELECT * FROM stu_score', function(err, rows) {
        if (err) {
            console.error(err);  // 로그에 오류 출력
            return res.status(500).json({ error: 'Internal Server Error' });  // 클라이언트에게 오류 응답
        }

        if (rows.length > 0) {
            console.log(rows[0]);
            res.json({ data: rows });  // 쿼리 결과를 응답 데이터로 사용
        } else {
            res.status(404).json({ error: 'No records found' });  // 레코드가 없는 경우 처리
        }
    });
});

app.get('/get2', (req, res) => {
    let name = '배트맨';

    let sql = 'SELECT * FROM STU_SCORE WHERE NAME= ?';
    connection.query(sql, [name], (err, result, fields) => {
        if(err) {
            console.error('error: ', err);
        } else {
            console.log('Field: ', fields);
            console.log('result: ', result);
        }
    })
})

app.get('/get3', (req, res) => {
    let name = '배트맨';

    let sql = 'SELECT * FROM STU_SCORE';
    connection.query(sql, (err, result) => {
        if(err) {
            console.error('error: ', err);
        } else {
            //result에 대한 foreach
            result.forEach((li, i) => {
                console.log(li);
                console.log(i);
            })
        }
    })
})

app.post('/post1', (req, res) => {
    console.log('실행 확인');
})

// JSON 요청의 본문을 파싱하기 위한 미들웨어
app.use(express.json());

app.post('/post2', (req, res) => {
    console.log('post2');
    console.log(req.body);
})

//값 반환하기
app.post('/post3', (req, res) => {
    console.log('post3');
    console.log(req.body);
    let name = '배트맨';

    let sql = 'SELECT * FROM STU_SCORE WHERE NAME= ?';
    connection.query(sql, [name], (err, result) => {
        if(err) {
            console.error('error: ', err);
        } else {
            
            let responseData = new Object;
            responseData.status = 200;
            responseData.list = result;
            res.json(responseData);
        }
    })
})

//heaer 적용하기
app.post('/post/header', (req, res) => {
    console.log('/post/header');
    console.log(req.body);


    console.log('header 확인')
    // 헤더 값 가져오기
    const authHeader = req.headers['authorization']; // 대소문자 구분 없음
    const customHeader = req.headers['another-header']; // 다른 헤더도 이와 같이 접근 가능

    console.log('Authorization 헤더:', authHeader);
    console.log('Another-Header 헤더:', customHeader);

    res.json('suc');
})