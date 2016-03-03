'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200',
          log : 'trace'
      });

module.exports = {

          update_view_subject: function(request,response){
            var data = request.allParams();
            var hits = '';

            client.search({
              index: 'subject',
              type : data.year,
              body: {
                query: {
                    bool : {
                        must : [
                            { match_phrase: { Term : data.term } },
                            { match_phrase: { Subject_Name : data.subject_name } }
                        ]
                     }
                }
              }
            })
            .then(function (res) {
                hits = res.hits.hits;
                client.bulk({
                  body :[
                      { update: { _index: 'subject' , _type:data.year , _id:  hits[0]["_id"]} },
                      { doc: {View_Count : parseInt(hits[0]["_source"]["View_Count"])+1 } },
                  ]
                }, function (error, response2){
                    console.log(error);
                });
                return response.send(hits);
            })
          },

          insert_data_follower : function (req,res){
            var data = req.allParams();

            client.bulk({
              body :[
                  { index : { _index: 'log_follow' , _type:data.subject_name + data.subject_term + "_" +data.subject_year} },
                  { Std_FName : data.std_FName , Std_LName : data.std_LName , Std_Email : data.std_email , Subject_Name : data.subject_name_default , Subject_Term : data.subject_term , Subject_Year : data.subject_year , Status_Follow : data.status_follow , Event_Click : data.event_click},
              ]
            }, function (error, response){
                console.log(error);
            });
            res.ok();

          },
          update_data_follower : function (req,res){
            var data = req.allParams();
            client.bulk({
              body :[
                  { update: { _index: 'log_follow' , _type:data.subject_name + data.subject_term + "_" +data.subject_year , _id: data.id } },
                  { doc: {Std_FName : data.std_FName , Std_LName : data.std_LName , Std_Email : data.std_email , Subject_Name : data.subject_name_default , Subject_Term : data.subject_term , Subject_Year : data.subject_year , Status_Follow : data.status_follow , Event_Click : data.event_click } },
              ]
            }, function (error, response){
                console.log(error);
            });
            res.ok();
          },
          search_data_for_the_followers : function (req,res){
            var data = req.allParams();
            var hits;
            console.log(data.subject_name + data.subject_term + "_" + data.subject_year);
            client.search({
              index: 'log_follow',
              type : data.subject_name + data.subject_term + "_" + data.subject_year,
              body: {
                size : 1000,
                query: {
                    match_all : {
                    }
                }
              }
            })
            .then(function (response) {
                hits = response.hits.hits;
                return res.send(hits);
            })
          },

          search_data_for_the_views : function (req,res){
            var data = req.allParams();
            var hits;

            client.search({
              index: 'subject',
              type : data.subject_year,
              body: {
                size : 1000,
                query: {
                  bool : {
                    must : [
                      {match_phrase : {Subject_Name : data.subject_name_default}},
                      {match_phrase : {Term : data.subject_term}}
                    ]
                  }

                }
              }
            })
            .then(function (response) {
                hits = response.hits.hits;
                return res.send(hits);
            })
          },

          search_indi_data_in_student_subject : function (req,res){
            var data = req.allParams();
            var hits ;
            client.search({
              index: 'log_follow',
              type : data.subject_name + data.subject_term + "_" + data.subject_year,
              body: {
                query: {
                  match_phrase : {
                    Std_Email : data.std_email
                  }
                }
              }
            })
            .then(function (response) {
                hits = response.hits.hits;
                if (hits.length === 0 ){
                  return res.send('User never use this function');
                }
                else {
                  return res.send(hits);

                }
            })
          }


};
