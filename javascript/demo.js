/**
 * Created by tangl9 on 2015-07-14.
 */
demoModule = angular.module('DemoModule', ['ngRoute'])

demoModule.controller('mainController', function ($scope) {
    $scope.person = {
        name: 'Lingda',
        gender: 'male',
        contact: '13402188638'
    }

    $scope.show = function () {
        return $scope.checked;
    };
})

function sleep(d) {
    for (var t = Date.now(); Date.now() - t <= d;);
}
demoModule.controller('userController', function ($scope, $q, $http) {
    $scope.verifyUser = function () {
        var userId = $scope.userId;
        var deferred = $q.defer();
        var user = findUserFromDB();
        if (user) {
            deferred.resolve('User ID is available');
        } else {
            deferred.reject('User ID already taken, try another name');
        }

        return deferred.promise;
    }
    $scope.checkUser = function () {
        var promise = $scope.verifyUser();
        promise.then(function (msg) {
            $scope.message = 'Resolved ' + msg;
        }, function (msg) {
            $scope.message = 'Rejected ' + msg;
        });
    }

    function findUserFromDB() {
        sleep(1000);
        return true;
    }


    $scope.users = [{
        name: 'Sara',
        email: 'sara.zhu@emc.com'
    }, {
        name: 'Lingda',
        email: 'lingda.tang@emc.com'
    }]

    $scope.breadcrumbs = [{
        name: 'admin',
        path: '#/admin'
    }, {
        name: 'projects',
        path: '#/projects'
    }, {
        name: 'new',
        path: '#/new'
    }]

    $http.get('http://localhost:3001/employees').success(function (data) {
        $scope.employees = data;
    })
});

demoModule.controller('breadcrumbController', function ($scope) {
    $scope.breadcrumbs = [{
        name: 'admin',
        path: '#/admin'
    }, {
        name: 'projects',
        path: '#/projects'
    }, {
        name: 'new',
        path: '#/new'
    }]
});

demoModule.controller('switchController', function ($scope) {
    $scope.items = ['settings', 'home', 'other'];
    $scope.selection = $scope.items[0];
});

demoModule.controller('filterController', function ($scope) {
    $scope.now = new Date();
})

demoModule.filter('reverse', function () {
    return function (input) {
        if (!angular.isString(input)) {
            return input;
        }
        return input.split('').reverse().join('');
    };
});

demoModule.controller('corpController', function ($scope) {
    $scope.corps = [{name: 'EMC'}, {name: 'DIANPING'}, {name: 'CTRIP'}]
})

demoModule.controller('divisionController', function ($scope) {
    $scope.divisions = [{name: 'DPAD'}, {name: 'PRODUCT'}, {name: 'RISK&SECURITY'}]
})

demoModule.controller('teamController', function ($scope) {
    $scope.teams = [{name: 'PROMETHEUS'}, {name: 'ACTIVITY'}, {name: 'RISK'}]
})

demoModule.controller('personController', function ($scope, $routeParams) {
    var name = $routeParams.person;
    $scope.person = {
        name: name
    }
})
demoModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/corp', {
            controller: 'corpController',
            templateUrl: 'html/corp.html'
        })
        .when('/division', {
            controller: 'divisionController',
            templateUrl: 'html/division.html'
        })
        .when('/team', {
            controller: 'teamController',
            templateUrl: 'html/team.html'
        })
        .when('/person/:person', {
            controller: 'personController',
            templateUrl: 'html/person.html'
        })
        .otherwise({
            redirectTo: '/corp'
        });
}]);


demoModule.controller('directiveController', function ($scope) {
    $scope.title = 'click to open';
    $scope.text = 'Angular JS~~~';

    $scope.expanders = [{
        title : 'Grey\'s Anatomy',
        text : 'Grey\'s AnatomyGrey\'s AnatomyGrey\'s Anatomy'
    }, {
        title : 'Prison Break',
        text : 'Prison BreakPrison BreakPrison Break'
    }, {
        title : 'Person of Interest',
        text : 'Person of InterestPerson of InterestPerson of Interest'
    }];
})

demoModule.directive('hello', function () {
    return {
        restrict: 'E',
        template: '<div>Hi there</div>',
        replace: true
    };
});

demoModule.directive('hello2', function () {
    return {
        restrict: 'E',
        template: '<div>Hi there <span ng-transclude></span></div>',
        transclude: true
    };
});

demoModule.directive('expander', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            title: '=expanderTitle'
        },
        template: '<div>'
        + '<div class="title" ng-click="toggle()">{{title}}</div>'
        + '<div class="body" ng-show="showMe" ng-transclude></div>'
        + '</div>',
        link: function (scope, element, attrs) {
            scope.showMe = false;
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
            }
        }
    }
});

demoModule.directive('accordion', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: '<div ng-transclude></div>',
        controller: function () {
            var expanders = [];
            this.gotOpened = function (selectedExpander) {
                angular.forEach(expanders, function (expander) {
                    if (selectedExpander != expander) {
                        expander.showMe = false;
                    }
                });
            }
            this.addExpander = function (expander) {
                expanders.push(expander);
            }
        }
    }
});

demoModule.directive('expander2', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        require: '^?accordion',
        scope: {
            title: '=expanderTitle'
        },
        template: '<div>'
        + '<div class="title" ng-click="toggle()">{{title}}</div>'
        + '<div class="body" ng-show="showMe" ng-transclude></div>'
        + '</div>',
        link: function (scope, element, attrs, accordionController) {
            scope.showMe = false;
            accordionController.addExpander(scope);
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
                accordionController.gotOpened(scope);
            }
        }
    }
});