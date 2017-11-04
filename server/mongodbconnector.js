var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var moment =require( 'moment');
var url = 'mongodb://localhost:27017/eventmanagement';

var dbconnector=module.exports={
    connectMongodb: function()
{
    MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    db.close();
});
},

 insertDocument: function (temp,db, callback) {
        db.collection('Events').insertOne(
          temp
          /*  id: 3,
            title: "event3",
            start: moment().add(-1, "days"),
            end: moment().add(1, "days"),
            allDay: true*/
        , function (err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the events collection.");
            callback();
        });
    }
,
    insertEvent:function(temp)
    {
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            dbconnector.insertDocument(temp,db, function () {
                db.close();
            });
        });
    }
  
}
