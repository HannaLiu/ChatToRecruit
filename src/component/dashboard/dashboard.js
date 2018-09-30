import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import NavLinkBar from '../../component/navlink/navlink'
import { Route, Switch } from 'react-router-dom'
import Employer from '../../component/employer/employer'
import Talent from '../../component/talent/talent'
import Msg from '../../component/msg/msg'
import User from '../../component/user/user'
import Login from '../../container/login/login'
import { getMsgList, receiveMsg } from '../../redux/chat.redux'

@connect(
	state => state, {
		getMsgList,
		receiveMsg
	}
)
class Dashboard extends React.Component {
	componentWillMount() {
		console.log(this.props.user)
		if(this.props.user.user == "") {
			this.props.history.push('/login')
		}
	}
	componentDidMount() {
		if(!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.receiveMsg()
		}
	}

	render() {
		const {
			pathname
		} = this.props.location
		const user = this.props.user
		const navList = [{
				path: '/employer',
				text: '人才',
				icon: 'employer',
				title: '人才',
				component: Employer,
				hide: user.type === 'talent'
			},
			{
				path: '/talent',
				text: '雇主',
				icon: 'talent',
				title: '雇主',
				component: Talent,
				hide: user.type === 'employer'
			},
			{
				path: '/msg',
				text: '消息',
				icon: 'msg',
				title: '消息',
				component: Msg
			},
			{
				path: '/me',
				text: '我',
				icon: 'user',
				title: '我',
				component: User
			}
		]

		return(
			<div>
				<NavBar 
					className='fixed-header' 
					mode='dark'
				>
				{ user.user ? navList.find(v => v.path === pathname).title : null}       
				</NavBar>
				<div style={{marginTop:45}}>
					<Switch>
						{navList.map(v=>(
							<Route 
								key={v.path} 
								path={v.path}
								component={v.component}
							></Route>
						))}
					</Switch>
				</div>
				<NavLinkBar data={navList}></NavLinkBar>
			</div>
		)
	}
}
export default Dashboard