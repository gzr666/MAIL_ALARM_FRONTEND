var bcrypt = require("bcrypt-node");


var hashPassword = function(password,callback)
{

	bcrypt.hash(password, null, null, function(err, hash) {

			if(err)
			{
				return callback(err,null)
			}
			
			
				return callback(null,hash)
			
    
	});



}

var getPassword = function(plainpasssword,hashedPassword,callback)
{

	bcrypt.compare(plainpasssword, hashedPassword, function(err, res) {
    // res == true

    	if(err)
    	{
    		return callback(err,null);
    	}

    	else
    	{
    		return callback(null,res)
    	}


});




}

module.exports = {

	hashPass:hashPassword,
	getPass:getPassword
}