//
// hardcoded for now.
//

var codetainerConfig = {
  Host: "http://localhost:3000",
  ImageId: 'lsof:latest',
  ProfileId: 'lsof',
};

var request = require('request');


function sendToCodetainer(id, command, cb) {
    var url = codetainerConfig.Host + '/api/v1/codetainer/' +id + '/send'; 
    request
    .post({ 
      url: url, 
      form: {
        'command': command,
      }
    }, function(err, httpResponse, body) {
      if (err) return cb(err);
      if (httpResponse.statusCode != 200) {
        console.log("invalid status code:", httpResponse, body)
        return cb('invalid status code: ' + httpResponse.statusCode + " " + body);
      }
      console.log("sent to codetainer", body);
      var data = JSON.parse(body);
      return cb(null, data);
    });
}


function getCodetainer(req, cb) {
  if (req.session['codetainer-id']) {
    cb(null, req.session['codetainer-id']);
  } else {
    var url = codetainerConfig.Host + '/api/v1/codetainer/';
    request
    .post({ 
      url: url, 
      form: {
        'name': req.session.id,
        'image-id': codetainerConfig.ImageId,
        'codetainer-config-id': codetainerConfig.ProfileId,
      }
    }, function(err, httpResponse, body) {
      if (err) return cb(err);
      if (httpResponse.statusCode != 200) {
        console.log("invalid status code:", httpResponse, body)
        return cb('invalid status code: ' + httpResponse.statusCode + " " + body);
      }
      console.log("created codetainer", body);
      var data = JSON.parse(body);
      req.session['codetainer-id'] = data.codetainer.id;
      return cb(null, req.session['codetainer-id']);
    });
  }
}


/*
 * GET home page.
 */
exports.index = function(req, res, next){

  getCodetainer(req, function(err, containerId) {
    if (err) {
      return next(err)
    }
    res.render('index', { 
      title: 'Express', 
      data_container_id: containerId,
    });
  })
};

exports.send = function(req, res, next) {
  var command = req.body.command;


  getCodetainer(req, function(err, containerId) {

    if (err) {
      return next(err)
    }

    sendToCodetainer(containerId, command, function(err, body) {
      if (err) {
        return next(err)
      }

      res.send({
        result: body
      }); 
    });
  });
}
