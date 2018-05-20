(function(){
    
    angular.module("alarmApp")
    .controller("LoginController",function($scope,$rootScope,authService,$http,$state,store,jwtHelper)
    {
        
   
       $scope.user={};
       //$scope.testme 
        
        
   
        $scope.postForm = function(user)
        {
           
           authService.loginUser($scope.user).then(function(data){

            //$scope.userData = jwtHelper.decodeToken(data);
          
           store.set("jwt",data);
           $state.go("admin");


           },function(error){

                console.log(error);
           })
   
   
        };


        $rootScope.logMeOff = function()
        {
          store.remove("jwt");
          $rootScope.showLogin = false;
          $state.go("home");
      
        };




        
    });
    
    
    
    
    }());