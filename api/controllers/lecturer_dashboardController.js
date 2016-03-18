'use strict';
var    elasticsearch = require('elasticsearch');
var    client = new elasticsearch.Client({
          host: '161.246.60.104:9200'

      });


module.exports = {


        search_data_lecturer_for_dashboard :function(req,res){
          var data = req.allParams();
          client.search({
              index: 'teacher',
              type : 'data',
              body : {
                query : {
                  match_phrase : {
                    Name : data.Lec_Name_id
                  }
                }
              }
          })
          .then(function (response) {
              var hits = response.hits.hits;
              return res.send(hits);
        });
      } ,
      update_status_room_lecturer : function(req,res){
        var data = req.allParams();
        client.bulk({
          body :[
              { update: { _index: 'teacher' , _type:'data', _id: data.Lec_Id } },
              { doc: {Status_Room : data.Status_Room } },
          ]
        }, function (error, response){
            console.log(error);
        });
        res.ok();
      },

      search_data_homework_send : function(req,res){
        var data = req.allParams();
        client.search({
          index : 'send_homework',
          type : 'send_homework',
          body : {
            size : 1000,
            query :{
              bool : {
                must : [
                  {match_phrase : {Lec_Name_Upload : data.Lec_Name_Default}},
                  {match_phrase : {Term : data.term}},
                  {match_phrase : {Year : data.year}},
                  {match_phrase : {Subject_Name : data.subject_name}},
                  {match_phrase : {Times_Homework_Select : data.Times_Homework_Select}}
                ]
              }
            }
          }
        }).then(function(response){
            var hits = response.hits.hits;
            res.send(hits);
        });
      },

      remove_mailbox_from_lecturer_dashboard : function (req,res){
        var data = req.allParams();
        client.delete({
                index: 'mailbox',
                type: 'send',
                id: data.header.id
        },function(){});
        return res.ok();
      },

      remove_file_homework_send : function(req,res){
        var data = req.allParams();
        client.delete({
                index: 'send_homework',
                type: 'send_homework',
                id: data.id
        },function(){});
        return res.ok();
      },
      update_data_add_score_for_homework_send: function(req,res){
        var data  = req.allParams();
        client.bulk({
          body :[
              { update: { _index: 'send_homework' , _type:'send_homework', _id: data.id } },
              { doc: {Score : parseInt(data.Score) , Status_Score_Add : parseInt(data.Status_Score_Add) } },
          ]
        }, function (error, response){
            console.log(error);
        });
        res.ok();
      } ,
      remove_field_score : function(req,res){
        var data = req.allParams();
        var id_arr_parse = JSON.parse(data.id_arr);
        for (var i =0 ;i<id_arr_parse.length ; i++){
          if (id_arr_parse[i].status_remove === 'active'){
            client.bulk({
              body :[
                  { update: { _index: 'send_homework' , _type:'send_homework', _id: id_arr_parse[i].id } },
                  { doc: {Status_Remove : 'removed' } },
              ]
            }, function (error, response){
                console.log(error);
            });
            client.update({
                index: 'send_homework',
                type: 'send_homework',
                id: id_arr_parse[i].id,
                body: {
                  script: 'ctx._source.remove(\"Score"\)'
                }
            }, function (error, response) {
            });
          }


        }
        res.ok();
      }


};
