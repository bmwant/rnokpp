function fillDigits(number) {
  var str = number.toString();
  for(var i = 0; i < str.length; i++) {
    $("#digit-" + i).text(str.charAt(i));
  }
}

$(function() {
  $("#target-value").on('keyup', function() {
    console.log($(this).val());
    fillDigits($(this).val());
  });
});
