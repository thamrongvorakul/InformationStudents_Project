'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200',
          log : 'trace'
      });
      var path = require('path');
      var fs = require('fs');
      var path_hw = 'D:/InformationStudents/assets/FileUpload/Lec.A/Algorithm/homework/';
      var path_doc = 'D:/InformationStudents/assets/FileUpload/Lec.A/Algorithm/documents/';
      var path_news = 'D:/InformationStudents/assets/FileUpload/Lec.A/Algorithm/news/';
      var path_score = 'D:/InformationStudents/assets/FileUpload/Lec.A/Algorithm/score/';


module.exports = {



            get_files_homework: function (req,res){
              var files = fs.readdirSync(path_hw);

              files.sort(function(a, b) {
               return fs.statSync(path_hw + a).mtime.getTime() -
                      fs.statSync(path_hw + b).mtime.getTime();
              });
              return res.send(files);
            },

            get_files_documents: function (req,res){
              var files = fs.readdirSync(path_doc);
              files.sort(function(a, b) {
               return fs.statSync(path_doc + a).mtime.getTime() -
                      fs.statSync(path_doc + b).mtime.getTime();
              });
              return res.send(files);
            },

            ///// NEWS
            insert_news_data: function (req,res){
              var dataJson = req.allParams();
                  client.bulk({
                    body :[
                        { index : { _index: dataJson.header.index , _type:dataJson.header.type } },
                        { Type: dataJson.data.Type , Subject_Term :dataJson.data.Subject_Term , Lec_Name :  dataJson.data.Lec_Name ,Embed_Code :dataJson.data.Embed_Code ,Video_Name: dataJson.data.Video_Name , Date_Upload: dataJson.data.Date_Upload , Description : dataJson.data.Description  },
                    ]
                  }, function (error, response){
                      console.log(error);
                  });

              res.ok();


            },
            get_files_news: function (req,res){
              var dataJson = req.allParams();
              var hits;
              client.search({
                  index: dataJson.header.index,
                  type : dataJson.header.type
              })
              .then(function (response) {
                  hits = response.hits.hits;
                  res.send(hits);
              })

            },

            get_files_score: function (req,res){
              var files = fs.readdirSync(path_score);

              files.sort(function(a, b) {
               return fs.statSync(path_score + a).mtime.getTime() -
                      fs.statSync(path_score + b).mtime.getTime();
              });
              return res.send(files);
            }


};
