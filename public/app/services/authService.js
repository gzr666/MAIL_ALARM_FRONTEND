(function()
{



	angular.module("alarmApp").factory("authService",function($q,$http,$location){

        var hostname = $location.host();
		var API_URL = "http://" + hostname + ":3000" + "/api";
		var defer = $q.defer();

		var login = function(user)
		{
			
			$http({
				url:API_URL + "/login",
				method:"POST",
			    data:{email:user.email,password:user.password}


			}).then(function(result){


				
				 defer.resolve(result.data);

			},function(error){

				defer.reject(error);

			});

			return defer.promise;

		}



		return {
			loginUser:login
		};

	})



}());