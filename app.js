const http = require('http');
var fs = require('fs');
http.createServer((req, res) => {
    let file = 'index.html'
    if(req.url != '/') {
        file = String(req.url);
        file = file.substr(1);
    }
    var ext = file.substr(file.lastIndexOf('.') + 1)
    let contentType = 'text/html';
    if (!fs.existsSync(file)) {
        fs.readFile('error.html', function (err,data) {
            res.writeHead(404, {'Content-Type': contentType});    
            res.write(data);
            return res.end();
          });    
          return; 
    } 
    
    switch (ext) {
        case 'css':
            contentType = 'text/css';
            break;
        case 'jpg':
            contentType = 'image/jpg';
            break;
        case 'mp4':
            contentType = 'video/mp4';
            break;
        case 'js':
            contentType = 'text/javascript';
            break;
        case 'json':
            contentType = 'application/json';
            break;
        default:
            contentType = 'text/html';
    }
      fs.readFile(file, function (err,data) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/html'});
            return res.end("500 - Internal error, resource exist, but unavailable");
        } 
        res.writeHead(200, {'Content-Type': contentType});   
        res.write(data);
        return res.end();
      }); 

}).listen(3000);
  

