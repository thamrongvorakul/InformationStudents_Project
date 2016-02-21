'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200',
          log : 'trace'
      });
      var path = require('path');
      var fs = require('fs');
      var folderuploadname;
      var fileuploadname;
      var feedname;
      var scripter;
      var typefile;





module.exports = {


            remove_files : function (req,res){
              var data = req.allParams();

              var lec_name_split = data.Lec_Name.split(" ");
              var subject_split = data.subject.split(" ");
              var lec_name = '';
              var subject = '';
              for (var i=0;i<lec_name_split.length;i++){lec_name = lec_name + lec_name_split[i]};
              for (var i=0;i<subject_split.length;i++){subject = subject+subject_split[i]};
              var path_hw = 'D:/InformationStudents/assets/FileUpload/'+lec_name+'/'+subject+'/'+data.term+'.'+data.year+'/homework/';
              var path_doc = 'D:/InformationStudents/assets/FileUpload/'+lec_name+'/'+subject+'/'+data.term+'.'+data.year+'/documents/';
              var path_news = 'D:/InformationStudents/assets/FileUpload/'+lec_name+'/'+subject+'/'+data.term+'.'+data.year+'/news/';
              var path_score = 'D:/InformationStudents/assets/FileUpload/'+lec_name+'/'+subject+'/'+data.term+'.'+data.year+'/score/';
              var path_keep ;

              if (data.path === "homework"){
                path_keep = path_hw;
              }
              else if (data.path === "documents"){
                path_keep = path_doc;
              }
              else {
                path_keep = path_score;
              }

              fs.unlink(path_keep + data.files_name , function(err){
                  if (err) throw err;
              });
              return res.ok();
            },

            upload: function  (req, res)
              {
                  var data = req.allParams();
                  var lec_name_split = data.Lec_Name.split(" ");
                  var subject_split = data.subject.split(" ");
                  var lec_name = '';
                  var subject = '';
                  for (var i=0;i<lec_name_split.length;i++){lec_name = lec_name + lec_name_split[i]};
                  for (var i=0;i<subject_split.length;i++){subject = subject+subject_split[i]};
                  var path_hw = 'D:/InformationStudents/assets/FileUpload/'+lec_name+'/'+subject+'/'+data.term+'.'+data.year+'/homework/';
                  var path_doc = 'D:/InformationStudents/assets/FileUpload/'+lec_name+'/'+subject+'/'+data.term+'.'+data.year+'/documents/';
                  var path_news = 'D:/InformationStudents/assets/FileUpload/'+lec_name+'/'+subject+'/'+data.term+'.'+data.year+'/news/';
                  var path_score = 'D:/InformationStudents/assets/FileUpload/'+lec_name+'/'+subject+'/'+data.term+'.'+data.year+'/score/';
                  var path_keep ;

                  if (data.path === "homework"){
                    path_keep = path_hw;
                  }
                  else if (data.path === "documents"){
                    path_keep = path_doc;
                  }
                  else {
                    path_keep = path_score;
                  }


                  console.log(path_keep);
                  req.file('file').upload({
                    dirname : path_keep,
                    saveAs: function(__newFile, cb) {
                       cb(null, __newFile.filename);
                     },
                  },
                  function (err, files)
                    {


                        if (err)
                        {
                            return res.negotiate(err);
                            return res.serverError(err);
                        }
                    });
              console.log(fileuploadname);
              return res.send('Response OK');
            },


            bulkinsert: function (req, res) {
                var dataJson = req.allParams();

                console.log(fileuploadname);
                client.bulk({
                  body : [
                      { index:  { _index: dataJson.header.index , _type:dataJson.header.type , _id: fileuploadname} },
                      { Type_Folder : "homework" ,Lec_Name : "Lec.A" , Subject_Name : "Algorithm" , File_Name : fileuploadname , Description : dataJson.data.detail , Homework_Date : dataJson.data.homework_date , Date_Log : dataJson.data.date_log}
                  ]
                }, function (error, response){
                    console.log(error);
                });

                return res.send('Success');
            },

            get_files: function (req,res){
              var data = req.allParams();

              var files = fs.readdirSync('D:/InformationStudents/assets/FileUpload/Lec.A/Algorithm/homework/');
              return res.send(files);
            },

            get_term_year : function (req,res){
              var dataJson = req.allParams();
              console.log(55555);
              client.search({
                    index: 'subject',
                    body: {
                      size : "100",
                      query: {
                        match_phrase: {
                          Subject_Name: dataJson.subject_name
                        }
                      }
                    }
                  })
                  .then(function (response) {
                      var hits = response.hits.hits;
                      res.send(hits);
                  })
            }


};
