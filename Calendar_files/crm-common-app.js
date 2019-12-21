/**
 * Created by Faisal Mehmood.
 */
/*
 * Defining Constants for websites services link and api configs
 */
var my_token = $('meta[name=token]').attr("content");


app.constant('API_URL', rootUrl + "/");
app.constant('App_Name', 'EPC');
app.constant('Debug_Mode', true);

var header = {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
    // 'accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    // 'X-CSRF-Token': $('meta[name=csrf-token]').attr("content"), //Here, I am using the CSRF token
};
/*
 * @DOC          :  11-22-2019
 * @CreatedBy    :  Faisal Mehmood
 * @Detail       :  This is a factory that have common methods
 */

app.factory('CommonFactory', function ($http, App_Name, API_URL, $timeout, $rootScope, $q, $window, $httpParamSerializerJQLike) {

    /*
     * @DOC          :  07-10-2018
     * @CreatedBy    :  Faisal Mehmood
     * @Detail       :  Function for get services
     */
    var getService = function (params, $serviceName) {


        var token = $('meta[name=token]').attr("content");

        var deferred = $q.defer();

        if ($serviceName.indexOf("http://") == 0 || $serviceName.indexOf("https://") == 0)
            url = $serviceName;
        else
            url = API_URL + $serviceName;

        $http.get(url, {
            params: params,
            headers: header,
        }).then(function (success) {



                if (success.status == 200) {

                    deferred.resolve(success.data);

                    // if (success.data.code == 200) {
                    //     deferred.resolve(success.data);
                    // } else {
                    //     deferred.reject(success.data.message);
                    // }

                } else {
                    deferred.reject("There's an internet connection problem. Please try again later.");
                }

            },
            function (err) {
                alert("Some Error!");

                // if (err.data.message == 'Unauthenticated.') {
                //
                //     alert("aaaa");
                //
                //     // $('#logout-form').submit();
                //     // return
                // }
                // deferred.reject("There's an internet connection problem. Please try again later.");
            });
        return deferred.promise;

    };

    /*
     * @DOC          :  07-10-2018
     * @CreatedBy    :  Faisal Mehmood
     * @Detail       :  Function for post services
     */
    var postService = function (paramsString, $serviceName) {

        var token = $('meta[name=token]').attr("content");

        var url = API_URL + $serviceName;


        var deferred = $q.defer();

        var promise = $http.post(url, paramsString, {
            headers: header,
        });

        promise.then(
            function (success) {

                alert("aaa");

                /* if (success.status == 202) {

                     if (success.data.code == 202) {

                         if (success.data.messages) {
                             deferred.reject(success.data.messages);
                         } else {
                             deferred.resolve(true);
                         }
                     }

                 }
                 else if (success.status == 200) {
                     if (success.data.code == 200) {
                         deferred.resolve(success.data);
                     }
                     else if (success.data.code == 4004) {
                         toastr.warning('', success.data.error);
                         toastr.error(success.data.error, "");
                         $timeout(function () {
                             window.location.reload()
                         }, 2000);

                     }
                     else {

                         deferred.reject(success.data.detail);
                     }

                 } else {
                     deferred.reject("There's an internet connection problem. Please try again later.");
                     toastr.error("There's an internet connection problem. Please try again later.", "");
                 }*/
            },
            function (err) {

                alert("aaa");

                /* if (err.data.message == 'Unauthenticated.') {

                     window.location = rootUrl + '/login'
                     return
                 }

                 deferred.reject("There's an internet connection problem. Please try again later.");
                 toastr.error("There's an internet connection problem. Please try again later.", "");*/
            }
        );
        return deferred.promise;
    };

    /*
     * @DOC          :  19-04-2019
     * @CreatedBy    :  Areeba Azhar
     * @Detail       :  Function for post services with full url
     */
    var postUrlService = function (paramsString, $serviceUrl) {

        var token = $('meta[name=token]').attr("content");

        var url = $serviceUrl;


        var deferred = $q.defer();

        var promise = $http.post(url, paramsString, {
            headers: header,
        });

        promise.then(
            function (success) {

                if (success.status == 202) {

                    if (success.data.code == 202) {

                        if (success.data.messages) {
                            deferred.reject(success.data.messages);
                        } else {
                            deferred.resolve(true);
                        }
                    }

                }
                else if (success.status == 200) {
                    if (success.data.code == 200) {
                        deferred.resolve(success.data);
                    }
                    else if (success.data.code == 4004) {
                        toastr.warning('', success.data.error);
                        toastr.error(success.data.error, "");
                        $timeout(function () {
                            window.location.reload()
                        }, 2000);

                    }
                    else {

                        deferred.reject(success.data.detail);
                    }

                } else {
                    deferred.reject("There's an internet connection problem. Please try again later.");
                    toastr.error("There's an internet connection problem. Please try again later.", "");
                }
            },
            function (err) {

                if (err.data.message == 'Unauthenticated.') {

                    window.location = rootUrl + '/login'
                    return
                }

                deferred.reject("There's an internet connection problem. Please try again later.");
                toastr.error("There's an internet connection problem. Please try again later.", "");
            }
        );
        return deferred.promise;
    };

    return {
        getService: getService,
        postService: postService,
        postUrlService: postUrlService
    };
});

/*
 * @DOC          :  11-22-2019
 * @CreatedBy    :  Faisal Mehmood
 * @Detail       :  This is a custom made service to store data to localStorage, all getter and setter methods are defined here to make storage and retrival of data easy
 */
app.factory('$localStorage', function ($window) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
        }
        , get: function (key) {
            return $window.localStorage[key] || null;
        }
        , setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        }
        , getObject: function (key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
        , clearAll: function () {
            $window.localStorage.clear();
        }
        , getAll: function () {
            return $window.localStorage || null;
        }
    };

});


function consoleLog(str) {
    console.log(str)
}

function getUrlVariable(str) {
    console.log(str)
}




