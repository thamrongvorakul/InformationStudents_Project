'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200',
          log : 'trace'
      });

module.exports = {


        search_data_for_latest_topic : function (req,res){
          var hits ;
          client.search({
              index: 'upload_log',
              body : {
                size : 1000,
                query : {
                  match_all : {
                  }
                }
              }
          })
          .then(function (response) {
              hits = response.hits.hits;
              return res.send(hits);
        });
      },

      search_data_for_hottest_topic : function (req,res){
        var hits ;
        client.search({
            index: 'subject',
            body : {
              size : 1000,
              query : {
                match_all : {
                }
              },
              sort: [
                {
                  View_Count: {
                    order: 'desc'
                  }
                }
              ]
            }
        })
        .then(function (response) {
            hits = response.hits.hits;
            return res.send(hits);
      });
    } ,
    search_data_by_keyword_subject : function (req,res){
      var data = req.allParams();

    },

};
