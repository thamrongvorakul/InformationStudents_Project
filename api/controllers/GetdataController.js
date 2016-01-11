/**
 * GetdataController
 *
 * @description :: Server-side logic for managing Getdatas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 module.exports = {
 	getdata_on_combobox: function  (req, res) {
 		var data = [
 		  { "Feed_Name": "การบ้าน"},
 		  { "Feed_Name": "เอกสารประกอบการเรียน"},
      { "Feed_Name": "อัพเดทข่าวสาร"},
      { "Feed_Name": "คะแนนสอบ"},
      { "Feed_Name": "กลางภาค5555"}
 		]
 		return res.send(data);
 	}
 };
