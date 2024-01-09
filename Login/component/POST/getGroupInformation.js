function getGroupInformation(app, con){

    app.post('/group/information', (req, res) => {
        var post_data = req.body;
        var member_id = post_data.member_id;
        var assetsgroup_id = post_data.assetsgroup_id;
        var assetsgroupname = post_data.assetsgroupname;
        var assetsgroupgoal = post_data.assetsgroupgoal;
        var categories = post_data.categories;
        var targetasset = post_data.targetasset;
        var currentasset = post_data.currentasset;

        con.query('SELECT * FROM assetsgroups WHERE assetsgroup_id = ?', [assetsgroup_id], function(err, result, fields){
            
            assetsgroupname = result[0].assetsgroupname;
            assetsgroupgoal = result[0].assetsgroupgoal;
            
            con.query('SELECT * FROM assetsgroupmemberpair WHERE assetsgroup_id = ? AND member_id = ?', [assetsgroup_id, member_id], function(err, result, fields){

    
                targetasset = result[0].targetasset;
                currentasset = result[0].currentasset;

                con.query(`
                    SELECT c.category_id, c.tag 
                    FROM assetsgroupcategorypair agcp
                    JOIN categories c ON agcp.category_id = c.category_id
                    WHERE agcp.assetsgroup_id = ?`, [assetsgroup_id], function(err, result, fields) {
    
                    if (err) {
                        console.log('[MySQL SELECT ERROR]', err);
                        res.status(500).json('error', err);
                    } else {
                        
                        categories = result.map(function(item) {
                            return item.tag;
                        });
                        
                    }
                    console.log(assetsgroupname);
                    res.status(200).json({member_id: member_id, assetsgroup_id: assetsgroup_id, assetsgroupname: assetsgroupname,
                        assetsgroupgoal: assetsgroupgoal, categories: categories, targetasset: targetasset, currentasset: currentasset
                    });

                });
            });
            
        }); 
    });
}

module.exports.getGroupInformation = getGroupInformation