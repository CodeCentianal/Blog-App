const jwt = require('jsonwebtoken');


module.exports = (login,knex)=>{

	login
		.put('/',verifyToken,(req,res)=>{
			var username = req.body.username;
			var password = req.body.password;
			knex('fblogin').select('*').then((rows)=>{
				function Shuffle(array) {
					  var currentIndex = array.length, temporaryValue, randomIndex;
					  while (0 !== currentIndex) {
					    randomIndex = Math.floor(Math.random() * currentIndex);
					    currentIndex -= 1;
					    temporaryValue = array[currentIndex];
					    array[currentIndex] = array[randomIndex];
					    array[randomIndex] = temporaryValue;
					  }
					  return array;
					}
					var listofdata = rows;	
				res.send(Shuffle(listofdata));
		})
	})

	// endpoint for creating token using username:-

	.post('/token',(req,res)=>{

		var username = req.body.username;
		var password = req.body.password;
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