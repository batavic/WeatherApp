const express=require("express");
const https = require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');


app.get("/",function(req,res){

    res.render("home");
})

app.post("/", function(req,res){

    const apiKey="b31f59e135867768ee8f1418141f8336";
    const location=req.body.cityInput;
    const unit=req.body.unitValue;

    const url="https://api.openweathermap.org/data/2.5/weather?q="+location+"&units="+unit+"&APPID="+apiKey;

    const date=new Date().toLocaleDateString();

    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){

            //getting the weather data json object
            const weatherData=JSON.parse(data);

            //getting fields
            const city=weatherData.name;
            const country=weatherData.sys.country;

            const temp = weatherData.main.temp;
            const feelsLike=weatherData.main.feels_like;
            const tempMin=weatherData.main.temp_min;
            const tempMax=weatherData.main.temp_max;
            const humidity=weatherData.main.humidity;

            const weatherDescription = weatherData.weather[0].description;

            const icon = weatherData.weather[0].icon;
            const iconURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.render("result",{cityName:city, country:country, temperature:temp, feelsLike:feelsLike, tempMin:tempMin, tempMax:tempMax, humidity:humidity, weatherDescription:weatherDescription, icon:iconURL, date:date});

        })
    });
    
})


app.listen(3000, function(){
    console.log("Server is listening on port 3000.");
})