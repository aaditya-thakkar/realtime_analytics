	var Appbase = require('appbase-js');
	var config = require("./config.json");

	module.exports = {
		createRequestObject : function(countryArr) {
			console.log("in object"+countryArr)
			return({
				type: config.appbase.type,
				body: {

					"aggs": {
						"filtered" : {



							"filter": {
								"terms":{
									"country_name": countryArr
								}
							},
							"aggs" : {
								"country_count" : { 
									"terms" : {
										"field": "country_name"
									} 
								}
							}

						}
					}
				}
			});

		},

		createAppbaseRef : function(){
			return (
				new Appbase({
					url: 'https://scalr.api.appbase.io',
					appname: config.appbase.appname,
					username: config.appbase.username,
					password: config.appbase.password
				})
				);
		}
	}
