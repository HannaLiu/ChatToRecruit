import React from 'react'
import {List,Badge} from 'antd-mobile'
import {connect} from 'react-redux'

@connect(
	state=>state
)

class Msg extends React.Component{
	getLast(arr){
		return arr[arr.length-1]
	}

	render(){
		console.log(this.props)
		const Item = List.Item
		const Brief = Item.Brief
		const userid = this.props.user._id
		const userinfo = this.props.chat.users
		const msgGroup = {}
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid] = msgGroup[v.chatid] || []
			msgGroup[v.chatid].push(v)
		})
		console.log(msgGroup)
		const chatList = Object.values(msgGroup).sort((a,b)=>{
			let a_last = this.getLast(a).create_time
			let b_last = this.getLast(b).create_time
			return b_last - a_last
		})
		
		return(
			<div>
				{chatList.map(v=>{
					console.log(v)
					const lastItem = this.getLast(v)
					const targetId = v[0].from==userid?v[0].to:v[0].from
					const unreadNum = v.filter(v=>!v.read&&v.to==userid).length

					if(!userinfo[targetId]){
						return null
					}
					return (
						<List key = {lastItem._id}>
							<Item 
								style={{'zIndex':100}}
								extra={<Badge text={unreadNum}></Badge>}
								thumb = {require(`../avatarselector/img/${userinfo[targetId].avatar}.png`)}
								onClick={()=>{
									this.props.history.push(`/chat/${targetId}`)
								}}
							>
							{userinfo[targetId].name}
							<Brief>{lastItem.content}</Brief>
							</Item>
						</List>
					)
				})}
			</div>
		)
	}
}

export default Msg