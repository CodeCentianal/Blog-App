module.exports = (views,knex)=>{

	views
		.post('/',(req,res)=>{

			var data1 = req.body;

			var data2 = {username:data1.username,password:data1.password}
			var post = data1.post;
			var username = data1.username;
			var password = data1.password;

			knex('fbsignup').where(data2).then(rows=>{
				var data3 = rows[0];
				var fb_profile_id1 = data3.fb_profile_id;
				var firstname1 = data3.firstname;
				knex('fblogin').where("post",post).then(rows=>{
					var fb_profile_id2 = rows[0]["fb_profile_id"]
					var initialViews = rows[0]["views"];

					// if block

					if(fb_profile_id2 == fb_profile_id1){

						res.send(`Mr.${firstname1} your view is already counted for this post`)

					}

					//  else block

					else {

						knex('views').select("*").then(rows=>{

							// if block

							if(rows.length == 0){

								knex('views')
									.insert({fb_profile_id:fb_profile_id1,post:post,views:1})
										.then(rows=>{
											console.log(`Mr.${firstname1} your view is counted for this post`);
								})

								knex('fblogin').where('post',post)
									.update({views:initialViews+1})
										.then(rows=>{
											res.send(`Mr.${firstname1} your view is counted for this post`);
								})
							}

							else{

								knex('views')

									.where({fb_profile_id:fb_profile_id1,post:post})

										.then(rows=>{

											if(rows.length == 0){
												
												knex("views")

														.insert({fb_profile_id:fb_profile_id1,post:post,views:1})

															.then(rows=>{

																console.log(`Mr.${firstname1} your view is counted for this post`)

												})

												knex('fblogin').where('post',post)

													.update({views:initialViews+1})

														.then(rows=>{

															res.send(`Mr.${firstname1} your view is counted for this post`);

												})	

											}

											else{

												res.send(`Mr.${firstname1} your view is already counted for this post`)

											}
								})

							}

						})

					}
					
				})
			})
	
		})

	}


