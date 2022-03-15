const express = require ("express"); 
const res = require("express/lib/response");
const https = require ("https");
const bodyParser = require ("body-parser");

const app = express(); 

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(request, response){ 
    response.sendFile(__dirname+"/index.html");
}) 

app.post("/", function(req, res){
    console.log(req.body.cityName);
    // console.log("POST request received.");
    const query=req.body.cityName;
    const apiKey="796ea31271937af05a23079696c29758";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
    https.get(url, function(response){
        console.log(res.statusCode);
        response.on("data", function(data){
            //console.log(data);
            const weatherData= JSON.parse(data);
                // console.log(weatherData);
                // const object = {
                //     name: "Anubha",
                //     favouriteFood: "Butter Chicken"
                // }
                // console.log(JSON.stringify(object));
            const temp = weatherData.main.temp;
            console.log("Temperature : "+temp);
            const feelsLike = weatherData.main.feels_like;
            console.log("Feels like : "+feelsLike);
            const weatherDescription = weatherData.weather[0].description;
            console.log("Weather Description : "+weatherDescription);
            const icon= weatherData.weather[0].icon;
            imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
                // Method 1
                //response.send("<h2>The temperature in Montreal, Quebec is "+temp+" degrees Celcius.</h2><br><h2>The weather is currently "+weatherDescription+"</h2><br><h2>The feels like temperature is "+feelsLike+" degrees Celcius. </h2>")
                // Method 2
            res.set("Content-Type", "text/html");
            res.write("<h2>The temperature in "+query+" is "+temp+" degrees Celcius.</h2>")
            res.write("<p>The weather is currently "+weatherDescription+"</p>")
            res.write("<h4>The feels like temperature is "+feelsLike+" degrees Celcius. </h4>")
            res.write("<img src="+imageURL+">");
            res.send();
        });
    });        
        //response.send("Server is up and running.");
})



app.listen(3000, function(){ 
    console.log("Server is running on port 3000."); 
})



// ***** Notes ******

// npm init 
// npm i express
// npm i body-parser
// nodemon app.js
// we can only have one response.send()
// body parser is going to allow to look through the body of the post request. 
// to install body parser , do npm i body-parser 
// body-parser -> used to fetch the data based on the name of my input 