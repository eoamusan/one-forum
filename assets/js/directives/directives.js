app.directive('clickAnywhereButHere', function($document, clickAnywhereButHereService) {
    return {
        restrict: 'A',
        link: function(scope, elem, attr, ctrl) {
            var handler = function(e) {
                e.stopPropagation();
            };
            elem.on('click', handler);

            scope.$on('$destroy', function() {
                elem.off('click', handler);
            });

            clickAnywhereButHereService(scope, attr.clickAnywhereButHere);
        }
    };
});

app.directive('customOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeHandler);
        }
    }
});