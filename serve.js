const http = require('http');
const app = require('./app')
const port = process.env.PORT || 5000;
const serve = http.createServer(app);
serve.listen(port);//executa o servido na porta 5000

