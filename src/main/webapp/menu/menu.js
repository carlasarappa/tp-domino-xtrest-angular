app.controller('MenuCtrl', function($resource, $timeout, $scope, Promos) {
    'use strict';

    $scope.promos = [];

    function errorHandler(error) {
        console.log(error.data);
    }

    $scope.actualizarLista = function() {
        Promos.query()
            .then(function(data) {
                console.log(data);
                $scope.promos = data;
            })
            .catch(errorHandler);
    };

    $scope.actualizarLista();

})
    .directive('promos', function() {
        return {
            template: '<div class="list-group">\n' +
            '  <a href="/tamanio.html" class="list-group-item ">\n' +
            '    <h4 class="list-group-item-heading">{{promo.nombre}}</h4>\n' +
            '    <p class="list-group-item-text">{{promo.ingredientesAsString()}}</p> <span class="badge">{{promo.precio}}</span><button type="button" class="btn btn-default btn-lg">\n' +
            '  <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n' +
            '</button>\n' +
            '  </a>\n' +
            '</div>'
        }
    })
;
