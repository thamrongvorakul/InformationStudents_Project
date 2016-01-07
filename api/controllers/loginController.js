'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: 'localhost:9200',
          log : 'trace'
      });


module.exports = {

          search_data: function(request,response){
            var data = request.allParams();
            var hits = '';

            client.search({
                index: data.header.index,
                body: {
                  query: {
                    match_phrase: {
                      email_id: data.data.email_id
                    }
                  }
                }
            })
            .then(function (res) {
                hits = res.hits.hits;
                return response.send(hits);
            })
              //console.log(hits[0]['_index']);

          }


};
