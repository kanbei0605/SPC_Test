var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Created = require('../../models/Created.js');
var Metadata = require('../../models/Metadata.js');


/* GET ALL Metadata */
router.get('/', async function(req, res, next) {
  Created.find().populate("videoID")
  .then( p => {
    res.json(p);
  })
  .catch( err => {
    res.json(err);
  })
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

/* GET total video size */
router.get('/gettotal/:name', async function(req, res, next) {
  Created.find({'createdBy': req.params.name}).populate("videoID")
  .then( p => {
    let totalSize = 0;
    p.map((val, index) => {
      console.log(val);
      totalSize += val.videoID.videoSize;
      return;
    })
    if( p.length !== 0) {
      res.json({
        status: "success",
        msg: "sucess get video total size by username",
        totalSize: totalSize,
      });
    }
    else {
      res.json({
        status: "fail",
        msg: "Not found video",
        totalSize: totalSize,
      });
    }
  })
  .catch( err => {
    res.json({
      status: "fail",
      msg: "fail get video total size by username",
      err: err
    });
  })
});

/* Update video data */
router.patch('/', async function(req, res, next) {
  Metadata.findById(req.body.searchVideoID)
  .then( p => {
      p.videoSize = req.body.newSize;
      p.viewerCount = req.body.newCount;
      p.save();
      res.json({
        status: "success",
        msg: "sucess get video total size by username",
        data : p,
      });
  })
  .catch( err => {
    res.json({
      status: "fail",
      msg: "failed update video metadata",
      err: err
    });
  })
});

module.exports = router;