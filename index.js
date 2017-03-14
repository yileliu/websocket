const server = require('websocket').server;
const http = require('http');

const socket = new server({
    httpServer: http.createServer().listen(1337)
});

let clients = [];

socket.on('request', (request)=>{
    let connection = request.accept(null, request.origin);    
    let index = clients.push(connection) -1;

    connection.on('message', (message) => {
        console.log(message.utf8Data);

        connection.sendUTF('hello');

        setTimeout(()=>{
            clients.forEach((c)=>{
                c.sendUTF('this is a websocket example');
            })
        }, 1000);
    });

    connection.on('close', (connection)=>{
        console.log('current clients count' + clients.length);
        clients.splice(index, 1);
        console.log('connection close');
    })
})