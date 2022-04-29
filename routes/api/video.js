var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Created = require('../../models/Created.js');
var Metadata = require('../../models/Metadata.js');


/* GET ALL Metadata */
router.get('/', async function(req, res, next) {
  
  // const identifiers = await Created.find().populate("videoID");
  // console.log("> All Identifiers\n", identifiers);

  // Created.find().populate("videoID")
  // .then( p => {
  //   res.json(p);
  // })
  // .catch( err => {
  //   res.json(err);
  // })
  // res.json(datas);
});

/* SAVE Report */
router.post('/', function(req, res, next) {
  const new_metadata = new Metadata({
    videoSize: req.body.videoSize,
    viewerCount: req.body.viewerCount,
  });
  new_metadata.save();

  const createdData = { createdBy: req.body.username, videoID: new_metadata };
  Created.create(createdData, function (er, p) {
    if (er) return next(er);
    res.json(p)
  });
});

module.exports = router;