var express = require("express");
    morgan = require("morgan");
    app = express();
    http = require("http").Server(app);
    io = require("socket.io")(http);
    app.set("view engine", "ejs");

    app.use(morgan("tiny"));
    app.use(express.static(__dirname + "/public/"));

    http.listen(3000, function(){
      console.log("Server is Starting at Port 3000");
    });


app.get("/", function(req, res){
  res.render("tic-tac-toe");
});


io.on('connection', function(socket){
  socket.on("tic-tac-toe", function(move){
    io.emit("tic-tac-toe", move);
  });

  socket.on("who-wins", function(point){
    io.emit("who-wins", point);
  });

  socket.on("winning", function(position){
    io.emit("winning", position);
  });
});
