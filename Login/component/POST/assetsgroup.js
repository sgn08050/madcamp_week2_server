var v4 = require('uuid');

function assetsgroup(app, con){
    
    app.post("/assetsgroup/information/", (req, res) => {
        var post_data = req.body;
        var assetsgroupname = post_data.assetsgroupname;
        var assetsgroupgoal = post_data.assetsgroupgoal;
        var uid = v4.v4()
        
        // check whether same group name exists
        con.query('SELECT * FROM assetsgroups WHERE assetsgroupname = ?', [assetsgroupname], function(assetsgroupCheckErr, assetsgroupCheckResult, assetsgroupCheckFields) {
            
            if (assetsgroupCheckErr) {
                console.log('Group Check Error', assetsgroupCheckErr);
                res.status(500).json({ message: 'Assetsgroup Check error', error: assetsgroupCheckErr });
            } 
            else {
    
                // id does not exist, succeed to register
                if (assetsgroupCheckResult.length === 0) {
                    con.query('INSERT INTO `assetsgroups` (`assetsgroup_id`, `assetsgroupname`, `assetsgroupgoal`) VALUES(?, ?, ?)', 
                        [uid, assetsgroupname, assetsgroupgoal], function(err, result, fields){
                    
                            con.on('error', function(err){
                                console.log('[MySQL INSERT ERROR]', err);
                                res.json('Register group error', err);
                            });
    
    
                    con.query('SELECT * FROM assetsgroups', function(err, result, fields){
                        con.on('error', function(err){
                            console.log('error', err);
                            res.json('Debug error2', err);
                        });
                        console.log(result);
                        res.status(200).json({assetsgroup_id: uid});
                    });
                })
                }
                // group exists, so rename it
                else {
                        res.status(500).json({ message: 'Group Exists' });
                }
            }
        })
    });
}

module.exports.assetsgroup = assetsgroup