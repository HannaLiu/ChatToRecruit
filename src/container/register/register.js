import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import formBind from '../../component/formbind/formbind'

@connect(
	state => state.user, {
		register
	}
)
@formBind
class Register extends React.Component {
	constructor(props) {
		super(props);
		this.handleRegister = this.handleRegister.bind(this)
		this.handleFocus = this.handleFocus.bind(this)
		this.login = this.login.bind(this)
		this.state = {
			showMsg: false
		}
	}

	componentDidMount() {
		this.props.handleChange('type', 'talent')
	}
	componentWillReceiveProps(nextProps){
    	if(nextProps.msg!==this.props.msg && nextProps.msg!==""){
    		this.setState({
				showMsg:true
			})
    	}
    }
	login() {
		this.props.history.push('/login')

	}
	handleRegister() {
		this.props.register(this.props.state)
	}
	handleFocus() {
		this.setState({
			showMsg: false
		})
	}
	render() {
		const RadioItem = Radio.RadioItem
		return(
			<div className="color-bg">
              {this.props.redirectTo?<Redirect to={this.props.redirectTo} /> :null}
        			<div className = "sub-container">
        			<WingBlank>
        			<p className="top-title">注册</p>
      				<List>
      					<InputItem
      						onChange = {v=>this.props.handleChange('user',v)}
      						onFocus = {this.handleFocus}
      					>用户名</InputItem>
      					<InputItem
      						type='password'
      						onChange = {v=>this.props.handleChange('pwd',v)}
      						onFocus = {this.handleFocus}
      					>密码</InputItem>
      					<InputItem
      						type='password'
      						onChange = {v=>this.props.handleChange('repeatpwd',v)}
      						onFocus = {this.handleFocus}
      					>确认密码</InputItem>
      					
      				</List>
      				<WhiteSpace/>
      				<p className="middle-title">我要</p>
      				<List>
      					<RadioItem 
      						checked={this.props.state.type === 'talent'}
      						onChange={()=>this.props.handleChange('type','talent')}
      					>找工作</RadioItem>
      					<RadioItem 
      						checked={this.props.state.type === 'employer'}
      						onChange={()=>this.props.handleChange('type','employer')}
      					>招人才</RadioItem>
      				</List>
              		<WhiteSpace/>
        			{this.props.msg && this.state.showMsg?<p className='msg-button'>{this.props.msg}</p>:null}
      				<WhiteSpace size="xl" />
      				<Button type='primary'
      				disabled={!this.props.state.user || !this.props.state.pwd || !this.props.state.repeatpwd }
      				onClick={this.handleRegister} 
      				activeClassName="button-active">下一步</Button>
            		<p className='msg' onClick={this.login}>已有账号? <span className="primery">去登录</span></p>
      			</WingBlank>
      			</div>
        		</div>
		)
	}
}

export default Register