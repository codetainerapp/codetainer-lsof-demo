$(function() {
  // $('#terminal').attr('data-container', 'c083f1a3a08791c1ae831db48ed87983c2ab44628de0b94495a926084f216521');
  $('#terminal').codetainer({
     terminalOnly: true,
     url: "http://127.0.0.1:3000",
     container: "word",
     width: "100%",
     height: "448px"
  });
});
