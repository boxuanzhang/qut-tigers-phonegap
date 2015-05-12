'use strict';

/**
 * @ngdoc service
 * @name qutTigersApp.GroupService
 * @description
 * # GroupService
 * Factory in the qutTigersApp.
 */
angular.module('qutTigersApp')
  .factory('GroupService', function ($q, BaseService) {
    function GroupService() {}

    GroupService.prototype.getGroupPromise = function (groupId) {
      var deffered = $q.defer();

      var cacheKey = 'group_' + groupId;
      var cached = lscache.get(cacheKey);
      if (cached) {
        deffered.resolve(cached);
      } else {
        BaseService.get(
          '/group/' + groupId,
          {},
          function (data, status) {
            lscache.set(cacheKey, data.group, 60);
            deffered.resolve(data.group);
          },
          function (data, status) {
            deffered.reject();
          }
        )
      }

      return deffered.promise;
    };

    GroupService.prototype.getGroupListPromise = function () {
      var deffered = $q.defer();

      var cacheKey = 'group_list';
      var cached = lscache.get(cacheKey);
      if (cached) {
        deffered.resolve(cached);
      } else {
        BaseService.get(
          '/group/',
          {},
          function (data, status) {
            lscache.set(cacheKey, data.groups, 60);
            deffered.resolve(data.groups);
          },
          function (data, status) {
            deffered.reject();
          }
        )
      }

      return deffered.promise;
    };

    return new GroupService();
  });
