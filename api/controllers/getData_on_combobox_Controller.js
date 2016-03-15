/**
 * GetdataController
 *
 * @description :: Server-side logic for managing Getdatas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var    elasticsearch = require('elasticsearch');
 var    client = new elasticsearch.Client({
           host: '161.246.60.104:9200'
       });

module.exports = {
	getdata_on_combobox: function  (req, res) {
		var data = [
		{ "Feed_Name": "การบ้าน"},
		{ "Feed_Name": "เอกสารประกอบการเรียน"},
    { "Feed_Name": "อัพเดทข่าวสาร"},
    { "Feed_Name": "คะแนนสอบ"},
    { "Feed_Name": "กล่องการบ้าน"}
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

  getdata_homework_times : function (req,res){
    var data = [
      {"Times" : "1"},
      {"Times" : "2"},
      {"Times" : "3"},
      {"Times" : "4"},
      {"Times" : "5"},
      {"Times" : "6"},
      {"Times" : "7"},
      {"Times" : "8"},
      {"Times" : "9"},
      {"Times" : "10"},
      {"Times" : "11"},
      {"Times" : "12"},
      {"Times" : "13"},
      {"Times" : "14"},
      {"Times" : "15"},
      {"Times" : "16"},
      {"Times" : "17"},
      {"Times" : "18"},
      {"Times" : "19"},
      {"Times" : "20"},

    ]
    return res.send(data);
  },

  get_data_title_name : function (req,res){
    var data = [
      {"value" : "อาจารย์"},
      {"value" :"นาย"} ,
      {"value" :"นาง"},
      {"value":"น.ส."},
      {"value":"ม.จ."} ,
      {"value":"ม.ร.ว."},
      {"value":"ม.ล."},
      {"value":"ดร."},
      {"value":"ศ.ดร."},
      {"value":"ศ."},
      {"value":"ผศ.ดร."},
      {"value":"ผศ."},
      {"value":"รศ.ดร."},
      {"value":"รศ."},
      {"value":"Mr."},
      {"value":"Mrs."},
      {"value":"Ms."},
      {"value":"Miss"},
      {"value":"Dr."}
    ];
    return res.send(data);
  },
  get_data_reason : function(req,res){
    var data = [
      {"reason" : "เกรดง่าย"},
      {"reason" : "เนื้อหาเข้าใจง่าย"},
      {"reason" : "อาจารย์สอนดี"},
      {"reason" : "เป็นวิชาที่อยากเรียน"}
    ];

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
