const port = 3000,
    http = require('http'),
    httpStatus = require('http-status-codes'),
    fs = require('fs');


http.createServer( (req, res) => {
    const url = req.url;

    if(url.indexOf(".html") !== -1){
        res.writeHead(httpStatus.OK, {
            "Content-Type": "text/html"
        });
        custonReadFile(`./view${url}`, res)

    }else if(url.indexOf(".js") !== -1){
        res.writeHead(httpStatus.OK, {
            "Content-Type": "text/javascript"
        });
        custonReadFile(`./public/js${url}`, res)

    }else if(url.indexOf(".css") !== -1){
        res.writeHead(httpStatus.OK, {
            "Content-Type": "text/css"
        });
        custonReadFile(`./public/css${url}`, res)

    }else if(url.indexOf(".png") !== -1){
        res.writeHead(httpStatus.OK, {
            "Content-Type": "image/png"
        });
        custonReadFile(`./public/images${url}`, res)
    }
    
}).listen(port)
console.log('Server listen on port '+ port)


function custonReadFile(file_path, res){
    if(fs.existsSync(file_path)){
        fs.readFile(file_path, (error, data)=> {
            if(error){
                console.log(error)
                sendErrorResponse(res);
                return;
            }
            res.write(data)
            res.end()
        });
    }else {
        sendErrorResponse(res);
    }
}

const getViewUrl = (url) =>{
    return `view${url}.html`;
}

const sendErrorResponse = res => {
    res.writeHead(httpStatus.NOT_FOUND, {
        "Content-Type": "text/html"
    });
    res.write('<h1>Sorry, not found</h1>')
    res.end()
}