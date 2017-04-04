"use strict"

angular
  .module("project4", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("Factory", [
    "$resource",
    FactoryFunction
  ])
  .controller("Maintenance_RequestIndexController", [
    "Factory",
    Maintenance_RequestIndexControllerFunction
  ])
  .controller("Maintenance_RequestNewController", [
    "$state",
    "Factory",
    Maintenance_RequestNewControllerFunction
  ])
  .controller("Maintenance_RequestShowController", [
    "$state",
    "$stateParams",
    "Factory",
    Maintenance_RequestShowControllerFunction
  ])
  .controller("UserShowController", [
    "$stateParams",
    "Factory",
    "$state",
    UserShowControllerFunction
  ])


  function Router($stateProvider) { //defining the main route view
    $stateProvider
    .state("welcome", {
      url:"/",
      templateUrl: "/assets/js/ng-views/welcome.html"
    })
    .state("maintenance_index", { //defining the index route view
      url: "/maintenance_requests",
      templateUrl: "/assets/js/ng-views/maintenance_index.html",
      controller: "Maintenance_RequestIndexController",
      controllerAs: "vm"
    })
    .state("maintenance_new", { //defining the create route view for maintenance requests
      url:"/maintenance_requests/new",
      templateUrl: "/assets/js/ng-views/maintenance_new.html",
      controller: "Maintenance_RequestNewController",
      controllerAs: "vm"
    })
    .state("maintenance_show", { //defining the show route view
      url:"/maintenance_requests/:tenant_name",
      templateUrl: "/assets/js/ng-views/maintenance_show.html",
      controller: "Maintenance_RequestShowController",
      controllerAs: "vm"
    })
    .state("userShow", {
      url: "/maintenance_requests/:tenant_name/users",
      templateUrl: "/assets/js/ng-views/user_show.html",
      controller: "UserShowController",
      controllerAs: "vm"
    })

  }

  //link to our backend api
  function FactoryFunction($resource) {
    return {
      maintenance_requests: $resource("/api/maintenance_requests/:tenant_name", {}, {
        update: {method: "PUT"}
      }),
      users: $resource("/api/maintenance_requests/:tenant_name/users/:category", {tenant_name: "@tenant_name", category: "@category"}, {
        get: {method: "GET", params: {tenant_name: "@tenant_name", category: "@category"}, isArray: false},
        update: {method: "PUT"}
      })
    }
  }

  //setting up what the index controller returns
  function Maintenance_RequestIndexControllerFunction( Factory ){
    this.maintenance_requests = Factory.maintenance_requests.query();
  }

  function Maintenance_RequestNewControllerFunction( $state, Factory ){
    this.maintenance_request = new Factory.maintenance_requests();
    this.create = function(){
      this.maintenance_request.$save(function(maintenance_request){
        $state.go("maintenance_show", {tenant_name: maintenance_request.tenant_name})
      })
  }
}

  //setting up what the show controller returns
  function Maintenance_RequestShowControllerFunction ( $state, $stateParams, Factory ) {
    this.maintenance_request = Factory.maintenance_requests.get({tenant_name: $stateParams.tenant_name})
    this.update = function (){
      this.maintenance_request.$update({tenant_name: $stateParams.tenant_name})
    }
    this.destroy = function(){
      this.maintenance_request.$delete({tenant_name: $stateParams.tenant_name}, function() {
        $state.go("welcome")
      })
    }
  }

  function UserShowControllerFunction ( $state, $stateParams, Factory ) {
    this.maintenance_request = Factory.maintenance_requests.get({tenant_name: $stateParams.tenant_name}, (maintenance_request) =>{
      this.users = maintenance_request.users
    })
  }
