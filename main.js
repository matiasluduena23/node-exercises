
const routeResponseMap = {
    '/info': '<h1>Info</h1>',
    '/contact': '<h1>Contact</h1>',
    '/about': '<h1>About Us</h1>',
    '/hello': '<h1>Hello</h1>',
    '/error': '<h1>Error 404 page not fond</h1>',
  
}

const port = 3000,
    http = require('http'),
    httpStatus = require('http-status-codes'),
    app = http.createServer();

app.on('request', (req, res) => {
    
   let body = []
   req.on('data', (bodyData) => {
    body.push(bodyData)
   })

   req.on('end', ()=> {
    body = Buffer.concat(body).toString();
    console.log(`Request Body Contents: ${body}`)
    })

    res.writeHead(httpStatus.OK, {
        "Content-Type": "text7html"
    });
    
    
    console.log(req.method)
    console.log(req.url)
    console.log(getJsonString(req.headers))

    if(routeResponseMap[req.url]) {
        res.end(routeResponseMap[req.url])
    }  else res.end('<h1>Heading</h1>')
    
});

app.listen(port)
console.log('Server listen on port '+ port)

function getJsonString(obj) {
    return JSON.stringify(obj, null ,2);
}