'use strict';

var    elasticsearch = require('elasticsearch');
var    deleteByQuery = require('elasticsearch-deletebyquery');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200',
          plugins: [ deleteByQuery ] });



var pathforCreateDir = 'D:\\InformationStudents\\assets\\FileUpload\\';
var pathfortmp = 'D:\\InformationStudents\\.tmp\\public\\FileUpload\\';
module.exports = {

  insert_data_to_db_teacher: function  (req, res) {
    var dataJson = req.allParams();

    client.bulk({
      body : [
          { index:  { _index: dataJson.header.index , _type:dataJson.header.Year } },
          { Subject_Id : dataJson.data.Subject_Id , Subject_Name : dataJson.data.Subject_Name , Term : dataJson.data.Term, Year : dataJson.header.Year , Lec_Name : dataJson.data.Lec_Name, Created_By : dataJson.data.Created_By , Description : dataJson.data.Description,Date_Upload : dataJson.data.Date_Upload , View_Count : dataJson.data.View_Count , Score_Count : dataJson.data.Score_Count}
      ]
    }, function (error, response){
        if (error !== 'undefined'){
          console.log(error);
        }
    });

    var exec = require('child_process').exec,child;
    var str_lec_name_split = dataJson.data.Lec_Name.split(" ");
    var str_sub_split = dataJson.data.Subject_Name.split(" ");
    var str_name = '';
    var str_sub = '';
    for (var i =0;i<str_lec_name_split.length; i++){str_name = str_name + str_lec_name_split[i]};
    for (var i =0;i<str_sub_split.length; i++){str_sub = str_sub + str_sub_split[i]};

          child = exec('mkdir '+pathforCreateDir+str_name+'\\'+str_sub+'\\'+dataJson.data.Term+'.'+dataJson.header.Year+'\\homework',
          function (error, stdout, stderr)
          {
          });
          child = exec('mkdir '+pathfortmp+str_name+'\\'+str_sub+'\\'+dataJson.data.Term+'.'+dataJson.header.Year+'\\homework',
          function (error, stdout, stderr)
          {
          });
          child = exec('mkdir '+pathforCreateDir+str_name+'\\'+str_sub+'\\'+dataJson.data.Term+'.'+dataJson.header.Year+'\\documents',
          function (error, stdout, stderr)
          {
          });
          child = exec('mkdir '+pathfortmp+str_name+'\\'+str_sub+'\\'+dataJson.data.Term+'.'+dataJson.header.Year+'\\documents',
          function (error, stdout, stderr)
          {
          });
          child = exec('mkdir '+pathforCreateDir+str_name+'\\'+str_sub+'\\'+dataJson.data.Term+'.'+dataJson.header.Year+'\\news',
          function (error, stdout, stderr)
          {
          });
          child = exec('mkdir '+pathfortmp+str_name+'\\'+str_sub+'\\'+dataJson.data.Term+'.'+dataJson.header.Year+'\\news',
          function (error, stdout, stderr)
          {
          });
          child = exec('mkdir '+pathforCreateDir+str_name+'\\'+str_sub+'\\'+dataJson.data.Term+'.'+dataJson.header.Year+'\\score',
          function (error, stdout, stderr)
          {
          });
          child = exec('mkdir '+pathfortmp+str_name+'\\'+str_sub+'\\'+dataJson.data.Term+'.'+dataJson.header.Year+'\\score',
          function (error, stdout, stderr)
          {
          });
          child = exec('mkdir '+pathforCreateDir+str_name+'\\'+str_sub+'\\'+dataJson.data.Term+'.'+dataJson.header.Year+'\\send_homework',
          function (error, stdout, stderr)
          {
          });
          child = exec('mkdir '+pathfortmp+str_name+'\\'+str_sub+'\\'+dataJson.data.Term+'.'+dataJson.header.Year+'\\send_homework',
          function (error, stdout, stderr)
          {
          });
    return res.ok();
  },

    get_data_on_elasticsearch : function (req,res){
      var dataJson = req.allParams();
      client.search({
            index: 'subject',
            body: {
              size : "100",
              query: {
                match_phrase: {
                  Lec_Name: dataJson.Lec_Name
                }
              }
            }
          })
          .then(function (response) {
              var hits = response.hits.hits;
              res.send(hits);
          })
    },

    delete_subject_on_elasticsearch : function (req,res){
      var dataJson = req.allParams();
      var str_lec_name_split = dataJson.data.Lec_Name.split(" ");
      var str_sub_split = dataJson.data.Subject_Name.split(" ");
      var str_name = '';
      var str_sub = '';
      for (var i =0;i<str_lec_name_split.length; i++){str_name = str_name + str_lec_name_split[i]};
      for (var i =0;i<str_sub_split.length; i++){str_sub = str_sub + str_sub_split[i]};
            client.delete({
                    index: 'subject',
                    type: dataJson.header.type,
                    id: dataJson.header.id
            },
            function (error, response) {
              var exec = require('child_process').exec,child;
              child = exec('rmdir '+pathforCreateDir+dataJson.data.Lec_Name+'\\'+str_sub+'\\'+dataJson.data.Term+'.'+dataJson.header.type+' /s /q',
              function (error, stdout, stderr)
              {
              });
              child = exec('rmdir '+pathfortmp+dataJson.data.Lec_Name+'\\'+str_sub+'\\'+dataJson.data.Term+'.'+dataJson.header.type+' /s /q',
              function (error, stdout, stderr)
              {
              });
              return res.ok();
            });
    } ,

    get_subject_all : function (req,res){
      client.search({
            index: 'subject',
            body: {
              size : "200",
              query: {
                match_all: {
                }
              }
            }
          })
          .then(function (response) {
              var hits = response.hits.hits;
              res.send(hits);
          })
    },

    insert_type_for_log_follow : function (req,res){
      var data = req.allParams();
      client.bulk({
        body :[
            { index : { _index: 'log_follow' , _type: data.Subject_Name + data.Subject_Term + '_' +data.Subject_Year } },
            { },
        ]
      }, function (error, response){
          console.log(error);
      });
      client.bulk({
        body :[
            { index : { _index: 'log_score' , _type: data.Subject_Name + data.Subject_Term + '_' +data.Subject_Year } },
            { },
        ]
      }, function (error, response){
          console.log(error);
      });
      res.ok();
    },

    delete_value_in_upload_log : function (req,res){
      var data = req.allParams();
      client.deleteByQuery({
              index: 'upload_log',
              body : {
                query : {
                  bool : {
                    must : [
                      {match_phrase : {Subject_Name : data.data.Subject_Name}},
                      {match_phrase : {Term : data.data.Term}},
                      {match_phrase : {Year : data.header.type}}
                    ]
                  }
                }
              }
      },
      function (error, response) {
      });
      client.deleteByQuery({
              index: 'upload_log',
              body : {
                query : {
                  bool : {
                    must : [
                      {match_phrase : {Subject_Name : data.data.Subject_Name}},
                      {match_phrase : {Subject_Term : data.data.Term}},
                      {match_phrase : {Subject_Year : data.header.type}}
                    ]
                  }
                }
              }
      },
      function (error, response) {
      });
      client.deleteByQuery({
              index: 'upload_log',
              body : {
                query : {
                  bool : {
                    must : [
                      {match_phrase : {Subject_Name : data.data.Subject_Name}},
                      {match_phrase : {Subject_Term : data.data.Term}},
                      {match_phrase : {Subject_Year : data.header.type}}
                    ]
                  }
                }
              }
      },
      function (error, response) {
      });
      client.deleteByQuery({
              index: 'log_score',
              body : {
                query : {
                  bool : {
                    must : [
                      {match_phrase : {Subject_Name : data.data.Subject_Name}},
                      {match_phrase : {Subject_Term : data.data.Term}},
                      {match_phrase : {Subject_Year : data.header.type}}
                    ]
                  }
                }
              }
      },
      function (error, response) {
      });
      client.deleteByQuery({
              index: 'log_follow',
              body : {
                query : {
                  bool : {
                    must : [
                      {match_phrase : {Subject_Name : data.data.Subject_Name}},
                      {match_phrase : {Subject_Term : data.data.Term}},
                      {match_phrase : {Subject_Year : data.header.type}}
                    ]
                  }
                }
              }
      },
      function (error, response) {
      });
      client.deleteByQuery({
              index: 'send_homework',
              body : {
                query : {
                  bool : {
                    must : [
                      {match_phrase : {Subject_Name : data.data.Subject_Name}},
                      {match_phrase : {Term : data.data.Term}},
                      {match_phrase : {Year : data.header.type}}
                    ]
                  }
                }
              }
      },
      function (error, response) {
      });
      return res.ok();
    }



};
