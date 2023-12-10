const port = 3000,
    http = require('http'),
    httpStatusCodes = require('http-status-codes'),
    router = require('./router'),
    fs = require('fs');
    plainTextContentType = {
        "Content-Type": "text/plain"
    },
    htmlContentType = {
        "Content-Type": "text/html"
    },
    customReadFile = (file, res) => {
        fs.readFile(`./${file}`, (errors, data) => {
            if(errors) console.log("error reading the file...")

            res.end(data);
        })
    };


router.get("/", (req,res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("INDEX")
})

router.get("/index.html", (req,res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    custonReadFile("view/index.html", res)
})

router.post("/", (req,res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("POSTED")
})


http.createServer(router.handle).listen(3000);
console.log('Server listen on port 3000')


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

const sendErrorResponse = res => {
    res.writeHead(httpStatus.NOT_FOUND, {
        "Content-Type": "text/html"
    });
    res.write('<h1>Sorry, not found</h1>')
    res.end()
}