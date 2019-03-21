(function () {

    /**
     * This controller contains functions specific to the admin page.
     * @param $scope - binding between controller and HTML page
     * @param $window - the browser window object
     * @param $controller - service for instantiating controllers
     * @param $uibModal - the UI Bootstrap service for creating modals
     * @param dataProvider - service function that provides GET and POST requests for getting or updating data
     */
    function AdminJsController($scope, $window, $uibModal, $controller, dataProvider, groupingsService) {

        $scope.adminsList = [];
        $scope.pagedItemsAdmins = [];
        $scope.currentPageAdmins = 0;

        // Allow this controller to use functions from the General Controller
        angular.extend(this, $controller("GeneralJsController", { $scope: $scope }));
        angular.extend(this, $controller("TimeoutJsController", { $scope: $scope }));


        $scope.createRoleErrorModal = function () {
            $scope.loading = false;
            $scope.RoleErrorModalInstance = $uibModal.open({
                templateUrl: "modal/roleErrorModal",
                scope: $scope
            });
        };

        $scope.proceedLogoutUser = function () {
            $scope.RoleErrorModalInstance.close();
            var r = new XMLHttpRequest();
            r.open('POST', '/uhgroupings/logout', true);
            r.setRequestHeader("X-XSRF-TOKEN", $scope.getCookie("XSRF-TOKEN"));
            r.send();
            $window.location.href = "/uhgroupings/";
        };


        /**
         * Initializes the page, displaying the list of groupings to administer and the list of admins to manage.
         */
        $scope.init = function () {
            // Adds the loading spinner.
            $scope.loading = true;
            groupingsService.getAdminLists(function (res) {
                $scope.adminsList = _.sortBy(res.adminGroup.members, "name");
                $scope.filter($scope.adminsList, "pagedItemsAdmins", "currentPageAdmins", $scope.adminsQuery, true);

                $scope.groupingsList = _.sortBy(res.allGroupings, "name");
                $scope.filter($scope.groupingsList, "pagedItemsGroupings", "currentPageGroupings", $scope.groupingsQuery, true);

                $scope.loading = false;
             }, function (res) {
                if (res.statusCode === 403) {
                         $scope.createRoleErrorModal();
                     }
            });
        };

        $scope.displayAdmins = function () {
            $scope.resetGroupingInformation();
            $scope.pagedItemsGroupings = $scope.groupToPages($scope.groupingsList);
            $scope.showGrouping = false;
        };

        /**
         * Adds a user to the admin list.
         */
        $scope.addAdmin = function () {
            groupingsService.getAdminLists(function () {
                var adminToAdd = $scope.adminToAdd;
                if (_.isEmpty(adminToAdd)) {
                    $scope.createAddErrorModal(adminToAdd);
                } else {
                    $scope.createConfirmAddModal({
                        userToAdd: adminToAdd,
                        listName: "admins"
                    });
                }
            }, function (res) {
                if (res.statusCode === 403) {
                    $scope.createRoleErrorModal();
                }
            });
        };

        /**
         * Removes an admin from the admin list. There must be at least one admin remaining.
         * @param {number} currentPage - the current page in the admins list
         * @param {number} index - the index of the admin to delete, with the current page and items per page taken into
         * account
         */
        $scope.removeAdmin = function (currentPage, index) {
            groupingsService.getAdminLists(function () {
                var adminToRemove = $scope.pagedItemsAdmins[currentPage][index];

                if ($scope.adminsList.length > 1) {
                    $scope.createRemoveModal({
                        user: adminToRemove,
                        listName: "admins"
                    });
                } else {
                    var userType = "admin";
                    $scope.createRemoveErrorModal(userType);
                }
            },function (res){
                if (res.statusCode === 403) {
                    $scope.createRoleErrorModal();
                }
            });
        };

    }

    UHGroupingsApp.controller("AdminJsController", AdminJsController);

})();
