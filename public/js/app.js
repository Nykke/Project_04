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
  .factory("Maintenance_RequestFactory", [
    "$resource",
    Maintenance_RequestFactoryFunction
  ])
  .factory("UserFactory", [
    "$resource",
    UserFactoryFunction
  ])
  .controller("Maintenance_RequestIndexController", [
    "Maintenance_RequestFactory",
    Maintenance_RequestIndexControllerFunction
  ])
  .controller("Maintenance_RequestNewController", [
    "$state",
    "Maintenance_RequestFactory",
    Maintenance_RequestNewControllerFunction
  ])
  .controller("Maintenance_RequestShowController", [
    "$state",
    "$stateParams",
    "Maintenance_RequestFactory",
    Maintenance_RequestShowControllerFunction
  ])
  .controller("UserShowController", [
    "$state",
    "$stateParams",
    "UserFactory",
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
  //api and method used to call the backend
  function Maintenance_RequestFactoryFunction($resource) {
    return $resource("/api/maintenance_requests/:tenant_name", {}, {
      update: {method: "PUT"}
    })
  }

  //need a different user factory
  function UserFactoryFunction($resource){
    return $resource ("/api/maintenance_requests/:tenant_name/users", {tenant_name: "@tenant_name"}, {
      //need to specify which methods are being used for the second model, users
        get: {method: "GET", params: {}, isArray: false},
        create: {method: "POST"}
      })
    }

  function Maintenance_RequestIndexControllerFunction( Maintenance_RequestFactory ){
    //shows all maintenance_requests made
    this.maintenance_requests = Maintenance_RequestFactory.query();
  }

  function Maintenance_RequestNewControllerFunction( $state, Maintenance_RequestFactory ){
    //creates new maintenance_requests
    this.maintenance_request = new Maintenance_RequestFactory();
    this.create = function(){
      this.maintenance_request.$save(function(maintenance_request){
        $state.go("maintenance_show", {tenant_name: maintenance_request.tenant_name})
      })
  }
}

  function Maintenance_RequestShowControllerFunction ( $state, $stateParams, Maintenance_RequestFactory ) {
    //shows all maintenance_requests by tenant name
  this.maintenance_request = Maintenance_RequestFactory.get({tenant_name: $stateParams.tenant_name})
  //updates all maintenance_requests
  this.update = function (){
    this.maintenance_request.$update({tenant_name: $stateParams.tenant_name})
  }
  //deletes all maintenance_requests
  this.destroy = function(){
    this.maintenance_request.$delete({tenant_name: $stateParams.tenant_name}, function() {
      $state.go("welcome")
    })
  }
}
  //view for users for one maintenance_request
  function UserShowControllerFunction ($state, $stateParams, UserFactory ) {
      this.tenant = UserFactory.get({tenant_name: $stateParams.tenant_name}, (tenant) => {
        this.users = tenant.users

        //create new user attached to one maintenance_request
        // this.newUser = new UserFactory()
        // this.newUser.create = function(){
        //   this.newUser.$save(function(user){
        //     $state.reload()
        //   })

        this.newUser = new UserFactory()
        this.newUser.create = function(){
          this.newUser.$save({tenant_name: $stateParams.tenant_name}).then(function(user){
            this.UserFactory.push(user)
          // this.maintenance_request = maintenance_request.UserFactory.push(user)
            $state.reload()
          })

          // ({tenant_name: $stateParams.tenant_name}).then(function(user){
          //   this.UserFactory.push(user)
          //   // this.maintenance_request = maintenance_request.UserFactory.push(user)
          //   $state.reload()
          // })
        }
    })
}
