# Register
- [x] When user is on Register page, user must input username, password and re-enter password to register.
- [x] When password and re-entered password are different, an error message shows up.
- [x] When user entered an username and a valid password, hit Register button, API is called to register. Redirect to Login page.
- [x] When user entered an invalid username or an invalid password, an error message shows up.

# Login
- [x] If username or password is empty, an error message shows up.
- [x] When user entered an username and a valid password, hit Login button, API is called to login.
- [x] When user entered an invalid username or an invalid password, an error message shows up.
- [x] When user is logged in, user is redirected to Home page.
- [x] All the API calls after logged in is attached with a JWT token
- [x] When user is logged in, API returns user information, it is then stored locally.

# Navagation Bar
- [x] Navigation bar should be at the bottom of the screen
- [x] Navigation bar should have tabs: Chats, Search, Contacts, Profile

# Chats
- [x] When enter Chats page, a API is called to fetch the latest chat messages of all chat rooms

# Chat room
- [x] When enter a chat room, a API is called to fetch all chat messages between the user and the other user
- [x] When enter a chat room, a websocket is opened to listen to new messages
- [x] When user send a message, the message is pushed to server through websocket

# Search

# Contacts

# Profile

# Unit tests


# useChatWebsocket() 设计思想
ChatRoom
sendWebSocketMessage(Message) 
-> onServerReceiveMsg(Message + Event)
-> if succ, render new message
-> if fail, show error message

useChatWebSocket 负责消息的发送和接收，给到一个回调函数，当消息发送收到结果时，调用回调函数

上层 
- 通过 messagesAckPending 拿到正在发送的消息
- 通过回调函数拿到消息发送的结果