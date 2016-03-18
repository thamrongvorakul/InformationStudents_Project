var    elasticsearch = require('elasticsearch');
var    nodemailer    = require  ('nodemailer');

var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200'
      });
      var path = require('path');
      var fs = require('fs');
      var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'webinformationstudents@gmail.com',
                    pass: 'informationstudents'
                }
            });

module.exports = {



            get_files_homework: function (req,res){

              var dataJson = req.allParams();
              var hits;
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

                  res.send(hits);
              })



            },

            get_files_documents: function (req,res){
              var dataJson = req.allParams();
              var hits;
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

                  res.send(hits);
              })
            },

            ///// NEWS
            insert_news_data: function (req,res){
              var dataJson = req.allParams();
              if (dataJson.data.Type === 'clip'){
                client.bulk({
                  body :[
                      { index : { _index: 'upload_log' , _type:dataJson.data.path } },
                      { Type: dataJson.data.Type , Subject_Name : dataJson.data.Subject_Name_Default,Subject_Term :dataJson.data.Subject_Term ,Term : dataJson.data.Term,Year : dataJson.data.Year, Lec_Name_Upload :  dataJson.data.Lec_Name ,Message : dataJson.data.Message,Embed_Code :dataJson.data.Embed_Code ,Video_Name: dataJson.data.Video_Name , Date_Upload: dataJson.data.Date_Upload , Description : dataJson.data.Description , path_file_pic_icon : dataJson.data.path_file_pic_icon },
                  ]
                }, function (error, response){
                    console.log(error);
                });
                client.search({
                    index: 'log_follow',
                    type : dataJson.data.type_for_followers,
                    body: {
                      size : "100",
                      query: {
                        match_all : {}
                      }
                    }
                })
                .then(function (response) {
                    var hits = response.hits.hits;
                    for (var i=0 ;i <hits.length ; i++){
                      var mailOptions = {
                          from: 'webinformationstudents',
                          to: hits[i]["_source"]["Std_Email"] ,
                          subject: 'มีการอัพเดทข้อมูลของวิชา ' + dataJson.data.Subject_Name_Default + '(' + dataJson.data.Subject_Term + ')',
                          text: 'ถึง คุณ ' + hits[i]["_source"]["Std_FName"] +' ' + hits[i]["_source"]["Std_LName"] + '\n'
                          + 'รายวิชา ' + dataJson.data.Subject_Name_Default + '(' + dataJson.data.Subject_Term + ') ' +'ได้มีการอัพเดทข้อมูลในหัวข้อ' + '\n'
                          + 'อัพเดทข่าวสาร ' + 'โดย อาจารย์' + dataJson.data.Lec_Name
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

              }
              else if (dataJson.data.Type === 'text'){
                client.bulk({
                  body :[
                      { index : { _index: 'upload_log' , _type:dataJson.data.path } },
                      { Type: dataJson.data.Type , Subject_Name : dataJson.data.Subject_Name_Default,Subject_Term :dataJson.data.Subject_Term,Term : dataJson.data.Term,Year : dataJson.data.Year , Lec_Name_Upload :  dataJson.data.Lec_Name ,Message : dataJson.data.Message,Embed_Code :dataJson.data.Embed_Code ,Video_Name: dataJson.data.Video_Name , Date_Upload: dataJson.data.Date_Upload , Description : dataJson.data.Description , path_file_pic_icon : dataJson.data.path_file_pic_icon },
                  ]
                }, function (error, response){
                    console.log(error);
                });
                client.search({
                    index: 'log_follow',
                    type : dataJson.data.type_for_followers,
                    body: {
                      size : "100",
                      query: {
                        match_all : {}
                      }
                    }
                })
                .then(function (response) {
                    var hits = response.hits.hits;
                    for (var i=0 ;i <hits.length ; i++){
                      var mailOptions = {
                          from: 'webinformationstudents',
                          to: hits[i]["_source"]["Std_Email"] ,
                          subject: 'มีการอัพเดทข้อมูลของวิชา ' + dataJson.data.Subject_Name_Default + '(' + dataJson.data.Subject_Term + ')',
                          text: 'ถึง คุณ ' + hits[i]["_source"]["Std_FName"] +' ' + hits[i]["_source"]["Std_LName"] + '\n'
                          + 'รายวิชา ' + dataJson.data.Subject_Name_Default + '(' + dataJson.data.Subject_Term + ') ' +'ได้มีการอัพเดทข้อมูลในหัวข้อ' + '\n'
                          + 'อัพเดทข่าวสาร ' + 'โดย อาจารย์' + dataJson.data.Lec_Name
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

              }
              res.ok();
            },
            get_files_news: function (req,res){
              var dataJson = req.allParams();
              var hits;
              client.search({
                  index: dataJson.header.index,
                  type : dataJson.header.type,
                  body: {
                    size : "100",
                    query: {
                      bool : {
                        must : [
                          {match_phrase: {
                            Subject_Term : dataJson.data.Subject_Term
                          }},
                          {match_phrase : {
                            Subject_Name : dataJson.data.Subject_Name
                          }},
                          {match_phrase :{
                            Lec_Name_Upload : dataJson.data.Lec_Name_Upload
                          }}
                        ]
                      }

                    }
                  }
              })
              .then(function (response) {
                  hits = response.hits.hits;
                  res.send(hits);
              })

            },

            delete_files_news : function (req,res){

              var dataJson = req.allParams();


                    client.delete({
                            index: dataJson.header.index,
                            type: dataJson.header.type,
                            id: dataJson.header.id
                    },
                    function (error, response) {
                      client.delete({
                              index: 'upload_log',
                              type: 'news',
                              id: dataJson.header.id
                      },
                      function (error, response) {
                      });
                      return res.ok();
                    });
            },


            get_files_score: function (req,res){
              var dataJson = req.allParams();
              var hits;
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
                  res.send(hits);
              })
            },

            get_lecturer_name_of_subject: function (req,res){
              var dataJson = req.allParams();
              var hits;
              client.search({
                  index: 'subject',
                  type : dataJson.subject_year,
                  body: {
                    size : "100",
                    query: {
                      bool : {
                        must : [
                          {match_phrase : {Subject_Name : dataJson.subject_name}},
                          {match_phrase : {Term : dataJson.subject_term}}
                        ]
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
