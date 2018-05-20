(function()
{



	angular.module("alarmApp").factory("usersService",function($q,$http,$location){

        var hostname = $location.host();
		var API_URL = "http://" + hostname + ":3000" + "/api";
		var defer = $q.defer();

		var getUsers = function()
		{
			
			$http({
				url:API_URL + "/korisnici",
				method:"GET"
			   
			}).then(function(result){


				
				 defer.resolve(result.data);

			},function(error){

				defer.reject(error);

			});

			return defer.promise;

		}



		return {
			getUsers:getUsers
		};

	})



}());