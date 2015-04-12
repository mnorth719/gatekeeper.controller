var http = require('http'); 
var port = 8000; 

http.createServer( function (req, res) {

	if (req.method === 'GET') {
		res.writeHead(405, "GET not allowed"); 
		return res.end();
	}

	if (req.url === '/api/gate') {
		if (req.method === 'POST') {
			req.on('data', function (chunk) {
				var data = JSON.parse(chunk.toString());
				console.log(data);

				if (!data.gateId) {
					res.writeHead(400, {'Content-Type' : 'application/json'}); 
					res.end(JSON.stringify({
						error: 'Invalid gateId' 
					})); 
				}

				res.writeHead(200, "application/json"); 
				return res.end(JSON.stringify({
					gateId: data.gateId,
					status: 'open'
				})); 
			}); 

			res.writeHead(400, {'Content-Type' : 'application/json'}); 
					res.end(JSON.stringify({
						error: 'Invalid parameters' 
					})); 

		}else{
			res.writeHead(405, {'Content-Type' : 'plain/text'}); 
			return res.end();
		} 

	}else{
		res.writeHead(404, "Forbidden"); 
		return res.end(); 
	}
}).listen(port); 

console.log('server listening on port ' + port.toString());