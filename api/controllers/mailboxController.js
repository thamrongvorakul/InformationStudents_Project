'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200',
          log : 'trace'
      });

module.exports = {


        put_mailbox_to_elasticsearch : function (req,res){
          var dataJson = req.allParams();

          client.bulk({
            body : [
                { index:  { _index: dataJson.header.index , _type:dataJson.header.type } },
                { Lec_Name: dataJson.data.Lec_Name , Std_Name :dataJson.data.Std_Name , Subject :  dataJson.data.Subject ,Message :dataJson.data.Message ,Date: dataJson.data.Date , Status: dataJson.data.Status}
            ]
          }, function (error, response){
              console.log(error);
          });
          res.ok();
        } ,

        search_mailbox_subject : function (req,res){

          var data = req.allParams();
          client.search({
              index: data.header.index,
              type : data.header.type,
              body: {
                query: {
                  match_phrase: {
                    Subject: data.data.Subject
                  }
                }
              }
          })
          .then(function (response) {
              var hits = response.hits.hits;
              return res.send(hits);
        });
      }


};
