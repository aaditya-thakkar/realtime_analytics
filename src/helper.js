var Appbase = require('appbase-js');
var config = require("./config.json");

module.exports = {
	createRequestObject : function(filteredCountries) {
		return({
			type: config.appbase.type,
			body: {
				"aggs": {
					"filtered" : {
						"filter": {
							"terms":{
								"country_name": filteredCountries
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
