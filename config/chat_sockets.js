module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer);
  //notice connect and connection are different in sent and recieved calls
  io.sockets.on("connection", function (socket) {
    console.log("New Connection Received", socket.id);

    socket.on("disconnect", function () {
      console.log("Socket Disconnected");
    });
  });
};
