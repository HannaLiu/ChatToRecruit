import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookies from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'


@connect(
    state => state.user,
    { logoutSubmit }
)
class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {
        const alert = Modal.alert;
        alert('退出', '您确定要退出吗?', [
            {
                text: '取消',
                onPress: () => console.log('cancel'),
                style: 'default'
            },
            {
                text: '确定',
                onPress: () => {
                	browserCookies.erase('userid')
                	this.props.logoutSubmit()
                }
            },
        ]);
    }

    render() {
        const Item = List.Item
        const Brief = Item.Brief
        return this.props.user ? (
            <div>
				<Result
            img={<img style={{
                width: 50
            }} src={require(`../avatarselector/img/${this.props.avatar}.png`)} alt={this.props.user}/>}
            title={this.props.user}
            message={this.props.type === 'employer' ? this.props.company : null}
            />
				<List renderHeader={() => '简介'}>
					<Item multipleLine wrap>
						{this.props.title}
						{this.props.salary ? (<p>薪资：{this.props.salary}</p>) : null}
						{this.props.description.split('\n').map(v => (<Brief key={v}>{v}</Brief>))}
					</Item>
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
				<Item style={{zIndex: 1}} className="logoutBtn" onClick={this.logout}>退出登录</Item>
            </List>
			</div>
            ) : <Redirect to={this.props.redirectTo} />
    }
}

export default User