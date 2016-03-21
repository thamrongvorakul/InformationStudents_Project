'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200'
      });

module.exports = {


          register_for_teacher_by_admin: function (req, res) {
            var dataJson = req.allParams();
            var Passwords = require('machinepack-passwords');
            Passwords.encryptPassword({
              password: dataJson.password,
              difficulty: 10,
            }).exec({
              error: function(err) {
                return res.negotiate(err);
              },
              success: function(encryptedPassword) {
                require('machinepack-gravatar').getImageUrl({
                  emailAddress: dataJson.email_id
                }).exec({
                  error: function(err) {
                    return res.negotiate(err);
                  },
                  success: function(gravatarUrl) {
                    Lecturer.create({
                      Title : dataJson.Title,
                      Type_User : dataJson.Type_User,
                      FName: dataJson.FName,
                      LName: dataJson.LName,
                      email: dataJson.email_id,
                      password : dataJson.password,
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
                            { index:  { _index: 'teacher' , _type:'login', _id: dataJson.FName + '::' + dataJson.LName} },
                            { Title: dataJson.Title , FName :dataJson.FName , LName :  dataJson.LName ,email_id :dataJson.email_id ,password: dataJson.password,encryptedPassword:encryptedPassword}
                        ]
                      }, function (error, response){
                          console.log(error);
                      });

                      req.session.me = newUser.id;
                      return res.json({
                        id: newUser.id
                      });
                    });
                  }
                });
              }
            });
          }

};
