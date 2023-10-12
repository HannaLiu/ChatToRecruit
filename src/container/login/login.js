import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button,Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
import formBind from '../../component/formbind/formbind'


@connect(
    state => state.user,
    {
        login
    }
)
@formBind

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			user: '',
			pwd:'',
			msg:''
		}
        this.register = this.register.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    
	componentWillReceiveProps(nextProps){
		console.log(nextProps.msg)
    	if(nextProps.msg!==""){
    		this.setState({msg:nextProps.msg})

    		Toast.info(nextProps.msg, 1);
    	}
    }

    register() {
        this.props.history.push('/register')
    }

    handleLogin() {
        this.props.login(this.state)
    }
    
    onChange(key,val){
      this.setState({
        [key]:val
      })
    }
    
    render() {
        return (
            <div className="color-bg">
          {(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo} /> : null}
            <div className = "sub-container">
            <WingBlank>
            <p className="top-title">进入职聘</p>
              <List>
                <InputItem
            onChange = {v => this.onChange('user', v)}
            onFocus = {this.handleFocus}
            >用户名</InputItem>
                <InputItem
            type='password'
            onChange = {v => this.onChange('pwd', v)}
            onFocus = {this.handleFocus}
            >密码</InputItem>
              </List>
              <WhiteSpace/>
              <Button type='primary'
              disabled={!this.state.user || !this.state.pwd }
            onClick = {this.handleLogin}
             activeClassName="button-active"
            >登录</Button>  
            <p className='msg' onClick={this.register}>没有账号? <span className="primery">去注册</span></p>
            </WingBlank>
            </div>
          </div>
        )
    }
}

export default Login