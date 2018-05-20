(function(){

    var alarmApp = angular.module('alarmApp', ["ui.router","angular-storage","angular-jwt"]);

    alarmApp.config(function($stateProvider,$urlRouterProvider,$httpProvider,$locationProvider,jwtInterceptorProvider,jwtOptionsProvider){

        //postavke jwt library
        jwtOptionsProvider.config({
            
            whiteListedDomains: ['']
            
        });

        jwtInterceptorProvider.tokenGetter = function(store)
        {
  
          return store.get("jwt");
        }
        
        $httpProvider.interceptors.push('jwtInterceptor');




        $urlRouterProvider.otherwise("/home");
        
               $stateProvider.state("home",{
        
                    url:"/home",
                    templateUrl:"../app/templates/home.html",
                    controller:"HomeController"
        
               });
        
                $stateProvider.state("admin",{
        
              url:"/admin",
              templateUrl:"../app/templates/admin.html",
              controller:"AdminController",
              data:{
                  requiresLogin:true
                   }
        
               });

               $stateProvider.state("login",{
                
                      url:"/login",
                      templateUrl:"../app/templates/login.html",
                      controller:"LoginController"
                
                       });



    });




    alarmApp.run(function($state,$rootScope,store){
        
        
        
        
        
          
          //changing route event
        
          $rootScope.$on("$stateChangeStart",function(e,to){
        
              if(to.data && to.data.requiresLogin)
              {
                
                if(!store.get("jwt"))
                {
                    


                    e.preventDefault();
                    $state.go("login");
                }
                
              }
        
          });
        
          $rootScope.logMeOff = function()
          {
            store.remove("jwt");
            $rootScope.showLogin = false;
        
          };
                  
        });
        



}());