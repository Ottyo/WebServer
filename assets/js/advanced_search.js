'use strict';

var angularApp = angular.module('ui.bootstrap.scalpel',
    [
        'ngMaterial',
        'ngAnimate',
        'ngMessages',
        'ngSanitize',
        'ui.bootstrap',
        'colorpicker.module']);

angularApp.controller('AdvancedFeatureCtrl', function ($scope) {
    $scope.isCollapsed = true;
    $scope.colors = [];
    $scope.option = 0;

    $scope.colorUp = function(index) {
        if (index <= 0 || index >= $scope.colors.length)
            return;
        var temp = $scope.colors[index];
        $scope.colors[index] = $scope.colors[index - 1];
        $scope.colors[index - 1] = temp;
    };

    $scope.colorDown = function(index) {
        if (index < 0 || index >= ($scope.colors.length - 1))
            return;
        var temp = $scope.colors[index];
        $scope.colors[index] = $scope.colors[index + 1];
        $scope.colors[index + 1] = temp;
    };

    $scope.colorRemove = function(index) {
        $scope.colors.splice(index, 1);
    };

     $scope.$on('colorpicker-closed', function(event, color){
        switch (color.name) {
            case "newColor": if (color.value) $scope.colors.push(color.value); break;;
        }
        $scope.$apply();
    });


    window.MY_SCOPE = $scope;
});

angular.module('ui.bootstrap.scalpel').controller('HumanSpecification', function Ctrl($scope, $mdDialog) {

     $scope.customFullscreen = false;

      $scope.showAdvanced = function(ev) {
            $mdDialog.show({
              controller: DialogController,
              templateUrl: 'HumanSpecificationDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
              $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
          };

      function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      }
      window.MY_SCOPE = $scope;

});