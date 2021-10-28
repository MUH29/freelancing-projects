'use strict';
const jsonServer = require("json-server")

const app = require('./server')

app.listen(3000, () => console.log('Local app listening on port 3000!'));
app.use('/api', jsonServer.router('projects.json'))