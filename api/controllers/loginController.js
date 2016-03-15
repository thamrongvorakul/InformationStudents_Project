
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200'
      });

module.exports = {

          search_data: function(request,response){
            var data = request.allParams();
            var hits = '';

            User.findOne({
            email: data.data.email_id
            },
            function foundUser(err, user) {
            if (err) return response.negotiate(err);
            if (!user) return response.notFound();

            require('machinepack-passwords').checkPassword({
              passwordAttempt: data.data.password,
              encryptedPassword: user.encryptedPassword
            }).exec({

              error: function (err){
                return response.negotiate(err);
              },
              incorrect: function (){
                return response.notFound();
              },
              success: function (){
                request.session.me = user.id;
                return response.ok();
              }
            });


          });
        } ,

        change_password : function (request,response){
            var data = request.allParams();
            var hits = '';
            var Passwords = require('machinepack-passwords');

            User.findOne({
            email: data.data.email_id
            },
            function foundUser(err, user) {
            if (err) return response.negotiate(err);
            if (!user) return response.notFound();

            require('machinepack-passwords').checkPassword({
              passwordAttempt: data.data.old_password,
              encryptedPassword: user.encryptedPassword
            }).exec({

              error: function (err){
                return response.negotiate(err);
              },
              incorrect: function (){
                return response.notFound();
              },
              success: function (){
                Passwords.encryptPassword({
                  password: data.data.new_password,
                  difficulty: 10,
                }).exec({
                  // An unexpected error occurred.
                  error: function(err) {
                    return response.negotiate(err);
                  },
                  // OK.
                  success: function(encryptedPassword) {
                    console.log(encryptedPassword);
                    User.update({email:data.data.email_id},{password:data.data.new_password} ,{encryptedPassword:encryptedPassword})
                    .exec(function afterwards(err, updated)
                    {
                      if (err) {
                        // handle error here- e.g. `res.serverError(err);`
                        return;
                      }
                    });
                    User.update({email:data.data.email_id},{encryptedPassword:encryptedPassword})
                    .exec(function afterwards(err, updated)
                    {
                      if (err) {
                        // handle error here- e.g. `res.serverError(err);`
                        return;
                      }
                    })
                    client.bulk({
                      body :[
                          { update: { _index: 'user' , _type:'login' , _id:  data.data.FName + '::' + data.data.LName} },
                          { doc: {password: data.data.password , encryptedPassword : encryptedPassword} },
                      ]
                    }, function (error, response){
                        console.log(error);
                    });
                  },
                });
                return response.ok();
              }// success
            });


            });
        }

};
