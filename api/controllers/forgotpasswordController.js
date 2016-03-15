'use strict';
var    elasticsearch = require  ('elasticsearch');
var    nodemailer    = require  ('nodemailer');

// ต่อ elasticsearch
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200',
      });

// ต่อ gmail smtp
var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: 'webinformationstudents@gmail.com',
              pass: 'informationstudents'
          }
      });


module.exports = {

          search_data_password: function(request,response){
            var data = request.allParams();
            var hits = '';

            client.search({
                index: data.header.index,
                type : data.header.type,
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
                var mailOptions = {
                    from: 'webinformationstudents',
                    to: data.data.email_id ,
                    subject: 'รหัสผ่านสำหรับเข้าใช้งานระบบของคุณ คือ',
                    text: 'ถึง คุณ ' + hits[0]._source.FName + hits[0]._source.LName + '\n'
                    + 'รหัสผ่านสำหรับเข้าใช้งานระบบของคุณคือ ' + hits[0]._source.password + '\n'
                };
                console.log(mailOptions.text);
                transporter.sendMail(mailOptions, function(error, info){

                        if(error){
                            return console.log(error);
                        }
                        console.log('Message sent: ' + info.response);

                });


                return response.send('OK!');
            })

          },








};
