/**
 * Created by tangl9 on 2015-07-16.
 */
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({port: 3000});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});
server.route({
    method: 'GET',
    path: '/employees',
    cors:true,
    handler: function (request, reply) {
        var employees = [{
            name: 'Less',
            email: 'less@abc.com'
        }, {
            name: 'Wallace',
            email: 'wallace@abc.com'
        }, {
            name: 'Bobby',
            email: 'booby@abc.com'
        }]
        //reply.header("Access-Control-Allow-Origin", "*");
        reply(employees);
    }
});
//server.route({
//    method: 'GET',
//    path: '/{name}',
//    handler: function (request, reply) {
//        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
//    }
//});


server.start(function () {
    console.log('Server running at:', server.info.uri);
});
