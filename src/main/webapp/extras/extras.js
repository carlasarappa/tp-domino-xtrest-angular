app.controller('ExtrasCtrl', function($resource, $timeout, $scope, $state, Extras) {
    'use strict';

    $scope.extras = [];
    $scope.distribuciones = ["Mitad izquierda", "Toda la pizza", "Mitad derecha"];
    $scope.$parent.extrasSeleccionados = [];


    function errorHandler(error) {
        console.log(error.data);
    }

    $scope.actualizarLista = function() {
        Extras.query()
            .then(function(data) {
                console.log(data);
                $scope.extras = data;
            })
            .catch(errorHandler);
    };

    $scope.actualizarLista();

    $scope.selectExtra = function(extra){
        $scope.$parent.extrasSeleccionados.push(new IngredienteDistribuido(extra, true));
        console.log($scope.$parent.extrasSeleccionados);
    };

    $scope.quitarExtra = function (extra) {
        var index = $scope.$parent.extrasSeleccionados.indexOf(extra);
        $scope.$parent.extrasSeleccionados.splice(index, 1);
        console.log($scope.$parent.extrasSeleccionados);
    };

    $scope.continuar = function(){
        $state.go('pedido');
    };

    var sumarExtras = function(){
        return $scope.$parent.extrasSeleccionados.map(function (extra) {
            return extra.ingrediente.precio
        }).reduce(function (a, b) {
            return a+b;
        }, 0)
    };

    $scope.subtotal = function () {
        return ($scope.$parent.promoSeleccionada.precio * $scope.$parent.tamanioSeleccionado.factor)
            + sumarExtras();
    };

})
    .directive('ingredientes', function() {
        return {
            templateUrl: 'extras/ingredientes.html'

        }
    })
    .directive('extras', function() {
        return {
            template: '<div><a href="#" ng-click="selectExtra(extra)"><p><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> {{extra.nombre}} <span class="badge">{{extra.precio}}</span></p></a></div>'
        }
    })
    .directive('distribucion', function ($compile) {
        return function ($scope, element, attrs) {
                var html =  '<span><input type="radio" name="distribuciones" ng-model="ingrediente.distribucion"\n' +
                    '                         value="'+ attrs.nombre +'"\n' +
                    '                         ng-disabled="!ingrediente.isExtra && ingrediente.distribucion != \'' +
                    attrs.nombre +
                    '\'"\n' +
                    '                         ng-checked="ingrediente.distribucion == \''+ attrs.nombre +'\'">\n' +
                    '                '+ attrs.nombre +'\n' +
                    '            </span>';
                element.replaceWith($compile(html)($scope));
        }
    })
;
