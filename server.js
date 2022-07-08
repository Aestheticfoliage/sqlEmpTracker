const express = require('express');
// importing and requiring mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'department_db'
    },
    console.log('Connected to the department_db database.')
);
 
// query the database
db.query( 'SELECT * FROM departments', function (err, results){
    console.log('results', results)
});
// default response for any other request (not found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log('Server running on prt ${PORT}');
});