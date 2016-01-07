'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: 'localhost:9200',
          log : 'trace'
      });
var data = '';

module.exports = {

          send_data: function(request,response){
            data = request.allParams();
            console.log(data.data.email_id);
            return response.render(data);
          }


};
