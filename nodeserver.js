var http = require('http');

var server = http.createServer(function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	});
	
	http.get('http://opendata.socrata.com/resource/dy6n-e2kh.json?$limit=10', function(response) {
		var data = '';
		
		response.on('data', function (chunk) {
			data += chunk;
		});
		
		response.on('end', function() {
			res.write(data);
			res.end();
		});
	}).end();
});

server.listen(1234, '127.0.0.1');
console.log('The web server is running in http://127.0.0.1:1234');
