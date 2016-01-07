'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: 'localhost:9200',
          log : 'trace'
      });


      {

      }



module.exports = {

          search_data_detailTeacher: function(request,response){
            var data = request.allParams();
            var hits = '';

            client.search({
              index: 'teacher',
              body: {
                query: {
                    bool : {
                        must : [
                            { match: { FName : "ยิ่งยง" } },
                            { match: { LName : "ยอดรักษ์" } }
                        ]
                     }
                }
              }
            })
            .then(function (res) {
                hits = res.hits.hits;
                return response.send(hits);
            })
            

          }


};
