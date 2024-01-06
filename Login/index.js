var express = require('express');
var crypto = require('crypto');
var app = express();
var mysql = require('mysql');
var Client = require('ssh2').Client;
var bodyParser = require('body-parser');
const { saltHashPassword } = require("./component/CryptoPassword");
var v4 = require('uuid');
const axios = require('axios');
var create_sql = "";

var con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'benevolent2378',
    database: 'login'
});


// Check database existence and if exists, create table.
const checkTableExistsQuery = 'SHOW TABLES LIKE \'members\'';

con.query(checkTableExistsQuery, function(err, results, fields) {
    if(err){
        console.error("Error checking table existence.");
        return;
    }
    if(results.length == 0){
        let create_sql = "CREATE TABLE members(unique_id VARCHAR(36) NOT NULL, name VARCHAR(32) NOT NULL, password VARCHAR(32) NOT NULL)"     
        con.query(create_sql, function (create_err, create_results, create_fields) {
        if (create_err) {
            console.log(create_err);
        }
        console.log("Table make succeeds");
        });
    }
}); 


//Password Util
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')   // Convert to Hex
    .slice(0, length);  // return
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
    console.log("Listening on express port, ")
});

app.post("/register/", async(req, res) => {
    var post_data = req.body;
    var password = post_data.password;
    var name = post_data.name;
    var uid = v4.v4();
    console.log(uid);

            con.query('INSERT INTO `members` (`unique_id`, `name`, `password`) VALUES(?, ?, ?)', 
            [uid, name, password], function(err, result, fields){
                
                con.on('error', function(err){
                        console.log('[MySQL ERROR]', err);
                        res.json('Register error', err);
                });


                con.query('SELECT * FROM members', function(err, result, fields){
                    con.on('error', function(err){
                        console.log('error', err);
                        res.json('Register error2', err);
                    });
                    console.log(result);
                    res.json('Register successful');
                });
            })
});