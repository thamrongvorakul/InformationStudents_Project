'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200'
      });
      var path = require('path');
      var fs = require('fs');
      var folderuploadname;
      var fileuploadname;
      var feedname;
      var scripter;
      var typefile;





module.exports = {

            lecturer_profile_upload: function  (req, res)
              {
                  var data = req.allParams();
                  var education_parse = JSON.parse(data.education);
                  var research_parse = JSON.parse(data.research);
                  var subject_parse = JSON.parse(data.subject_holding);
                  var education_arr = [];
                  var research_arr = [];
                  var subject_holding = [];
                  for (var i =0 ;i<data.len_edu ; i++){
                    education_arr.push(education_parse[i].value);
                  }
                  for (var i =0 ;i<data.len_res ; i++){
                    research_arr.push(research_parse[i].value);
                  }
                  for (var i =0 ;i<data.len_sub ; i++){
                    subject_holding.push(subject_parse[i].value);
                  }
                  var path_keep  = 'D:/InformationStudents/assets/Lecturer_Image_Upload/'+data.Name_Path_Upload+'/';
                  req.file('file').upload({

                    dirname : path_keep,
                    saveAs: function(__newFile, cb) {
                       cb(null, __newFile.filename);
                     },
                  },
                  function (err, files)
                    {
                          var path_keep_to_elasticesearch = 'Lecturer_Image_Upload/'+data.Name_Path_Upload+'/';
                          client.bulk({
                            body :[
                                { index : { _index: 'teacher' , _type: 'data' , _id : data.id } },
                                { Name : data.Name , position : data.position , education : education_arr , research : research_arr , subject_holding : subject_holding,
                                  aboutme : { room : data.room , homepage : data.homepage , email : data.email , tel_no : data.tel_no} , path_file_pic_icon : path_keep_to_elasticesearch + data.name_image_icon,
                                  path_file_pic_main : path_keep_to_elasticesearch + data.name_image_main , Status_Room : data.Status_Room
                                },
                            ]
                          }, function (error, response){
                              console.log(error);
                          });
                    });
              return res.send('Response OK');
            } ,

            lecturer_profile_update : function (req,res){
              var data = req.allParams();
              var education_parse = JSON.parse(data.education);
              var research_parse = JSON.parse(data.research);
              var subject_parse = JSON.parse(data.subject_holding);
              var education_arr = [];
              var research_arr = [];
              var subject_holding = [];
              for (var i =0 ;i<data.len_edu ; i++){
                education_arr.push(education_parse[i].data);
              }
              for (var i =0 ;i<data.len_res ; i++){
                research_arr.push(research_parse[i].data);
              }
              for (var i =0 ;i<data.len_sub ; i++){
                subject_holding.push(subject_parse[i].data);
              }


              var path_keep  = 'D:/InformationStudents/assets/Lecturer_Image_Upload/'+data.Name_Path_Upload+'/';
              req.file('file').upload({

                dirname : path_keep,
                saveAs: function(__newFile, cb) {
                   cb(null, __newFile.filename);
                 },
              },
              function (err, files)
                {
                      var path_keep_to_elasticesearch = 'Lecturer_Image_Upload/'+data.Name_Path_Upload+'/';
                      client.delete({
                              index: 'teacher',
                              type: 'data',
                              id: data.id_for_delete
                      },function(){});
                      client.bulk({
                        body :[
                            { index : { _index: 'teacher' , _type: 'data' , _id : data.id } },
                            {   Name : data.Name , position : data.position , education : education_arr , research : research_arr , subject_holding : subject_holding,
                              aboutme : { room : data.room , homepage : data.homepage , email : data.email , tel_no : data.tel_no} , path_file_pic_icon : path_keep_to_elasticesearch + data.name_image_icon,
                              path_file_pic_main : path_keep_to_elasticesearch + data.name_image_main , Status_Room : data.Status_Room
                            },
                        ]
                      }, function (error, response){
                          console.log(error);
                      });


                      User.update({email:data.email_user},{Title:data.Title})
                      .exec(function afterwards(err, updated){if (err) {return;}})
                      User.update({email:data.email_user},{FName:data.FName})
                      .exec(function afterwards(err, updated){if (err) {return;}})
                      User.update({email:data.email_user},{LName:data.LName})
                      .exec(function afterwards(err, updated){if (err) {return;}})
                      client.search({
                          index: 'user',
                          type : 'login',
                          body : {
                            query : {
                              bool : {
                                must : [
                                  {match_phrase :{Title : data.Title_Default}},
                                  {match_phrase : {FName : data.FName_Default}},
                                  {match_phrase : {LName : data.LName_Default}}
                                ]
                              }
                            }
                          }
                      })
                      .then(function (response) {
                          var hits = response.hits.hits;
                          client.delete({
                                  index: 'user',
                                  type: 'login',
                                  id: data.id_for_delete_user
                          },function(){});
                          client.bulk({
                            body :[
                                { index: { _index: 'user' , _type:'login' , _id:  data.FName + '::' + data.LName} },
                                { Title: data.Title ,ID_NO: hits[0]["_source"]["ID_NO"], FName : data.FName , LName : data.LName , email_id :hits[0]["_source"]["email_id"],
                                  encryptedPassword :  hits[0]["_source"]["encryptedPassword"] , password : hits[0]["_source"]["password"]
                                },
                            ]
                          }, function (error, response){
                              console.log(error);
                          });

                    });


                });
          return res.send('Response OK');
            }



};
