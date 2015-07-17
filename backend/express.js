/**
 * Created by tangl9 on 2015-07-17.
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
    res.set('Access-Control-Allow-Origin', "*");
    res.send(JSON.stringify(employees));
});

app.get('/musician/:name', function (req, res) {

    // Get /musician/Matt
    console.log(req.params.name)
    // => Matt

    res.send('{"id": 1,"name":"Matt", "band":"BBQ Brawlers"}');
});

app.listen(3001);
console.log('Listening on port 3001...');