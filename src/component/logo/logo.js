import React from 'react'
import logoImg from './logo.png'
import './logo.css'

class Logo extends React.Component {
	render() {
		return(
			<div className ='logo-container'>
        		<img src={logoImg} alt='logo'/>
        		<p>专注互联网行业招聘</p>
        	</div>
		)
	}
}

export default Logo