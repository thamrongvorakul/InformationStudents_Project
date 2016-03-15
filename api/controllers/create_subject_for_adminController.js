'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200',
          log : 'trace'
      });


module.exports = {

    insert_subject_to_elasticsearch : function(req,res){
      var data = req.allParams();
      client.bulk({
        body :[
            { index : { _index: 'subject_all' , _type: 'data'  } },
            { Subject_Id : data.Subject_Id , Subject_Name : data.Subject_Name},
        ]
      }, function (error, response){
          console.log(error);
      });
      return res.ok();
    },

    search_data_subject_all : function (req,res){
      var data = req.allParams();
      client.search({
        index : 'subject_all',
        type : 'data',
        body : {
          size : 100 ,
          query : {
            match_all : {}
          }
        }
      })
      .then(function (response) {
          var hits = response.hits.hits;
          return res.send(hits);
      });

    },
    search_data_for_subject_id_select : function(req,res){
      var data = req.allParams();
      client.search({
        index : 'subject_all',
        type : 'data',
        body : {
          query : {
            match_phrase : {
              Subject_Id : data.Subject_Id
            }
          }
        }
      })
      .then(function (response) {
          var hits = response.hits.hits;
          return res.send(hits);
      });
    },

    delete_data_in_subject_all : function(req,res){
      var data = req.allParams();
      client.delete({
              index: 'subject_all',
              type: 'data',
              id: data.id
      },
      function (error, response) {
      });
      return res.ok();
    }



};
