(function() {
  'use strict';

  /* Controllers */
  angular.module('app.controllers', ['ngCookies', 'ui.bootstrap']).controller('SearchCtrl', [
    '$scope', '$state', function($scope, $state) {
      $scope.$watch((function() {
        var _ref;
        return (_ref = $state.params) != null ? _ref.term : void 0;
      }), function(term) {
        return $scope.searchTerm = term;
      });
      return $scope.search = function() {
        if (!$scope.searchTerm) {
          return;
        }
        return $state.go('home', {
          term: $scope.searchTerm
        });
      };
    }
  ]).controller('AppListCtrl', [
    '$scope', '$stateParams', 'App', function($scope, $stateParams, App) {
      var removeEmptyKey;
      removeEmptyKey = function(obj) {
        var newObj;
        newObj = {};
        _(obj).forEach(function(value, key) {
          if (value != null) {
            return newObj[key] = value;
          }
        });
        return newObj;
      };
      return $scope.apps = App.query(removeEmptyKey($stateParams));
    }
  ]);

}).call(this);

(function() {
  'use strict';
  angular.module('app', ['ui.router', 'app.controllers', 'app.directives', 'app.services', 'app.filters', 'app.models']).config([
    '$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
      $locationProvider.html5Mode(false).hashPrefix("!");
      $urlRouterProvider.otherwise('/');
      return $stateProvider.state('home', {
        url: '/:term?country&media&entity&attribute&lang&version&explicit&limit',
        templateUrl: 'partials/home.html',
        controller: 'AppListCtrl'
      });
    }
  ]);

  angular.element(document).ready(function() {
    return angular.bootstrap(document, ['app']);
  });

}).call(this);

(function() {
  'use strict';

  /* Models */
  angular.module('app.models', ['ngResource']).factory('App', [
    '$resource', function($resource) {
      var App;
      App = $resource('https://itunes.apple.com/search?callback=JSON_CALLBACK', null, {
        query: {
          method: 'jsonp',
          isArray: true,
          params: {
            media: 'software',
            limit: 200
          },
          transformResponse: function(datastr, headersGetter) {
            var data;
            data = angular.fromJson(datastr);
            return data.results;
          }
        }
      });
      return App;
    }
  ]);

}).call(this);

(function() {
  'use strict';

  /* Sevices */
  angular.module('app.services', []);

}).call(this);

(function() {
  'use strict';

  /* Directives */
  angular.module('app.directives', []);

}).call(this);

(function() {
  'use strict';

  /* Filters */
  angular.module('app.filters', []);

}).call(this);
