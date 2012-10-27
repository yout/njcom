var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");
var compress = require("./compress"), config = require('./config');
var mime = require("./mime").types;

var server = http.createServer(function(request, response) {
	var pathname = url.parse(request.url).pathname;
	var realPath = path.join(config.conf.publicPath, pathname);

	// 执行压缩脚本
	if (/.+compress$/.exec(pathname)) {
		compress.compress(request, response);
	} else {// 静态服务
		fs.exists(realPath, function(exists) {
			if (!exists) {
				response.writeHead(404, {
					'Content-Type' : 'text/plain'
				});

				response.write("This request URL " + pathname
						+ " was not found on this server.");
				response.end();
			} else {
				fs.readFile(realPath, "binary", function(err, file) {
					if (err) {
						response.writeHead(500, {
							'Content-Type' : 'text/plain'
						});
						response.end(err);
					} else {
						var ext = path.extname(realPath);
						ext = ext ? ext.slice(1) : 'unknown';
						var contentType = mime[ext] || "text/plain";
						response.writeHead(200, {
							'Content-Type' : contentType,
							'Accept-Charset' : 'utf-8'
						});
						response.write(file, "binary");
						response.end();
					}
				});
			}
		});
	}

});

server.listen(config.conf.port);
console.log('server start successfully! port = ', config.conf.port);
