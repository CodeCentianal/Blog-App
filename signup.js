module.exports = (signup,knex) =>{

	signup

		.post('/',(req,res)=>{
			var Fbaccount = req.body
			var username = req.body.username;
			var password = req.body.password;
			var firstname = req.body.firstname;


			var fb_profile_id = "facebook.com/"+firstname+"."+password;
			Fbaccount["fb_profile_id"] = fb_profile_id;

			knex('fbsignup').select("*").then((rows)=>{
				var data = rows;
				if(data.length === 0){

					knex.schema.createTable(firstname,(table)=>{
					table.string('fb_profile_id').defaultTo(fb_profile_id);
					table.increments('post_id');
					table.string('post').defaultTo('');

					}).then(()=>{
						console.log(`${firstname} table is created`)
					})
				
					knex('fbsignup').insert(Fbaccount).then((rows)=>{
						res.send("successfully signup to your account");
					})
				}
				else{
					
					var decition = false;

					data.forEach(function(arg){
						if(arg.fb_profile_id === fb_profile_id)
						{
							decition = true;					
						}
						else
						{
							decition = false;
						}
					})
					if(decition){
						res.send(`Mr.${firstname} your account is already existed!`)
					}
					else{

						knex.schema.createTable(firstname,(table)=>{
							table.string('fb_profile_id').defaultTo(fb_profile_id);
							table.increments('post_id');
							table.string('post').defaultTo('');

						}).then(()=>{
							console.log(`${firstname} table is created`)
						})
						
						knex('fbsignup').insert(Fbaccount).then((rows)=>{
							res.send("successfully signup to your account");
						})
					}

				}
			})
		})
	}


