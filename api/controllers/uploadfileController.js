'use strict';
var    elasticsearch = require('elasticsearch');
var    nodemailer    = require  ('nodemailer');

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
      var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'webinformationstudents@gmail.com',
            pass: 'informationstudents'
          }
      });


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
              var path_hw_tmp= 'D:/InformationStudents/.tmp/public/FileUpload/'+lec_name+'/'+subject+'/'+data.term+'.'+data.year+'/homework/';
              var path_doc_tmp = 'D:/InformationStudents/.tmp/public/FileUpload/'+lec_name+'/'+subject+'/'+data.term+'.'+data.year+'/documents/';
              var path_news_tmp = 'D:/InformationStudents/.tmp/public/FileUpload/'+lec_name+'/'+subject+'/'+data.term+'.'+data.year+'/news/';
              var path_score_tmp = 'D:/InformationStudents/.tmp/public/FileUpload/'+lec_name+'/'+subject+'/'+data.term+'.'+data.year+'/score/';
              var path_send_homework_tmp = 'D:/InformationStudents/.tmp/public/FileUpload/'+lec_name+'/'+subject+'/'+data.term+'.'+data.year+'/send_homework/';
              var path_keep_tmp ;
              var path_keep ;

              if (data.path === "homework"){
                path_keep = path_hw;
                path_keep_tmp = path_hw_tmp;

              }
              else if (data.path === "documents"){
                path_keep = path_doc;
                path_keep_tmp = path_doc_tmp;

              }
              else if (data.path === 'score'){
                path_keep = path_score;
                path_keep_tmp = path_score_tmp;
              }
              else {
                path_keep = path_send_homework;
                path_keep_tmp = path_send_homework_tmp;
              }

              fs.unlink(path_keep + data.files_name , function(err){
                  if (err) throw err;
              });
              fs.unlink(path_keep_tmp + data.files_name , function(err){
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
                  console.log(data.type_for_followers)

                  var path_hw = 'D:/InformationStudents/assets/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/homework/';
                  var path_doc = 'D:/InformationStudents/assets/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/documents/';
                  var path_news = 'D:/InformationStudents/assets/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/news/';
                  var path_score = 'D:/InformationStudents/assets/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/score/';
                  var path_send_homework = 'D:/InformationStudents/assets/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/send_homework/';
                  var path_hw_tmp= 'D:/InformationStudents/.tmp/public/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/homework/';
                  var path_doc_tmp = 'D:/InformationStudents/.tmp/public/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/documents/';
                  var path_news_tmp = 'D:/InformationStudents/.tmp/public/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/news/';
                  var path_score_tmp = 'D:/InformationStudents/.tmp/public/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/score/';
                  var path_send_homework_tmp = 'D:/InformationStudents/.tmp/public/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/send_homework/';
                  var path_keep_tmp ;
                  var path_keep ;

                  if (data.path === "homework"){
                    path_keep = path_hw;
                    path_keep_tmp = path_hw_tmp;
                  }
                  else if (data.path === "documents"){
                    path_keep = path_doc;
                    path_keep_tmp = path_doc_tmp;
                  }
                  else if (data.path === "score"){
                    path_keep = path_score;
                    path_keep_tmp = path_score_tmp;
                  }
                  else {
                    path_keep = path_send_homework;
                    path_keep_tmp = path_send_homework_tmp;
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

                      client.search({
                          index: 'log_follow',
                          type : data.type_for_followers,
                          body: {
                            size : "100",
                            query: {
                              match_all : {}
                            }
                          }
                      })
                      .then(function (response) {
                          var hits = response.hits.hits;
                          console.log(data.type_for_followers)

                          for (var i=0 ;i <hits.length ; i++){
                            var mailOptions = {
                                from: 'webinformationstudents',
                                to: hits[i]["_source"]["Std_Email"] ,
                                subject: 'มีการอัพเดทข้อมูลของวิชา ' + data.subject_default + '(' + data.term + '/' + data.year + ')',
                                text: 'ถึง คุณ ' + hits[i]["_source"]["Std_FName"] +' ' + hits[i]["_source"]["Std_LName"] + '\n'
                                + 'รายวิชา ' + data.subject_default + '(' + data.term + '/' + data.year + ') ' +'ได้มีการอัพเดทข้อมูลในหัวข้อ' + '\n'
                                + data.path + 'โดย อาจารย์' + data.Lec_Name_Default
                            };
                            console.log(mailOptions.text);
                            transporter.sendMail(mailOptions, function(error, info){

                                    if(error){
                                        return console.log(error);
                                    }
                                    console.log('Message sent: ' + info.response);

                            });
                          }
                      })
                        if (err)
                        {
                            return res.negotiate(err);
                            return res.serverError(err);
                        }
                    });

                                      req.file('file').upload({

                                        dirname : path_keep_tmp,
                                        saveAs: function(__newFile, cb) {
                                           cb(null, __newFile.filename);
                                         },
                                      },
                                      function (err, files)
                                        {
                                        });
              return res.send('Response OK');
            },

            postsendhomework : function (req,res){
              var data = req.allParams();

              var path_hw = 'D:/InformationStudents/assets/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/homework/';
              var path_doc = 'D:/InformationStudents/assets/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/documents/';
              var path_news = 'D:/InformationStudents/assets/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/news/';
              var path_score = 'D:/InformationStudents/assets/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/score/';
              var path_send_homework = 'D:/InformationStudents/assets/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/send_homework/' + data.Times_Homework_Select +'/';
              var path_hw_tmp= 'D:/InformationStudents/.tmp/public/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/homework/';
              var path_doc_tmp = 'D:/InformationStudents/.tmp/public/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/documents/';
              var path_news_tmp = 'D:/InformationStudents/.tmp/public/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/news/';
              var path_score_tmp = 'D:/InformationStudents/.tmp/public/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/score/';
              var path_send_homework_tmp = 'D:/InformationStudents/.tmp/public/FileUpload/'+data.Lec_Name+'/'+data.subject+'/'+data.term+'.'+data.year+'/send_homework/';
              var path_keep_tmp ;
              var path_keep ;
              if (data.path === "homework"){
                path_keep = path_hw;
                path_keep_tmp = path_hw_tmp;

              }
              else if (data.path === "documents"){
                path_keep = path_doc;
                path_keep_tmp = path_doc_tmp;

              }
              else if (data.path === "score"){
                path_keep = path_score;
                path_keep_tmp = path_score_tmp;

              }
              else {
                path_keep = path_send_homework;
                path_keep_tmp = path_send_homework_tmp;

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
                        { index : { _index: 'send_homework' , _type: data.path } },
                        { Lec_Name_Upload : data.Lec_Name_Default ,Lec_Name : data.Lec_Name,Subject: data.subject,Subject_Name : data.subject_default, Std_Name : data.Std_Name,ID_NO : data.ID_NO,Term : data.term , Year : data.year , Path_Upload : path_keep ,
                          Date_Upload : data.Date_Upload ,Description_Homework_Send : data.Description_Homework_Send ,Score:parseInt(data.Score),Status_Score_Add : parseInt(data.Status_Score_Add),Times_Homework_Select : data.Times_Homework_Select,Subject_Send_Homework : data.Subject_Send_Homework, File_Name : files},
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
                req.file('file').upload({

                  dirname : path_keep_tmp,
                  saveAs: function(__newFile, cb) {
                     cb(null, __newFile.filename);
                   },
                },
                function (err, files)
                  {
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
