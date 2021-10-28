'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs")
const mysql = require("mysql")

// Connect to SQL Database
const connection = mysql.createConnection({
    host: "sql11.freesqldatabase.com",
    user: "sql11447426",
    password: "MxuQhIfqGq",
    database: "sql11447426"
})

// Select Items from SQL
connection.connect((err) => {
    if (err) 
        throw err
    connection.query('SELECT * FROM projects', (err, result, fields) => {
        if (err)
            throw err
        const proj = JSON.stringify({"projects": result})
        fs.writeFile('projects.json', proj, (err) => {
            if(err) 
                throw err
            console.log("New data added!")
        })
    })
})
const router = express.Router()
router.post('/', (req, res) => res.json({ postBody: req.body }))

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')))

module.exports = app
module.exports.handler = serverless(app)
