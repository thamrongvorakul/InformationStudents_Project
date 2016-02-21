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
    var str_lec_name_split = dataJson.data.Lec_Name.split(" ");
    var str_sub_split = dataJson.data.Subject_Name.split(" ");
    var str_name = '';
    var str_sub = '';
    for (var i =0;i<str_lec_name_split.length; i++){str_name = str_name + str_lec_name_split[i]};
    for (var i =0;i<str_sub_split.length; i++){str_sub = str_sub + str_sub_split[i]};

          child = exec('mkdir '+pathforCreateDir+str_name+'\\'+str_sub+'\\'+dataJson.data.Term+'.'+dataJson.header.Year+'\\homework',
          function (error, stdout, stderr)
          {
          });
          child = exec('mkdir '+pathforCreateDir+str_name+'\\'+str_sub+'\\'+dataJson.data.Term+'.'+dataJson.header.Year+'\\documents',
          function (error, stdout, stderr)
          {
          });
          child = exec('mkdir '+pathforCreateDir+str_name+'\\'+str_sub+'\\'+dataJson.data.Term+'.'+dataJson.header.Year+'\\news',
          function (error, stdout, stderr)
          {
          });
          child = exec('mkdir '+pathforCreateDir+str_name+'\\'+str_sub+'\\'+dataJson.data.Term+'.'+dataJson.header.Year+'\\score',
          function (error, stdout, stderr)
          {
          });
    return res.ok();
  },

    get_data_on_elasticsearch : function (req,res){
      var dataJson = req.allParams();
      client.search({
            index: 'subject',
            body: {
              size : "100",
              query: {
                match_phrase: {
                  Lec_Name: dataJson.Lec_Name
                }
              }
            }
          })
          .then(function (response) {
              var hits = response.hits.hits;
              res.send(hits);
          })
    },

    delete_subject_on_elasticsearch : function (req,res){
      var dataJson = req.allParams();
            client.delete({
                    index: 'subject',
                    type: dataJson.header.type,
                    id: dataJson.header.id
            },
            function (error, response) {
              return res.ok();
            });
    }

};
