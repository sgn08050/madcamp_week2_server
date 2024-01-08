
function getAllMembers(app, con){

    app.get('/members/all', (req, res) => {
        con.query('SELECT id FROM members', (err, results) => {
            if(err) {
                res.status(500).send('Error Selecting Members')
            }
            else{
                res.json(results)
            }
        })
    })
}

module.exports.getAllMembers = getAllMembers