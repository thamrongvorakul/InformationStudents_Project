'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200',
          log : 'trace'
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


/*var education_arr = ["วท.บ. วิทยาการคอมพิวเตอร์ (ม.ศิลปากร)" ,"วท.ม. วิทยาการคอมพิวเตอร์และเทคโนโลยีสารสนเทศ (สถาบันเทคโนฯ ลาดกระบัง)"];
var research_arr = ["Object-Oriented Technology","Component-Based Technology","Software Development",
                      "ปฏิบัติการ การโปรแกรมเบื้องต้น","XML Programming","Web Programming"];
var subject_holding_arr = [  "Information Systems",  "Web Programming","Software Design","Introduce to Microcomputer"];*/
/*  var x = [];
var y = [];
var z = [];
client.bulk({
  body : [
      { index:  { _index: 'teacher' , _type:'data' , _id: dataJson.Title + dataJson.FName +"_"+ dataJson.LName} },
      {
          Name: dataJson.Title + dataJson.FName + " " +dataJson.LName ,position : " " ,education: x,research:y
        , subject_holding : z , aboutme : {room:" " , homepage : " " , email : " " , tel_no: " "}
        , path_file_pic_main: " " , path_file_pic_icon :" "
      }
  ]
}, function (error, response){
    console.log(error);
});*/
