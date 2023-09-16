const http = require("http");
const axios = require("axios");
const fs = require("fs");
const name = 'Neptune';

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    axios
      .get('https://api.api-ninjas.com/v1/planets', {
        params: {
          name: "Neptune"
        },
        headers: {
          'X-API-KEY': 'Y/tlSHmXEkfJMRj4ICBh6A==2QC6SWl6NdzNmY1q'
        }
      })
      .then(response => {
        // res.statusCode = 200; // OK
        // res.setHeader('Content-Type', 'application/json');
        // res.end(JSON.stringify(response.data));
        fs.readFile("Display.html","utf-8",(err,data)=>{
            if(err){
                res.statusCode=500;
                res.end("Internal Server Error");
            }
            else{
                // console.log(response.data);
                const responseData = JSON.stringify(response.data);
                const parsedData = JSON.parse(responseData);
                const updatedData = data.replace("{{response_data}}",parsedData[0].mass);

                res.statusCode = 200; // OK
                res.setHeader("Content-Type", "text/html");
                res.end(updatedData);
            }
        })
      })
      .catch(error => {
        console.error(error);
        res.statusCode = 500; // Internal Server Error
        res.end('Internal Server Error');
      });
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});