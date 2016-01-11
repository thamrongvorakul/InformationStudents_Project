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

            User.findOne({
            email: data.data.email_id
            }, function foundUser(err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.notFound();

            // Compare password attempt from the form params to the encrypted password
            // from the database (`user.password`)
            require('machinepack-passwords').checkPassword({
              passwordAttempt: data.data.password,
              encryptedPassword: user.encryptedPassword
            }).exec({

              error: function (err){
                return response.negotiate(err);
              },

              // If the password from the form params doesn't checkout w/ the encrypted
              // password from the database...
              incorrect: function (){
                return response.notFound();
              },

              success: function (){

                // Store user id in the user session
                request.session.me = user.id;
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
                })

                // All done- let the client know that everything worked.
                return response.ok();
              }
            });
          });
        }




};
