import React from 'react'
import { NavBar, InputItem, TextareaItem, Button,WingBlank } from 'antd-mobile'
import AvatarSelector from '../../component/avatarselector/avatarselector'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'

@connect(
  state=>state.user,
  {update}
)
class GeniusInfo extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        title:'',
        avatar:'',
        description:''
      }
      this.selectAvatar= this.selectAvatar.bind(this)
    }

    onChange(key,val){
      this.setState({
        [key]:val
      })
    }

    selectAvatar(imgname){
      this.setState({
        avatar:imgname
      })
    }

    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
              {redirect&&redirect!==path?<Redirect to={this.props.redirectTo} /> :null}
              <NavBar mode="dark">人才完善信息</NavBar>
                <AvatarSelector
                  selectAvatar = {this.selectAvatar}
                ></AvatarSelector>
                <WingBlank>
                <InputItem
                  onChange = {(v)=>this.onChange('title',v)}
                >求职岗位</InputItem>
                <TextareaItem
                  rows = {3}
                  title = '个人简介'
                  autoHeight
                  onChange = {(v)=>this.onChange('description',v)}
                ></TextareaItem>
                <Button 
                  onClick={()=>{
                    this.props.update(this.state)
                  }}
                 type='primary'>保存</Button>
                 </WingBlank>
            </div>
        )
    }
}

export default GeniusInfo
