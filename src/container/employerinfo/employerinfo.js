import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatarselector/avatarselector'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'

@connect(
    state => state.user,
    {
        update
    }
)
class EmployerInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            avatar: '',
            company: '',
            salary: '',
            description: ''
        }
        this.selectAvatar = this.selectAvatar.bind(this)
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    selectAvatar(imgname) {
        this.setState({
            avatar: imgname
        })
    }

    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null}
                    <NavBar mode="dark">BOSS完善信息</NavBar>
                                <AvatarSelector
            selectAvatar = {this.selectAvatar}
            ></AvatarSelector>
                                <InputItem
            onChange = {(v) => this.onChange('title', v)}
            >招聘职位</InputItem>
                                <InputItem
            onChange = {(v) => this.onChange('company', v)}
            >公司名称</InputItem>
                                <InputItem
            onChange = {(v) => this.onChange('salary', v)}
            >职位薪资</InputItem>
                                <TextareaItem
            rows = {3}
            title = '职位简介'
            autoHeight
            onChange = {(v) => this.onChange('description', v)}
            ></TextareaItem>
                                <Button
            onClick={() => {
                this.props.update(this.state)
            }}
            type='primary'>保存</Button>
                        </div>
        )
    }
}

export default EmployerInfo
