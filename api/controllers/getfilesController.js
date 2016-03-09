var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200',
          log : 'trace'
      });
      var path = require('path');
      var fs = require('fs');


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
                      { Type: dataJson.data.Type , Subject_Name : dataJson.data.Subject_Name_Default,Subject_Term :dataJson.data.Subject_Term , Lec_Name_Upload :  dataJson.data.Lec_Name ,Message : dataJson.data.Message,Embed_Code :dataJson.data.Embed_Code ,Video_Name: dataJson.data.Video_Name , Date_Upload: dataJson.data.Date_Upload , Description : dataJson.data.Description , path_file_pic_icon : dataJson.data.path_file_pic_icon },
                  ]
                }, function (error, response){
                    console.log(error);
                });
              }
              else if (dataJson.data.Type === 'text'){
                client.bulk({
                  body :[
                      { index : { _index: 'upload_log' , _type:dataJson.data.path } },
                      { Type: dataJson.data.Type , Subject_Name : dataJson.data.Subject_Name_Default,Subject_Term :dataJson.data.Subject_Term , Lec_Name_Upload :  dataJson.data.Lec_Name ,Message : dataJson.data.Message,Embed_Code :dataJson.data.Embed_Code ,Video_Name: dataJson.data.Video_Name , Date_Upload: dataJson.data.Date_Upload , Description : dataJson.data.Description , path_file_pic_icon : dataJson.data.path_file_pic_icon },
                  ]
                }, function (error, response){
                    console.log(error);
                });
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
