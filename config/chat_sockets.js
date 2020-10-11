module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer);
  //notice connect and connection are different in sent and recieved calls
  io.sockets.on("connection", function (socket) {
    console.log("New Connection Received", socket.id);

    socket.on("disconnect", function () {
      console.log("Socket Disconnected");
    });

    socket.on("join_room", function (data) {
      console.log("Joining Request", data);

      socket.join(data.chatRoom);
      // Tell everyone if someone new enters
      io.in(data.chatRoom).emit("User_Joined", data);
    });
    socket.on("send_message", function (data) {
      io.in(data.chatRoom).emit("receive_message", data);
    });
  });
};
