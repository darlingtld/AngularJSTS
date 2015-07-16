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


})

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

    function sleep(d) {
        for (var t = Date.now(); Date.now() - t <= d;);
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

    $http.get('http://localhost:3000/employees').success(function (data) {
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

demoModule.directive('userDirective', function () {
    return {
        template: 'Name: {{person.name}} Contact: {{person.contact}}'
    };
});

demoModule.directive('userDirective2', function () {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@'
        },
        //template: '<div>{{ person.name }}</div>',
        templateUrl: 'html/template.html',
        //controller: controllerFunction, //Embed a custom controller in the directive
        link: function ($scope, element, attrs) {
        } //DOM manipulation
    }
});

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