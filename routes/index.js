//
// hardcoded for now.
//

var codetainerConfig = {
  Host: "http://localhost:3000",
  ImageId: 'lsof:latest',
  ProfileId: 'secure',
};

var request = require('request');

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
      console.log("XXX", body);
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
    res.render('index', { title: 'Express', data_container_id: containerId });
  })
};
