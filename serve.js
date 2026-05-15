const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT = path.join(__dirname, 'play.pokemonshowdown.com');
const PARENT_ROOT = __dirname;

const mimeTypes = {
	'.html': 'text/html',
	'.js': 'application/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.ico': 'image/x-icon',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
	'.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
	const urlPath = req.url === '/' ? '/testclient.html' : req.url.split('?')[0];
	let filePath;
	if (urlPath.startsWith('/config/')) {
		filePath = path.join(PARENT_ROOT, urlPath);
	} else {
		filePath = path.join(ROOT, urlPath);
	}
	const ext = path.extname(filePath).toLowerCase();
	const contentType = mimeTypes[ext] || 'application/octet-stream';

	fs.readFile(filePath, (err, data) => {
		if (err) {
			res.writeHead(404);
			res.end('Not Found');
			return;
		}
		res.writeHead(200, { 'Content-Type': contentType });
		res.end(data);
	});
});

server.listen(PORT, () => {
	console.log('Pokemon Showdown client running at http://localhost:' + PORT);
	console.log('Connect to your server: http://localhost:' + PORT + '/testclient.html?~~localhost:8000');
});
