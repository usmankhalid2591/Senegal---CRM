app.controller('headerController', function ($scope, $sce, $window, $http, $compile, $q, $parse, $timeout, API_URL, $location, CommonFactory,) {

    $scope.search = "";

    $scope.globalSearch = function ($event) {
        if (event.which === 13) {

            $event.preventDefault();
            Pace.restart();
            $scope.process_loader = 1;
            var url = $("#search").attr("route");
            $(".global_search").addClass("open");

            var params = {
                s: $scope.search
            };
            CommonFactory.getService(params, url).then(function (data) {
                $scope.searchHtml = $sce.trustAsHtml(data.html);
                $scope.process_loader = 0;
            });
            // //$scope.showTab = function ($event, url) {
            // $window.history.pushState(null, 'any', url);
        }
    };


    $scope.topNotification = function ($event) {

        $event.preventDefault();

        Pace.restart();
        $scope.process_loader = 1;
        var url = $("#notification").attr("route");
        $(".global_search").addClass("open");

        CommonFactory.getService('', url).then(function (data) {
            $scope.searchHtml = $sce.trustAsHtml(data.html);
            $scope.process_loader = 0;
        });
    }


    $(".search_close").click(function () {
        $(".global_search").removeClass("open");
    });

});
