'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200',
          log : 'trace'
      });

module.exports = {


          insert_user_data: function (req, res) {
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
                    if (dataJson.data.Type_User === 'student')
                    {
                        User.create({
                          Type_User : dataJson.data.Type_User,
                          Title : dataJson.data.Title,
                          ID_NO: dataJson.data.ID_NO,
                          FName: dataJson.data.FName,
                          LName: dataJson.data.LName,
                          password : dataJson.data.password,
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
                                { Type_User : dataJson.data.Type_User,Title : dataJson.data.Title,ID_NO: dataJson.data.ID_NO , FName :dataJson.data.FName , LName :  dataJson.data.LName ,email_id :dataJson.data.email_id ,encryptedPassword:encryptedPassword,password: dataJson.data.password }
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
                      else if (dataJson.data.Type_User === 'teacher'){
                        User.create({

                          Type_User : dataJson.data.Type_User,
                          Title : dataJson.data.Title,
                          ID_NO : dataJson.data.ID_NO,
                          FName: dataJson.data.FName,
                          LName: dataJson.data.LName,
                          password : dataJson.data.password,
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
                                { Type_User : dataJson.data.Type_User , Title: dataJson.data.Title , ID_NO: dataJson.data.ID_NO ,FName :dataJson.data.FName , LName :  dataJson.data.LName ,email_id :dataJson.data.email_id ,encryptedPassword:encryptedPassword,password: dataJson.data.password }
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
