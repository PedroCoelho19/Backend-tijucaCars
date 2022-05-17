const http = require('http');
const app = require('./app')
const port = process.env.PORT || 1500 ;
const serve = http.createServer(app);
serve.listen(port, ()=>(console.log('Servidor ativo na porta 2000')));//executa o servido na porta 5000

