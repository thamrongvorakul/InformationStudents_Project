'use strict';


var app = angular.module('students_sub', []);
app.controller('students_subController', ['$scope','$window', '$http', function($scope, $window, $http)
{


    $scope.homework_click = function (){
      location.href = 'students_sub_hw';
    };

    $scope.document_click = function (){
      location.href = 'students_sub_doc';

    };

    $scope.news_click = function (){
      location.href = 'students_sub_news';
    };

    $scope.score_click = function (){
      location.href = 'students_sub_score';
    };

}]);

app.controller('nestableController' , function($scope){

    $scope.remove = function(scope) {
        scope.remove();
    };
    $scope.toggle = function(scope) {
        scope.toggle();
    };
    $scope.moveLastToTheBeginning = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0,0, a);
    };
    $scope.newSubItem = function(scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            nodes: []
        });
    };
    $scope.collapseAll = function() {
        $scope.$broadcast('collapseAll');
    };
    $scope.expandAll = function() {
        $scope.$broadcast('expandAll');
    };
    $scope.data = [{
        "id": 1,
        "title": "node1",
        "nodes": [
            {
                "id": 11,
                "title": "node1.1",
                "nodes": [
                    {
                        "id": 111,
                        "title": "node1.1.1",
                        "nodes": []
                    }
                ]
            },
            {
                "id": 12,
                "title": "node1.2",
                "nodes": []
            }
        ]
    }, {
        "id": 2,
        "title": "node2",
        "nodes": [
            {
                "id": 21,
                "title": "node2.1",
                "nodes": []
            },
            {
                "id": 22,
                "title": "node2.2",
                "nodes": []
            }
        ]
    }, {
        "id": 3,
        "title": "node3",
        "nodes": [
            {
                "id": 31,
                "title": "node3.1",
                "nodes": []
            }
        ]
    }];

});
