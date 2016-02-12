'use strict';

var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200',
          log : 'trace'
      });

var pathforCreateDir = 'D:\\InformationStudents\\assets\\FileUpload\\';

module.exports = {

  insert_data_to_db_teacher: function  (req, res) {
    var dataJson = req.allParams();

    client.bulk({
      body : [
          { index:  { _index: dataJson.header.index , _type:dataJson.header.Year } },
          { Subject_Id : dataJson.data.Subject_Id , Subject_Name : dataJson.data.Subject_Name , Term : dataJson.data.Term , Lec_Name : dataJson.data.Lec_Name, Created_By : dataJson.data.Created_By , Description : dataJson.data.Description}
      ]
    }, function (error, response){
        if (error !== 'undefined'){
          console.log(error);
        }
    });

    var exec = require('child_process').exec,child;
    var str_name = dataJson.data.Lec_Name.replace(" " , "");

    var str_sub = dataJson.data.Subject_Name.replace(" ", "");
          child = exec('mkdir '+pathforCreateDir+str_name+'\\'+str_sub+'\\homework',
          function (error, stdout, stderr)
          {
          });
          child = exec('mkdir '+pathforCreateDir+str_name+'\\'+str_sub+'\\documents',
          function (error, stdout, stderr)
          {
          });
          child = exec('mkdir '+pathforCreateDir+str_name+'\\'+str_sub+'\\news',
          function (error, stdout, stderr)
          {
          });
          child = exec('mkdir '+pathforCreateDir+str_name+'\\'+str_sub+'\\score',
          function (error, stdout, stderr)
          {
          });
    return res.ok();
  }
};
