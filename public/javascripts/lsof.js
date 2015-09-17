$(function() {

  $('#terminal').codetainer({
     terminalOnly: true,
     url: "http://127.0.0.1:3000",
     container: "word",
     width: "100%",
     height: "100%",
  });

  function sendToCodetainer(command, cb) {
    $.ajax({
      type: 'POST',
      url: '/send',
      data: { 
        command: command,
      }
    })
    .done(function(data){
      cb(null, data) 
    })
    .error(function(err) {
      cb(err);
    }); 
  };

  function styleBold(item) {
    $(item).addClass('selected-lesson');
    $(item).removeClass('unselected-lesson');
  }

  function styleLink(item) {
    $(item).removeClass('selected-lesson');
    $(item).addClass('unselected-lesson');
  }

  function show(item) {
    $(item).addClass('visible-lesson');
    $(item).removeClass('hidden-lesson');
  }

  function hide(item) {
    $(item).removeClass('visible-lesson');
    $(item).addClass('hidden-lesson');
  }

  function selectLesson(id) {
    $('ol.secondary li').each(function(_, item) {
      var itemId = $(item).attr('data-id');
      if (id == itemId) {
          styleBold(item);
      } else {
          styleLink(item);
      }
    });

    $('.selected-lesson').off();
    $('.unselected-lesson').on('click', function(e) {
      var itemId = $(this).attr('data-id'); 
      selectLesson(itemId);
    });

    $('.lesson-body').each(function(_, item) {
       var itemId = $(item).attr('data-id');
      if (id == itemId) {
          show(item);
      } else {
          hide(item);
      }
    });
  }

  $('.next').on('click', function(e) {
    var parent = $(this).parents('.lesson-body');
    var itemId = parent.attr('data-id');

    selectLesson(parseInt(itemId) + 1);
  });

  $('.prev').on('click', function(e) {
    var parent = $(this).parents('.lesson-body');
    var itemId = parent.attr('data-id');

    selectLesson(parseInt(itemId) - 1);
  });

   $('button.clear').on('click', function(e) {
     var command = 'clear\n'; 
     sendToCodetainer(command, function(err, body) {});
  });

  $('button.command').on('click', function(e) {
     var command = $(this).attr('data-command');

     var sendNewline = $(this).attr('data-command-newline');

     if (sendNewline) {
        command += '\n';
     }
    
     sendToCodetainer(command, function(err, body) {
      console.log("XXX SEND TO CODETAINER RETURNED", err, body);
     });
  });

  selectLesson(1);
    console.log("WTF ")

});
