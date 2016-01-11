'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: 'localhost:9200',
          log : 'trace'
      });

module.exports = {


          bulkinsert: function (req, res) {
              var dataJson = req.allParams();



            var Passwords = require('machinepack-passwords');

            // Encrypt a string using the BCrypt algorithm.
            Passwords.encryptPassword({
              password: dataJson.data.password,
              difficulty: 10,
            }).exec({
              // An unexpected error occurred.
              error: function(err) {
                return res.negotiate(err);
              },
              // OK.
              success: function(encryptedPassword) {
                require('machinepack-gravatar').getImageUrl({
                  emailAddress: dataJson.data.email_id
                }).exec({
                  error: function(err) {
                    return res.negotiate(err);
                  },
                  success: function(gravatarUrl) {
                  // Create a User with the params sent from
                  // the sign-up form --> signup.ejs
                    User.create({
                      ID_NO: dataJson.data.ID_NO,
                      FName: dataJson.data.FName,
                      LName: dataJson.data.LName,

                      email: dataJson.data.email_id,
                      encryptedPassword: encryptedPassword,
                      lastLoggedIn: new Date(),
                      gravatarUrl: gravatarUrl
                    }, function userCreated(err, newUser) {
                      if (err) {

                        console.log("err: ", err);
                        console.log("err.invalidAttributes: ", err.invalidAttributes)
                        return res.negotiate(err);
                      }

                      client.bulk({
                        body : [
                            { index:  { _index: dataJson.header.index , _type:dataJson.header.type , _id: dataJson.data.FName + '::' + dataJson.data.LName} },
                            { ID_NO: dataJson.data.ID_NO , FName :dataJson.data.FName , LName :  dataJson.data.LName ,email_id :dataJson.data.email_id ,password: dataJson.data.password , status_login: dataJson.data.status_login}
                        ]
                      }, function (error, response){
                          console.log(error);
                      });
                      // Log user in
                      req.session.me = newUser.id;

                      // Send back the id of the new user
                      return res.json({
                        id: newUser.id
                      });
                    });
                  }
                });
              }
            });





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
