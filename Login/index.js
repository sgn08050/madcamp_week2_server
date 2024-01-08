var express = require('express');
var crypto = require('crypto');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
const { saltHashPassword } = require("./component/CryptoPassword");
const { createDatabase, createIndex } = require("./createDatabase");
var v4 = require('uuid');
const { register } = require('./component/POST/register');
const { appLogin, kakaoLogin } = require('./component/POST/login');
const { assetsgroup } = require('./component/POST/assetsgroup');
const { categories } = require('./component/POST/categories');
const { assetsgroupmemberpair } = require('./component/POST/assetsgroupmemberpair');
const { getAllMembers } = require('./component/GET/getAllMembers');
const { idCheck } = require('./component/POST/idCheck');

var con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'benevolent2378',
    database: 'LOGIN'
});

// Check database existence and create tables.
createDatabase("members", "CREATE TABLE members(member_id VARCHAR(36) PRIMARY KEY, id VARCHAR(32) NOT NULL, password VARCHAR(32) NOT NULL)", con);
createDatabase("assetsgroups", "CREATE TABLE assetsgroups(assetsgroup_id VARCHAR(36) PRIMARY KEY, assetsgroupname VARCHAR(32) NOT NULL, assetsgroupgoal VARCHAR(32) NOT NULL)", con);
createDatabase("categories", "CREATE TABLE categories(category_id VARCHAR(36) PRIMARY KEY, tag VARCHAR(32) NOT NULL)", con);
createDatabase("assets", "CREATE TABLE assets(asset_id VARCHAR(36) PRIMARY KEY, assets INT UNSIGNED NOT NULL, sign BOOLEAN NOT NULL)", con);
createIndex("SHOW INDEX FROM members WHERE Column_name = \'member_id\'", "CREATE INDEX idx_member_id ON members(member_id)", con);
createIndex("SHOW INDEX FROM assetsgroups WHERE Column_name = \'assetsgroup_id\'", "CREATE INDEX idx_assetsgroup_id ON assetsgroups(assetsgroup_id)", con);
createIndex("SHOW INDEX FROM categories WHERE Column_name = \'category_id\'", "CREATE INDEX idx_category_id ON categories(category_id)", con);
createIndex("SHOW INDEX FROM assets WHERE Column_name = \'asset_id\'", "CREATE INDEX idx_asset_id ON assets(asset_id)", con);
createDatabase("assetsgroupcategorypair", "CREATE TABLE assetsgroupcategorypair(assetsgroup_id VARCHAR(36), category_id VARCHAR(36), PRIMARY KEY(assetsgroup_id, category_id), FOREIGN KEY (assetsgroup_id) REFERENCES assetsgroups(assetsgroup_id), FOREIGN KEY(category_id) REFERENCES categories(category_id))", con);
createDatabase("assetsgroupmemberpair", "CREATE TABLE assetsgroupmemberpair(assetsgroup_id VARCHAR(36), member_id VARCHAR(36), PRIMARY KEY(assetsgroup_id, member_id), FOREIGN KEY (assetsgroup_id) REFERENCES assetsgroups(assetsgroup_id), FOREIGN KEY(member_id) REFERENCES members(member_id))", con)
createDatabase("assetmanagerpair", "CREATE TABLE assetmanagerpair(member_id VARCHAR(36), asset_id VARCHAR(36), category_id VARCHAR(36), assetgoal INT UNSIGNED NOT NULL, PRIMARY KEY(member_id, asset_id, category_id), FOREIGN KEY(member_id) REFERENCES members(member_id), FOREIGN KEY (asset_id) REFERENCES assets(asset_id), FOREIGN KEY (category_id) REFERENCES categories(category_id))", con)


//Password Util
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')   // Convert to Hex
    .slice(0, length);  // return
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(80, () => {
    console.log("Listening on express port, ")
});

idCheck(app, con);
register(app, con);
appLogin(app, con);
kakaoLogin(app, con);
getAllMembers(app, con);
assetsgroup(app, con);
categories(app, con);
assetsgroupmemberpair(app, con);