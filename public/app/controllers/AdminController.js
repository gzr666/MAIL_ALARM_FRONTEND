(function(){
    
    angular.module("alarmApp")
    .controller("AdminController",function($scope,$rootScope,usersService)
    {

        var getUsers = usersService.getUsers()
        .then(function(data){

            console.log(data);

        },function(error){
            console.log(error);
        });


        getUsers();

        
    });
    
    
    
    
    }());