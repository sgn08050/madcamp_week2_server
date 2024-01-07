

function createDatabase(tableName, createQuery, con){

    // Check database existence and if exists, create table.
    const checkTableExistsQuery = 'SHOW TABLES LIKE \'' + tableName + '\'';

    con.query(checkTableExistsQuery, function(err, results, fields) {
        if(err){
            console.error("Error checking table existence.");
            return;
        }
        if(results.length == 0){     
            con.query(createQuery, function (create_err, create_results, create_fields) {
            if (create_err) {
                console.log(create_err);
            }
            console.log("Table make succeeds");
            });
        }
    }); 
}


function createIndex(checkQuery, indexQuery, con){

    con.query(checkQuery, function(err, results, fields) {
        if(err){
            return;
        }
        if(results.length == 0){     
            con.query(indexQuery, function (create_err, create_results, create_fields) {
            if (create_err) {
                console.log(create_err);
            }
            });
        }
        else{
        }
    }); 
}

module.exports.createDatabase = createDatabase
module.exports.createIndex = createIndex