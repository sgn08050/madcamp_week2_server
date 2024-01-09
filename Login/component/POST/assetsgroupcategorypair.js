function assetsgroupcategorypair(app, con){
    app.post("/assetsgroupcategorypair/information", (req, res) => {
        
        var post_data = req.body;
        var category = post_data.category;
        var assetsgroup_id = post_data.assetsgroup_id;
        

        con.query('SELECT category_id FROM categories WHERE tag = ?', [category], function(err, result, fields){
            
            con.on('error', function(err){
                console.log('[MySQL SELECT ERROR]', err);
                res.json('select error', err);
            });
            
            var category_id = result[0].category_id;
            con.query('INSERT INTO `assetsgroupcategorypair` (`assetsgroup_id`, `category_id`) VALUES(?, ?)', 
            [assetsgroup_id, category_id], function(err, result, fields){
        
                con.on('error', function(err){
                    console.log('[MySQL INSERT ERROR]', err);
                    res.json('Insert pair error', err);
                });

            })
            
        });       

    })
}

module.exports.assetsgroupcategorypair = assetsgroupcategorypair