let dbCon = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'cyci2024',
    database: 'mydb'
}

module.exports = function() {
    return dbCon;
};