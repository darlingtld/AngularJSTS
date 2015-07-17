/**
 * Created by tangl9 on 2015-07-16.
 */
var http = require('http');

function dealWithWebRequest(request, response) {
    response.setHeader('Access-Control-Allow-Origin', "*");
    response.writeHead(200, {"Content-Type": "text/plain"});

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
    response.write(JSON.stringify(employees));
    response.end();
}

var webserver = http.createServer(dealWithWebRequest).listen(8080, "127.0.0.1");
webserver.once('listening', function () {
    console.log('Server running at http://127.0.0.1:8080/');
});