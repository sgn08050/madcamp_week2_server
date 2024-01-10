function getAllGroups(app, con) {
    app.post('/groups/all', (req, res) => {
        var post_data = req.body;
        var member_id = post_data.member_id;

        var query = `
            SELECT 
                agmp.member_id,
                agmp.assetsgroup_id,
                ag.assetsgroupname,
                ag.assetsgroupgoal,
                agmp.targetasset,
                agmp.currentasset
            FROM 
                assetsgroupmemberpair agmp
            JOIN 
                assetsgroups ag ON agmp.assetsgroup_id = ag.assetsgroup_id
            WHERE 
                agmp.member_id = ?
        `;

        con.query(query, [member_id], (err, results) => {
            if (err) {
                res.status(500).send('Error Selecting Members');
            } else {
                res.json(results);
            }
        });
    });
}

module.exports.getAllGroups = getAllGroups;