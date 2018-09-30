import React from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelector extends React.Component {
		static propTypes = {
			selectAvatar:PropTypes.func
		}

		constructor(props){
			super(props)
			this.state={}
		}

    render() {
        const avatarList = 'avatar,avatar1,avatar2,avatar3,avatar4,avatar5,avatar6,avatar7,avatar8,avatar9'
            .split(',')
            .map(v => ({
                icon: require(`./img/${v}.png`),
                text: v
            }))
        const gridHeader = this.state.icon?(<div><span>已选择头像:　</span><img style={{width:30}} src={this.state.icon} alt='avatar'/></div>):'请选择头像:'
        return (
            <div>
            	<List renderHeader = {()=>gridHeader}>
				<Grid
            		data = {avatarList}
            		columnNum ={5} 
            		onClick={elm=>{
            			this.setState(elm)
            			this.props.selectAvatar(elm.text)
            		}}
            		/>
            	</List>
            	
            </div>
        )
    }
}

export default AvatarSelector

