import React from 'react'
import { List,InputItem, NavBar, Icon } from 'antd-mobile'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, receiveMsg, readMsg  } from '../../redux/chat.redux'
import {getChatId} from '../../util'
const socket = io('ws://localhost:8080')

@connect(
	state=>state,
	{getMsgList,sendMsg,receiveMsg,readMsg}
)
class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state={
			text:"",
			msg:[]
		}
	}
	componentDidMount(){
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.receiveMsg()
		}
		// socket.on('receivemsg',(data)=>{
		// 	this.setState({
		// 		msg:[...this.state.msg,data.text]
		// 	})
		// })
	}

	componentWillUnmount(){
		const to = this.props.match.params.user
		this.props.readMsg(to)
	}

	handleSubmit(){
		// socket.emit('sendmsg',{text:this.state.text})
		// this.setState({text:''})
		// console.log(this.props)
		const from = this.props.user._id
		const to = this.props.match.params.user
		const msg = this.state.text
		this.props.sendMsg({from,to,msg})
		this.setState({text:''})
	}
	render(){
		// console.log(this.props)
		const userid = this.props.match.params.user
		const Item = List.Item
		const users = this.props.chat.users
		if(!users[userid]){
			return null
		}
		const chatid = getChatId(userid,this.props.user._id)
		const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
		return(
			<div id="chat-page">
				<NavBar 
					mode="dark"
					icon={<Icon type='left'/>}
					onLeftClick={()=>{
						this.props.history.goBack()
					}}
				>
					{users[userid].name}
				</NavBar>
				{chatmsgs.map(v=>{
					console.log(v)
					const avatar = require(`../avatarselector/img/${users[v.from].avatar}.png`)
					return v.from==userid?(
						<List key={v._id}>
							<Item thumb = {avatar}>{v.content}</Item>
						</List>						
					):(
						<List key={v._id}>
							<Item
								extra={<img src={avatar}/>}
								className="chat-me">{v.content}</Item>
						</List>	
					)
				})}
				<div className='stick-footer'>
					<List>
						<InputItem
							placeholder = '请输入'
							value={this.state.text}
							onChange={v=>{
								this.setState({text:v})
							}}
							extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
						>
						</InputItem>
					</List>
				</div>
				</div>
		)
	}
}

export default Chat