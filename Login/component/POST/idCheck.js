function idCheck(app, con){
    app.post("/register/idcheck", (req, res) => {
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
                // id does not exist, successful register
                if (idCheckResult.length === 0) {
                    res.status(200).json({ message: 'User can use Id'});
                }
                // id exists
                else {
                    res.status(500).json({ message: 'Id Already Exists', error: idCheckErr });
                }
            }
        })
    });
}

module.exports.idCheck = idCheck