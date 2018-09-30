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
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    register() {
        this.props.history.push('/register')
    }

    handleLogin() {
        this.props.login(this.props.state)        
        
//      console.log(this.props.msg)
//      if(this.props.msg){
//  		Toast.info(this.props.msg, 1);
//  	}
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
            onChange = {v => this.props.handleChange('user', v)}
            >用户名</InputItem>
                <InputItem
            type='password'
            onChange = {v => this.props.handleChange('pwd', v)}
            >密码</InputItem>
              </List>
              <WhiteSpace size="xl" />
              <Button type='primary'
              disabled={!this.props.state.user || !this.props.state.pwd }
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