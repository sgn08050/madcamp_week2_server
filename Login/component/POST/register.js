var v4 = require('uuid');

function register(app, con){
    app.post("/register/", (req, res) => {
        var post_data = req.body;
        var password = post_data.password;
        var id = post_data.id;
        var uid = v4.v4();
        
        // check whether same id exists
        con.query('INSERT INTO `members` (`member_id`, `id`, `password`) VALUES(?, ?, ?)', 
            [uid, id, password], function(err, result, fields){
                    
            con.on('error', function(err){
                console.log('[MySQL ERROR]', err);
                res.json('Register error', err);
            });
    
    
            con.query('SELECT * FROM members', function(err, result, fields){
                con.on('error', function(err){
                    console.log('error', err);
                    res.json('Debug error2', err);
                });
                console.log(result);
                res.status(200).json({member_id : uid});
            });
        });
    });
}

module.exports.register = register