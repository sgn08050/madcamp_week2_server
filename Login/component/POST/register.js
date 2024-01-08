var v4 = require('uuid');

function register(app, con){
    app.post("/register/", (req, res) => {
        var post_data = req.body;
        var password = post_data.password;
        var id = post_data.id;
        var assets = post_data.assets;
        var uid = v4.v4();
        
        if(id === '') {
            res.json('Write id');
        }
        if(password === ''){
            res.json('Write password');
        }

        // check whether same id exists
        con.query('INSERT INTO `members` (`member_id`, `id`, `password`, `assets`) VALUES(?, ?, ?, ?)', 
            [uid, id, password, assets], function(err, result, fields){
                    
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

function registerAsset(app, con){
    app.post("/register/assets", (req, res) => {
        var post_data = req.body;
        var assets = post_data.assets;
        var member_id = post_data.member_id;
        
        // check whether same id exists
        con.query('UPDATE members SET assets = ? WHERE member_id = ?', [assets, member_id], function(err, result) {
            
            if (err) {
                console.log('Update Error', err);
                res.status(500).json({ message: 'Update Error', error: err });
            } 
            else {   
                res.status(200).json({ message: 'success'})
            }
        })
    });
}

module.exports.register = register
module.exports.registerAsset = registerAsset