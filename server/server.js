const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')

const app = express()

const server = require('http').Server(app)

const io = require('socket.io')(server)
io.on('connection',function(socket){
	// console.log('user login ')
	socket.on('sendmsg',function(data){
		console.log(data)
		// io.emit('receivemsg',data)
		const {from,to,msg} = data
    console.log(data)
		const chatid = [from,to].sort().join('_')
		Chat.create({chatid, from, to, content:msg},function(err,doc){
      if(err){
        console.log(err)
        return 
      }
			io.emit('receivemsg',Object.assign({},doc._doc))
		})
	})
	
})


const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
server.listen(8080, function() {
  console.log('node app start at port 8080')
})