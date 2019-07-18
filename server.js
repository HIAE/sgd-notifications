var env = require('dotenv').load(),
    server = require('http').Server(),
    io = require('socket.io')(server),
    Redis = require('ioredis'),
    redis = new Redis(6379, 'redis'), // ip redis
    ip = 'notifications'; // ip notifications

redis.psubscribe("*", function(){
    console.log('Inscrito');
});

io.on('connection', function(socket){
    console.log('Cliente ENTROU: ', socket.id);
});

redis.on('pmessage', function (pattern, channel, message) {
    message = JSON.parse(message);

    console.log(channel + ':' + message.event);

    io.emit(channel + ':' + message.event, message.data);
    console.log(message);
});

if(process.env.NODE_ENV === 'prod'){
    ip = '123123';
}

server.listen(3001, ip);