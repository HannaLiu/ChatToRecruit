const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd':0,'__v':0}

//清除聊天记录
// Chat.remove({},function(e,d){})

Router.get('/list',function(req,res){	
	//清除所有list
	// User.remove({},function(e,d){})
	const { type } = req.query
	//查找list
	User.find({type},function(err,doc){
		return res.json({code:0,data:doc})
	})
})

Router.get('/getmsglist',function(req,res){
	const user = req.cookies.userid
	User.find({},function(e,userdoc){
		let users = {}
		userdoc.forEach(v=>{
			users[v._id] = {name:v.user,avatar:v.avatar}
		})
		Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
			if(!err){
				return res.json({code:0,msgs:doc,users:users})
			}
		})
	})

	// mongodb语法
	// {'$or':[{from:user,to:user}]}
	//查询所有信息
	// Chat.find({},function(err,doc){
	// 	if(!err){
	// 		return res.json({code:0,msgs:doc})
	// 	}
	// })
})

Router.post('/readmsg',function(req,res){
	const userid = req.cookies.userid
	const {from} = req.body
	Chat.update(
		{from,to:userid},
		{'$set':{read:true}},
		{'multi':true},
		function(err,doc){
			console.log(doc)
			if(!err){
				return res.json({code:0,num:doc.nModified})
			}
			return res.json({code:1,msg:'修改失败'})
		})
})


Router.post('/update',function(req,res){
	const userid = req.cookies.userid
	if(!userid){
		return json.dumps({code:1})
	}
	const body = req.body
	User.findByIdAndUpdate(userid,body,function(err,doc){
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data})
	})
})

Router.post('/login',function(req,res){
	const {user,pwd} = req.body
	User.findOne({user:user,pwd:md5Pwd(pwd)},_filter ,function(err,doc){
		if(!doc){
			return res.json({code:1,msg:'用户名不存在或密码错误'})
		}
		//设置cookie
		res.cookie('userid',doc._id)
		return res.json({code:0,data:doc})
	})
})

Router.post('/register',function(req,res){
	console.log(req.body)
	const {user,pwd,type} = req.body
	User.findOne({user:user},function(err,doc){
		if(doc){
			return res.json({code:1,msg:'用户名已存在'})
		}
		const userModel = new User({user,type,pwd:md5Pwd(pwd)})
		userModel.save(function(e,d){
			if(e){
				return res.json({code:1,msg:"服务正忙，请稍后再试"})
			}
			const {user,type,_id} = d
			res.cookie('userid',_id)
			return res.json({code:0,data:{user,type,_id}})
		})

		//creat方法不能得到_id,换用save方法
		// User.create({user,pwd:md5Pwd(pwd),type},function(err,doc){
		// 	if(err){
		// 		return res.json({code:1,msg:'服务正忙，请稍后再试'})
		// 	}
		// 	return res.json({code:0})
		// })
	})
})

Router.get('/info',function(req,res){
	const {userid} = req.cookies
	if(!userid){
		return res.json({code:1})
	}
	User.findOne({_id:userid},_filter ,function(err,doc){
		if(err){
			return res.json({code:1,msg:'服务正忙，请稍后再试'})
		}
		if(doc){
			return res.json({code:0,data:doc})
		}
		
	})
})

function md5Pwd(pwd){
	//salt可随机生成
	const salt = 'fndjvrfewewq9eu!8$3yr437t_54tu_fhs'
	return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router