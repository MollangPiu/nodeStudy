const express = require('express');
const app = express();
const cors = require('cors');
// mysql 
const mysql = require('mysql');




app.listen(3000, function () {
    console.log('start');
})

//CORS 적용
app.use(cors());

//Database 접근
// mysql 연결 설정 체크하기
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'cyci2024',
    database: 'mydb'
})

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

//axios 호출 시, mysql 연결 여부 파악하기
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