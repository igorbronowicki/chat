var app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs');

app.listen(3000);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
    function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

io.sockets.on('connection', function(socket) {
    console.log("Соединение установлено!");

    socket.emit('message', "Welcome to the chat room.");

    socket.on('message', function(message, callback) {
        io.sockets.emit('message', message);
    });

    socket.on('disconnect', function() {
        console.log("Соединение разорвано!");
    });
});