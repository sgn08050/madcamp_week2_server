function getAssets(app, con){
    app.post("/assets/get", (req, res) => {
        
        var post_data = req.body;
        var member = post_data.member_id;

        con.query('SELECT assets FROM members WHERE member_id = ?', [member], function(err, result, fields){
            
            con.on('error', function(err){
                console.log('[MySQL SELECT ERROR]', err);
                res.json('select error', err);
            });

            if (result.length === 0){
                res.status(200).json({assets: 0});
            }
            else{
                res.status(200).json({assets: result[0].assets});
            }
            
        });       

    })
}

module.exports.getAssets = getAssets