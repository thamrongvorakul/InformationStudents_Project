'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: 'localhost:9200',
          log : 'trace'
      });
      var path = require('path');
      var fs = require('fs');
      var folderuploadname;
      var fileuploadname;
      var feedname;
      var cmdscript =' ';
      var scripter;
      var typefile;
      var pathUpWri = 'C:/nuget-automated/assets/nugetpackages/';
      var pathforChoco = 'C:\\nuget-automated\\assets\\nugetpackages\\';
      var pathforCreateDir = 'C:\\nuget-automated\\assets\\nugetpackages\\';
      var path_hw = 'D:/InformationStudents/assets/FileUpload/Lec.A/Algorithm/homework';



module.exports = {


  upload: function  (req, res)
    {
        var data = req.allParams();

        console.log('in upload function');
        req.file('file').upload({
          dirname : path_hw,
          saveAs: function(__newFile, cb) {
             cb(null, __newFile.filename);
           },
        },
        function (err, files)
          {

              console.log('file upload success.');

              fileuploadname = path.basename(files[0].fd.split('/').reverse()[0]);
              console.log(fileuploadname);
              typefile = fileuploadname.split('.').pop();
              console.log(typefile);
              if (err)
              {
                  return res.negotiate(err);
                  return res.serverError(err);
              }
          });
    console.log(fileuploadname);
    return res.send('Response OK');
  },

  /*upload: function  (req, res)
    {
        var data = req.allParams();

        console.log('in upload function');
        req.file('file').upload({dirname : path_hw},function (err, files)
          {

              console.log('file upload success.');

              fileuploadname = path.basename(files[0].fd.split('/').reverse()[0]);
              console.log(fileuploadname);
              typefile = fileuploadname.split('.').pop();
              console.log(typefile);
              if (err)
              {
                  return res.negotiate(err);
                  return res.serverError(err);
              }
          });
    console.log(fileuploadname);
    return res.send('Response OK');
  },*/

  bulkinsert: function (req, res) {
      var dataJson = req.allParams();

      console.log(fileuploadname);
      client.bulk({
        body : [
            { index:  { _index: dataJson.header.index , _type:dataJson.header.type , _id: fileuploadname} },
            { Type_Folder : "homework" ,Lec_Name : "Lec.A" , Subject_Name : "Algorithm" , File_Name : fileuploadname , Description : dataJson.data.detail , Homework_Date : dataJson.data.homework_date , Date_Log : dataJson.data.date_log}
        ]
      }, function (error, response){
          console.log(error);
      });

      return res.send('Success');
  },

  get_files: function (req,res){
    var files = fs.readdirSync('D:/InformationStudents/assets/FileUpload/Lec.A/Algorithm/homework/');
    console.log(files[0]);
    return res.send(files);
  }


};
