// Creating a server 
const http = require("http");

//we import fs to read html files from views that will be rendered to the client
const fs = require("fs");

const server = http.createServer((req, res) => {
    //The createServe takes two objects, the request and the response objects.
    // we declare a relative path for the url
    let path = "./views/";
    res.setHeader("content-type", "text/html");

    switch (req.url) {
        // we route the views to the request url
        case "/":
            path += "index.html";
            res.statusCode = 200;
            break;
        case "/about":
            path += "about.html";
            res.statusCode = 200;
            break;

        //for moved resources
        case "/about-me":
            res.statusCode = 301
            res.setHeader("Location", "/about")
            break;
        case "/contact":
            path += "contact-me.html"
            res.statusCode = 200;
            break;
        default:
            path += "404.html";
            res.statusCode = 404;
            break;
    }

    fs.readFile(path,(err,data)=>{
        if (err){
            console.log(err);
            res.end()
        }

        else{
            res.end(data)
        }
    })
   
});

server.listen(8080, "localhost", () => {
    // The serve listen to the client for any request made to the specified port
    // and localhost and then calls the callback function

    console.log("Listening for requests on port 8080");
});
