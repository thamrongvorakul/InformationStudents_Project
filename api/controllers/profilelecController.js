
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200',
      });


module.exports = {

        search_data_teacher : function (request,response){

          var dataJson = request.allParams();
          client.search({
              index: 'teacher',
              type : 'data',
              body: {
                query: {
                  match_phrase: {
                    Name: dataJson.Name
                  }
                }
              }
          })
          .then (function(res){
            var hits = res.hits.hits;
             response.send(hits);
          })

        }



};
