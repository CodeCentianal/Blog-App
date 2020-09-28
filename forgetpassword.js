const jwt = require('jsonwebtoken');

module.exports = (forgetpassword,knex)=>{

	forgetpassword

		.put('/',verifyToken,(req,res)=>{

			var username = req.body.username;
			var updatedpassword = req.body.updatedpassword;
			
			knex('fbsignup').where("username",username).then(rows=>{
			var personaldata = rows[0]
			var firstname = personaldata["firstname"];

			knex('fbsignup').where("username",username).update("password",updatedpassword).then(rows=>{
				res.send(`Mr.${firstname} your password sucessfully updated!!!`)
			})

		})

	})

	// endpoint for creating token using username:-

	.post('/token',(req,res)=>{

		var username = req.body.username;
		var updatedpassword = req.body.updatedpassword;
		res.send(jwt.sign(username,"my_secrete_key"));

	})

	// middle ware function

	function verifyToken(req,res,next){
		const header = req.headers['authorization']
		const verification = jwt.verify(header,"my_secrete_key")

		if(verification == req.body.username){
			next()
		}else{
			res.send('your are not authenticate properly!!!!')
		}
	}	

}

