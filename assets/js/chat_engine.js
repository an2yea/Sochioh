class ChatEngine{
    constructor(chatBoxId, userEmail)
    {
        this.chatbox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost/5000');

        if(this.userEmail)
        {
            this.connectionHandler();
        }
    }
    //detect event- on /emit 
    connectionHandler(){
        let self = this;
        this.socket.on('connect',function(){
            console.log('Connection established using sockets');
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatRoom = "Sochioh"
            });
            self.socket.on('User_Joined', function(data)
            {
                console.log('A User Joined', data);
            });
        });
    }
}