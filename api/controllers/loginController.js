
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200',
          log : 'trace'
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
        }










};
