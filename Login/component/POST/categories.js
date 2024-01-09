var v4 = require('uuid');

function categories(app, con){
    app.post("/category/information", (req, res) => {
        var post_data = req.body;
        var tag = post_data.tag;
        var uid = v4.v4();
        console.log(uid);
        
        // check whether same id exists
        con.query('SELECT * FROM categories WHERE tag = ?', [tag], function(tagCheckErr, tagCheckResult, tagCheckFields) {
            
            if (tagCheckErr) {
                console.log('Tag Check Error', tagCheckErr);
                res.status(500).json({ message: 'Tag Check error', error: tagCheckErr });
            } 
            else {
    
                // No Tag exists
                if (tagCheckResult.length === 0) {
                    con.query('INSERT INTO `categories` (`category_id`, `tag`) VALUES(?, ?)', 
                        [uid, tag], function(err, result, fields){
                    
                            con.on('error', function(err){
                                console.log('[MySQL ERROR]', err);
                                res.json('Tag Register error', err);
                            });
    
    
                    con.query('SELECT * FROM categories', function(err, result, fields){
                        con.on('error', function(err){
                            console.log('error', err);
                            res.json('Debug error2', err);
                        });
                        console.log(result);
                        res.status(200).json({category_id : uid});
                    });
                })
                }
                // category exists
                else {
                    console.log("Category exists");
                    res.status(200).json({category_id : tagCheckResult[0].category_id});
                }
            }
        })
    });
}

module.exports.categories = categories