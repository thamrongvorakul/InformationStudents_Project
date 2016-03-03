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
              client.delete({
                      index: 'upload_log',
                      type: data.path,
                      id: data.id
              },
              function (error, response) {
                return res.ok();

              });
            },

            upload: function  (req, res)
              {
                  var data = req.allParams();

                  var path_hw = 'D:/InformationStudents/assets/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/homework/';
                  var path_doc = 'D:/InformationStudents/assets/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/documents/';
                  var path_news = 'D:/InformationStudents/assets/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/news/';
                  var path_score = 'D:/InformationStudents/assets/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/score/';
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


                  req.file('file').upload({

                    dirname : path_keep,
                    saveAs: function(__newFile, cb) {
                       cb(null, __newFile.filename);
                     },
                  },
                  function (err, files)
                    {
                      client.bulk({
                        body :[
                            { index : { _index: 'upload_log' , _type: data.path } },
                            { Lec_Name_Upload : data.Lec_Name_Default ,Lec_Name : data.Lec_Name,Subject: data.subject,Subject_Name : data.subject_default, Term : data.term , Year : data.year , Path_Upload : path_keep ,
                              Date_Upload : data.Date_Upload , File_Name : files},
                        ]
                      }, function (error, response){
                          console.log(error);
                      });

                        if (err)
                        {
                            return res.negotiate(err);
                            return res.serverError(err);
                        }
                    });
              return res.send('Response OK');
            },



            get_files: function (req,res){
              var dataJson = req.allParams();
              var files ;
              client.search({
                  index: 'upload_log',
                  type : dataJson.path,
                  body: {
                    size : "100",
                    query: {
                      bool: {
                        must :[
                          {match_phrase : {Subject_Name : dataJson.subject_default}},
                          {match_phrase : {Term : dataJson.term}},
                          {match_phrase : {Year : dataJson.year}}
                        ]
                      }
                    }
                  }
              })
              .then(function (response) {
                  hits = response.hits.hits;
                  files = fs.readdirSync(hits[0]["_source"]["Path_Upload"]);

              })
                return res.send(files);
            },

            get_term_year : function (req,res){
              var dataJson = req.allParams();
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
