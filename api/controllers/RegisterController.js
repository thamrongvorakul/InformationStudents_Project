'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: 'localhost:9200',
          log : 'trace'
      });

module.exports = {


          bulkinsert: function (req, res) {
              var dataJson = req.allParams();


              client.bulk({
                body : [
                    { index:  { _index: dataJson.header.index , _type:dataJson.header.type , _id: dataJson.data.FName + '::' + dataJson.data.LName} },
                    { ID_NO: dataJson.data.ID_NO , FName :dataJson.data.FName , LName :  dataJson.data.LName ,email_id :dataJson.data.email_id ,password: dataJson.data.password , status_login: dataJson.data.status_login}
                ]
              }, function (error, response){
                  console.log(error);
              });

              return res.send('Success');
          },
          bulkupdate: function (req, res) {
              client.bulk({
                body :[
                    { update: { _index: dataJson.header.index , _type:dataJson.header.type , _id:  dataJson.data.FName + '::' + dataJson.data.LName} },
                    { doc: {ID_NO: dataJson.data.ID_NO , FName :dataJson.data.FName , LName :  dataJson.data.LName ,email_id :dataJson.data.email_id ,password: dataJson.data.password , status_login: dataJson.data.status_login } },
                ]
              }, function (error, response){
                  console.log(error);
              });
          },
          search_data: function(req,res){
                client.search({
                      index: 'index',
                      body: {
                        query: {
                          match: {
                            title: 'test'
                          }
                        },
                        facets: {
                          tags: {
                            terms: {
                              field: 'tags'
                            }
                          }
                        }
                      }
                    }, function (error, response) {
                      // ...
                });
          }


};
