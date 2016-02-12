/**
 * GetdataController
 *
 * @description :: Server-side logic for managing Getdatas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var    elasticsearch = require('elasticsearch');
 var    client = new elasticsearch.Client({
           host: '161.246.60.104:9200',
           log : 'trace'
       });

module.exports = {
	getdata_on_combobox: function  (req, res) {
		var data = [
		{ "Feed_Name": "การบ้าน"},
		{ "Feed_Name": "เอกสารประกอบการเรียน"},
    { "Feed_Name": "อัพเดทข่าวสาร"},
    { "Feed_Name": "คะแนนสอบ"}
		]
		return res.send(data);
	},

	getdata_on_term_subject : function  (req,res){
		var data  = [
			{ "Term" : "1" },
			{ "Term" : "2" },
			{ "Term" : "summer" }
		]
		return res.send(data);
	},

	getdata_on_year_subject : function (req,res){
		var data = [
			{"Year" : "2557"},
			{"Year" : "2558"},
			{"Year" : "2559"}
		]
		return res.send(data);

	},

	getdata_on_subject_search : function (req,res){

		var dataJson = req.allParams();
		var hits;
		client.search({
				index: dataJson.index,
				body: {
					query: {
						match_phrase: {
							Lec_Name: dataJson.Lec_Name
						}
					}
				}
		})
		.then(function (response) {
				hits = response.hits.hits;
				res.send(hits);
		})
	}



};
