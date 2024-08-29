let dbCon = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'qwe123!@#',
    database: 'mydb'
}

module.exports = function() {
    return dbCon;
};