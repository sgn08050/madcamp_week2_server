function assetsgroupmemberpair(app, con){
    app.post("/assetsgroupmemberpair/information", (req, res) => {
        
        var post_data = req.body;
        var member = post_data.member;
        var assetsgroup_id = post_data.assetsgroup_id;
        var targetasset = post_data.targetasset;
        var currentasset = post_data.currentasset;
        

        con.query('SELECT member_id FROM members WHERE id = ?', [member], function(err, result, fields){
            
            con.on('error', function(err){
                console.log('[MySQL SELECT ERROR]', err);
                res.json('select error', err);
            });
            
            var member_id = result[0].member_id;
            con.query('INSERT INTO `assetsgroupmemberpair` (`assetsgroup_id`, `member_id`, `targetasset`, `currentasset`) VALUES(?, ?, ?, ?)', 
            [assetsgroup_id, member_id, targetasset, currentasset], function(err, result, fields){
        
                con.on('error', function(err){
                    console.log('[MySQL INSERT ERROR]', err);
                    res.json('Insert pair error', err);
                });

            })
            
        });       

    })
}

module.exports.assetsgroupmemberpair = assetsgroupmemberpair