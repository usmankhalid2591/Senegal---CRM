//'oc.lazyLoad', 'ckeditor', "googlechart",
var app = angular.module('crmApp', ['ngSanitize' ,'ckeditor', "googlechart","dndLists","ngValidate"],
    function ($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    });

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode({enabled: true, requireBase: false, rewriteLinks: false});
}]);


/* Filter*/

app.filter('capitalize', function () {
    return function (input, scope) {
        if (input != null)
            input = input.toLowerCase();
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    }
});

app.filter("ucwords", function () {
    return function (input) {
        if (input) { //when input is defined the apply filter
            input = input.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
            });
        }
        return input;
    }
})

app.filter("nl2br", function ($filter) {
    return function (data) {
        if (!data) return data;
        return data.replace(/\n\r?/g, '<br />');
    };
});

/* Directives*/

app.directive("colorPicker", function () {
    return {
        require: "ngModel",
        template: '<div class="color-wrapper">' +
            '<input type="text" name="custom_color" placeholder="" ng-model="newItem.color" id="pickcolor" class="call-picker" disabled>' +
            '<div class="color-holder call-picker" ng-style="{\'background-color\':newItem.color}" ng-click="fun()"></div>' +
            '<div class="color-picker" id="color-picker" style="display: none"></div>' +
            '</div>' +
            "<script>" +
            "var colorList = ['000000', '993300', '333300', '003300', '003366', '000066', '333399', '333333'," +
            "'CCCCCC', 'FF99CC', 'FFCC99', 'FFFF99', 'CCffCC', 'CCFFff', '99CCFF', 'CC99FF'," +
            "];" +
            "var picker = $('.color-picker');" +

            "for (var i = 0; i < colorList.length; i++) {" +
            "    picker.append('<li class=\"color-item\" data-hex=\"' + '#' + colorList[i] + '\" style=\"background-color:' + '#' + colorList[i] + ';\"></li>');" +
            "}" +
            "$('body').click(function () {" +
            "picker.fadeOut();" +
            " });" +
            "</script>"
        ,
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return;

            scope.fun = function () {
                event.stopPropagation();
                picker.fadeIn();
                picker.children('li').hover(function () {
                    var codeHex = $(this).data('hex');

                    $('.color-holder').css('background-color', codeHex);
                    ngModel.$setViewValue(codeHex);
                });
            }
            ngModel.$render = function () {
                scope.value = ngModel.$modelValue;
            };
        }
    };
});
/**/

app.controller('TabsController', function ($scope, $sce, $window, $http, $compile, $q, $parse, $timeout, API_URL, $location, CommonFactory,) {

    $scope.showTab = function ($event, url) {
        Pace.restart();
        $scope.process_loader = 1;

        $event.preventDefault();
        $window.history.pushState(null, 'any', url);
        CommonFactory.getService('', url).then(function (data) {
            // $scope.tabHtml = $sce.trustAsHtml(data.html);

            $("#subPage").html(data.html);
            $compile($("#subPage"))($scope);

            $scope.process_loader = 0;
        });
    }

    $scope.showssss = function (text) {
        return $sce.trustAsHtml(text);
    }

});

