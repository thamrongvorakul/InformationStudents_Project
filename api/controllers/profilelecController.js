
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200',
          log : 'trace'
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

        },

        search_data_teacher_to_show_contacts : function (request,response){
          client.search({
              index: 'teacher',
              type : 'data',
              body : {
                size : "20",
                query : {
                  match_all : {
                    
                  }
                }
              }
          })
          .then (function(res){
            var hits = res.hits.hits;
            console.log(hits.length);
            response.send(hits);
          })
        }







};
