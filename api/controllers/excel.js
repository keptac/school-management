var cv_json = require('convert-json');
var async = require('async');

var MongoClient = require('mongodb').MongoClient; //require mongodb 

MongoClient.connect('mongodb://127.0.0.1/ee', function (err, db) {

    if (err) throw err;

    var collection = db.collection('csvdata');

    var queue = async.queue(collection.insert.bind(collection), 200);

    console.time("queryTime"); //time start

    cv_json({
        // now supporting csv, xls, xlsx, xml format
        input: '/home/local/ASSYST-COC/sobharani/Desktop/JSONto.csv',
        output: null
    }, function (err, result) {
        if (err) {
            console.error(err);
        } else {


            queue.push(result, function (err, res) {

                if (err) throw err;

            });
        }

    });

    queue.drain = function () {
        console.log('all items have been processed');
        console.timeEnd("queryTime"); //end time    
        db.close();
    }

    console.timeEnd("queryTime"); //end time        
});