var app = angular.module('App', []);

app.controller('PartituraController', function($scope, $http, HTTPSendService) {

   // var host = "http://localhost:8000/partitura/";
   // var alunos = [];

   $scope.dados = {
      "conteudo": "",

   }

   // $http.get(host, { headers: { 'Content-Type': 'application/json' } }).then(function(data) {
   //    for (var i = 0; i < data.data.length; i++) {
   //       alunos.push(data.data[i]);
   //    }
   //    $scope.dados.alunos = alunos;
   // }).catch(function(err) {
   //    console.log(err);
   // });


   // $scope.marcar_todos = function() {
   //    angular.forEach($scope.dados.alunos, function(item) {
   //       item.selected = !item.selected;
   //    })
   // }

   $scope.btn_gravar = function() {
      // var dados = {};
      console.log($scope.dados);

      HTTPSendService.gravar_mensagem_banco($scope.dados).then(function(res) {
         console.log(res);
      }).catch(function(err) {
         alert("Falhou ao gravar no banco");
         console.log(err);
      })
   }

})

app.factory('HTTPSendService', function($http) {

   return {
      gravar_mensagem_banco: function(dados) {
         var req = {
            method: 'POST',
            url: 'http://localhost:8000/partitura',
            headers: {
               'Content-Type': 'application/json'
            },
            data: dados
         };
         return $http(req);
      }
   }
})
