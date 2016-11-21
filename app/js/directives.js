    angular.module('MeGuiaApp.directives', [])
    .directive("myMaterialSelect", [ "$timeout", function($timeout) {
        return {
            restrict: 'A',
            require : 'ngModel',
            link : function(scope, element, attrs, ngModelCtrl) {
                $(function() {
                    $(element).material_select();

                    $(element).change(function() {
                        var value = $(element).val();

                        if (value) {
                            var valueNum = new Number(value.substring(value.indexOf(':') + 1)) + 0;

                            ngModelCtrl.$setViewValue(valueNum);
                        }
                    });
                });
            }
        }
    }])