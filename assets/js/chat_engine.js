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

        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatRoom: 'Sochioh'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}