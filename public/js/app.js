angular
  .module("project4", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("Maintenance_RequestFactory", [
    "$resource",
    Maintenance_RequestFactoryFunction
  ])
  .controller("Maintenance_RequestIndexController", [
    "Maintenance_RequestFactory",
    Maintenance_RequestIndexControllerFunction
  ])
  .controller("Maintenance_RequestShowController", [
    "$state",
    "$stateParams",
    "Maintenance_RequestFactory",
    Maintenance_RequestShowControllerFunction
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
    .state("maintenance_show", { //defining the show route view
      url:"/maintenance_requests/:tenant_name",
      templateUrl: "/assets/js/ng-views/maintenance_show.html",
      controller: "Maintenance_RequestShowController",
      controllerAs: "vm"
    })


  }

  //link to our backend api
  function Maintenance_RequestFactoryFunction($resource) {
    return $resource("/api/maintenance_requests/:tenant_name", {}, {
      update: {method: "PUT"}
    })
  }

  //setting up what the index controller returns
  function Maintenance_RequestIndexControllerFunction( Maintenance_RequestFactory ){
    this.maintenance_requests = Maintenance_RequestFactory.query();
  }

  //setting up what the show controller returns
  function Maintenance_RequestShowControllerFunction ($state, $stateParams, Maintenance_RequestFactory ) {
    this.maintenance_request = Maintenance_RequestFactory.get({tenant_name: $stateParams.tenant_name})
  }
