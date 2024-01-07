var v4 = require('uuid');

function appLogin(app, con){
    
    app.post("/login/app/", (req, res) => {
        var post_data = req.body;
        var password = post_data.password;
        var id = post_data.id;
        
        // check whether same id exists
        con.query('SELECT * FROM members WHERE id = ?', [id], function(idCheckErr, idCheckResult, idCheckFields) {
            
            if (idCheckErr) {
                console.log('Id Check Error', idCheckErr);
                res.status(500).json({ message: 'Id Check error', error: idCheckErr });
            } 
            else {
    
                // id does not exist, fail to login
                if (idCheckResult.length === 0) {
                    res.status(500).json({ message: 'Please Check Id'});
                }
                // id exists, now check password
                else {
                    const correctPassword = idCheckResult[0].password;
                    if (password === correctPassword) {
                        console.log('authentication success')
                        res.status(200).json({ message: 'Login successful' });
                    } else {
                        console.log('authentication fail')
                        res.status(500).json({ message: 'Incorrect Password' });
                    }
                }
            }
        })
    });
}

function kakaoLogin(app, con){
    app.post("/login/kakao/", (req, res) => {
        var post_data = req.body;
        var password = post_data.password;
        var id = post_data.id;
        var uid = v4.v4();
        
        // check whether same id exists
        con.query('SELECT * FROM members WHERE id = ?', [id], function(idCheckErr, idCheckResult, idCheckFields) {
            
            if (idCheckErr) {
                console.log('Id Check Error', idCheckErr);
                res.status(500).json({ message: 'Id Check error', error: idCheckErr });
            } 
            else {
    
                // id does not exist, successful register
                if (idCheckResult.length === 0) {
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
                        res.status(200).json({message: 'Register successful'});
                    });
                })
                }
                // id exists
                else {
                    console.log("Id exists");
                    res.status(200).json({message: 'Login successful'});
                }
            }
        })
    });
}

module.exports.appLogin = appLogin
module.exports.kakaoLogin = kakaoLogin