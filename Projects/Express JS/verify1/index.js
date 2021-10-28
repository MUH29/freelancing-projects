'use strict'
const express = require("express")
const app = express()
const fs = require("fs")
const mysql = require("mysql")
const jsonServer = require("json-server")

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

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Create server on port 3000
app.listen(3000, () => {
    console.log('Local app listening on port 3000!')
})

// Create API server
app.use('/api', jsonServer.router('projects.json'))