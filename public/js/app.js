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

  //defining the main route view
  function Router($stateProvider) {
    $stateProvider
    .state("welcome", {
      url:"/",
      templateUrl: "/assets/js/ng-views/welcome.html"
    })
  }

  //link to our backend api
  function Maintenance_RequestFactoryFunction($resource) {
    return $resource("/api/maintenance_requests/:tenant_name", {}, {
      update: {method: "PUT"}
    })
  }
