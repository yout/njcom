var exec = require('child_process').exec;
var config = require('./config');
var url = require("url");
var querystring = require("querystring");

function compress(request, response) {
	var query = url.parse(request.url).query;
	var path = querystring.parse(query)["path"];
	console.log('path:' + path);
	comp = exec(config.conf.cmd);
	comp.stdout.on('data', function(data) {
		// TODO: 日志写文件
	});
	comp.on('exit', function(code, signal) {
		console.log('compress complete !');
		response.writeHead(200, {
			'Content-Type' : 'text/plain',
			'Trailer' : 'TraceInfo'
		});
		response.write('success.');
		response.end();
	});
}

exports.compress = compress;