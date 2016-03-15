'use strict';
var    elasticsearch = require('elasticsearch');

var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200',
          log : 'trace'

      });



module.exports = {


  put_data_score_to_excel : function (req,res){
    var data = req.allParams();

  }
};
