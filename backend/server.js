/**
 * Created by tangl9 on 2015-07-16.
 */
var express = require('express');
var app = express();

app.get('/employees', function (req, res) {
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
    res.end(employees);
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})