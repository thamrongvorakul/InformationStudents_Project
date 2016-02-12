
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: 'localhost:9200',
          log : 'trace'
      });

var count = "" ;
var count_name = "";
var arr = [];
module.exports = {

          search_data: function(request,response){
            var data = request.allParams();
            var hits = '';

            User.findOne({
            email: data.data.email_id
            }, function foundUser(err, user) {
            if (err) return response.negotiate(err);
            if (!user) return response.notFound();

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

                console.log(user.id);

                // All done- let the client know that everything worked.
                return response.ok();
              }
            });
            // Compare password attempt from the form params to the encrypted password
            // from the database (`user.password`)

          });
        },

        test_login : function (req,res)
        {
          var dataJson = req.allParams();
          console.log('YEAH');
          if (count === "")
          {
            count = dataJson.data.email_id
            console.log('this count is blank');
            return res.ok();
          }
          else {

             res.send(count);
             console.log(count);
             count = "";
          }


        },

        test_login2 : function (req,res)
        {
          console.log(count_name);

          var dataJson = req.allParams();
          console.log(count_name);
          if (count_name === "")
          {
            count_name = dataJson.name;
            console.log('this count is blank');
            res.send(count_name);

          }
          else {

             console.log(count_name);

               if (count_name !== count_name)
               {
                 count_name = "";
               }
               else {
                 res.send(count_name);

               }
          }
        },

        reset_count_name : function (req,res){
          var dataJson = req.allParams();
          count_name = dataJson.name;
        }




};
