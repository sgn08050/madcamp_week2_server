const { assetsgroup } = require("./assetsgroup");

function updateAssets(app, con){
    app.post("/assets/update", (req, res) => {
        
        var post_data = req.body;
        var member = post_data.member_id;
        var assets = post_data.assets;
        console.log(assets);

        
        con.query('UPDATE members SET assets = ? WHERE member_id = ?', [assets, member], function(err, result, fields){
            
            con.on('error', function(err){
                console.log('[MySQL SELECT ERROR]', err);
                res.json('select error', err);
            });

            
            res.status(200);
            
        });       

    })
}

function updateUses(app, con){
    app.post('/assets/uses', (req, res) => {
        var assetsgroupInformationList = req.body;
        var mid = ""
        var gid = ""
        var group_to_asset = 0;
        
        if (assetsgroupInformationList.length !== 0){
            mid = assetsgroupInformationList[0].member
            gid = assetsgroupInformationList[0].assetsgroup_id
            group_to_asset = assetsgroupInformationList[0].currentasset
        }
        
        con.query('SELECT assets FROM members WHERE member_id = ?', [mid], function(err, result, fields){
            const current_asset = result[0].assets;

            con.query('SELECT currentasset FROM assetsgroupmemberpair WHERE assetsgroup_id = ? AND member_id = ?',
                [gid, mid],
                function(err, result, fields){
                    
                    const group_current_asset = result[0].currentasset;
                    
                    const newsql = `UPDATE members SET assets = ? WHERE member_id = ?`;
                    const newasset = current_asset + (group_to_asset - group_current_asset);
    
                    
                    con.query(newsql, [newasset, mid], function(err, result, fields){
                        if(err) res.status(500).send("Asset update failed");
                        try {
                            for (const pair of assetsgroupInformationList) {
                                const { assetsgroup_id, currentasset, member, targetasset } = pair;
                                const sql = `UPDATE assetsgroupmemberpair SET targetasset = ?, currentasset = ? WHERE assetsgroup_id = ? AND member_id = ?`;
                                    con.query(sql, [targetasset, currentasset, assetsgroup_id, member], (err, result) => {
                                    });
                            }
                        } catch (err) {
                            console.error("Error during database operation:", err);
                            res.status(500).send("Database update failed");
                        }

                    });
                
                });
        });

    });
}

module.exports.updateAssets = updateAssets
module.exports.updateUses = updateUses