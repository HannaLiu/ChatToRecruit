import React from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component {    
    static propTypes ={
        userlist: PropTypes.array.isRequired
    }

    handleClick(v){
    	this.props.history.push(`/chat/${v._id}`)
    }

    render() {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
				<WhiteSpace></WhiteSpace>
				{this.props.userlist.map(v => (v.avatar ? (
					<Card style={{'zIndex':100}} key={v._id} onClick={()=>this.handleClick(v)}>
						<Header
		                  title={v.user}
		                  thumb={require(`../avatarselector/img/${v.avatar}.png`)}
		                  thumbStyle={{width: 30}}
		                  extra={<span>{v.title}</span>}>
						</Header>
						<Body>
							{v.type === 'employer' ? (<p>公司：{v.company}</p>) : null}
							{v.type === 'employer' ? (<p>薪资：{v.salary}</p>) : null}
							{v.description.split('\n').map((d, i) => (<p key={i}>{d}</p>))}
						</Body>
					</Card>) : null
  					)				
				)}
				<WhiteSpace></WhiteSpace>
			</WingBlank>
        )
    }
}

export default UserCard