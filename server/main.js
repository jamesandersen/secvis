var express = require("express");
var app = express();

app.use("/api", require("./api/api.js"));

// we only want hot reloading in development
if (process.env.NODE_ENV !== "production") {
    console.log("DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...");
    require("./main.dev.js").useWebpackMiddleware(app);
} else {
    console.log("PRODUCTION ENVIRONMENT");
 
    //Production needs physical files! (built via separate process)
    app.use("/", express.static(__dirname + "/../prod"));
}

app.listen(process.env.PORT || 8080, function () {
  console.log("Example app listening on port 8080!");
});