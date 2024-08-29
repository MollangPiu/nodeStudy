const express = require('express');
const app = express();
const cors = require('cors');


app.listen(3000, function () {
    console.log('start');
})

//CORS 적용
app.use(cors());



app.get('/', (req, res) => { res.send('Hello World'); })

//get 방식 파밍하기
app.get('/get', (req, res) => {
    let data = req.query;
    console.log(data);
    console.log(data.a);
    console.log(data.b);
})