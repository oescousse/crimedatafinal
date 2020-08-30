const express = require('express');
const app = express();
var AWS = require("aws-sdk");
const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: true }));

AWS.config.update({
  region: "us-east-1",
  //endpoint: "http://localhost:3000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "CrimeData";
app.get('/', function(req, res, next) {
    console.log("Getting item")
    var hash = req.query.hashKey
    var range = req.query.rangeKey
    var g = {
        TableName: table,
        Key: {
            "hashKey": Number(hash),
            "rangeKey": String(range)
        },
    }
    docClient.get(g, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        }
    })
    res.send(JSON.stringify());
});

app.post('/radiusQuery', function(req, res, next){
    var lat = req.body.lat;
    var long = req.body.long;
    const ddbGeo = require('dynamodb-geo');
    const AWS = require('aws-sdk');
    require('dotenv').config()

    // Set up AWS
    AWS.config.update({
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
        region: 'us-east-1'
    });

    // Use a local DB for the example.
    const ddb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('https://dynamodb.us-east-1.amazonaws.com') });

    // Configuration for a new instance of a GeoDataManager. Each GeoDataManager instance represents a table
    const config = new ddbGeo.GeoDataManagerConfiguration(ddb, 'CrimeData');

    // Instantiate the table manager
    const tableManager = new ddbGeo.GeoDataManager(config);

    console.log('Querying by radius, looking 1mile from Cambridge, UK.');
    tableManager.queryRadius({
        RadiusInMeter: 1600.34,
        CenterPoint: {
            latitude: lat,
            longitude: long
        }
    }).then(results => {
        res.send(JSON.stringify(results));
    })
    .catch(console.warn)
});

app.post('/', function(req, res) {
    var p = {
        TableName: table,
        Item: {
            "hashKey": Number(req.query.hashKey),
            "rangeKey": String(req.query.rangeKey),
            "IncidentCategory": String(req.query.IncidentCategory),
            "IncidentDescription": String(req.query.IncidentDescription),
            "IncidentSubcategory": String(req.query.IncidentSubcategory),
            //"geoJSON": {"type":"POINT","coordinates":[Number(req.query.geoJSON)]},
            "geohash": Number(req.query.geohash)
        }
    }
    docClient.put(p, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    })
    res.send('successfully added item');
});



app.put('/', function(req, res) {
    console.log("Updating the item...");
    var u = {
        TableName: table,
        Key: {
            "hashKey": Number(req.query.hashKey),
            "rangeKey": String(req.query.rangeKey)
        },
        UpdateExpression: "set IncidentCategory = :c, IncidentDescription=:d, IncidentSubcategory=:s, geoJSON=:j, geohash=:g",
        ExpressionAttributeValues:{
        ":i":String(req.query.IncidentCategory),
        ":c":String(req.query.IncidentCategory),
        ":d":String(req.query.IncidentDescription),
        ":s":String(req.query.IncidentSubcategory),
        ":j":String(req.query.geoJSON),
        ":g":Number(req.query.geohash)

    },
        ReturnValues:"UPDATED_NEW"
    }
    docClient.update(u, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    })
    res.send('successfully updated item');
});

app.delete('/', function(req, res) {
    console.log("Attempting a delete");
    var hash = req.query.hashKey
    var range = req.query.rangeKey
    var d = {
        TableName: table,
        Key: {
            "hashKey": Number(hash),
            "rangeKey": String(range)
        },
    }
    docClient.delete(d, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        }
    })
    res.send('successfully deleted item');
});


app.listen(3000,()=> {
    console.log(`Example web server is listening on localhost:3000`)
})
