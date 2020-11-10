const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from users where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0].type);
			}
		});
	},
	getById: function(id, callback){

	},
	getAll: function(callback){
		var sql = "select * from users";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	
	insert: function(user, callback){
		var sql = "INSERT INTO users(name,username, password,companyname,contactno, type) VALUES ('"+user.name+"','"+user.username+"','"+user.password+"','"+user.companyname+"','"+user.contactno+"','"+user.type+"')";
		db.execute(sql,function(status){
			callback(status);
		});
	},

	update:function(user,callback){
      var sql = "UPDATE customers SET username = 'abc' WHERE username = 'alamin'";
 		 db.execute(sql,function(status){
			callback(status);
		con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
	},

	delete: function(id,callback){
		 var sql = "DELETE FROM users WHERE username = 'alamin'";
          db.execute(sql,function(status){
			callback(status);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);

	}
}