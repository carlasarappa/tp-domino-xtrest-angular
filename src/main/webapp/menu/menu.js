app.controller('MenuCtrl', function($resource, $timeout, $scope, $state, Promos) {
    'use strict';

    $scope.platos = [];
    if (!$scope.$parent.pedido){
        $scope.$parent.pedido = new Pedido();
    }

    $scope.$parent.agregarNuevoPlato = function () {
        $scope.$parent.plato = new Plato();
    };

    function errorHandler(error) {
        console.log(error.data);
    }

    $scope.selectPromo = function(plato){
        $scope.$parent.plato = plato;
        $scope.$parent.pedido.cliente = $scope.$parent.cliente;
        $state.go('tamanio');
    };

    $scope.actualizarLista = function() {
        Promos.query()
            .then(function(data) {
                console.log(data);
                $scope.platos = data;
                $scope.platos.push(new Plato(new Pizza({
                    nombre:'Armá tu pizza',
                    precio: 70,
                    ingredientes: [],
                    descripcion: 'Con los ingredientes que más te gusten'
                })))
            })
            .catch(errorHandler);
    };

    $scope.actualizarLista();
    $scope.agregarNuevoPlato();

}).directive('promos', function() {
    return { templateUrl: 'menu/promoTemplate.html'  }
}).service('Promos', function($http) {
    var getData = function(response) { return response.data };
    var toPlato = function(json) { return new Plato(new Pizza(json)) };

    return {
        query: function() {
            return $http.get(HOST + "promos")
                .then(getData)
                .then(function(listaJson){
                    return listaJson.map(toPlato)
                })
        }
    }
})
;
