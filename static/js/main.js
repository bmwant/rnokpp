function fillDigits(number) {
  var strNumber = number.toString();
  for(var i = 0; i < strNumber.length; i++) {
    $("#digit-" + i).text(strNumber.charAt(i));
  }
}

function getCheckDigit(number) {
  var factors = [-1, 5, 7, 9, 4, 6, 10, 5, 7];
  var strNumber = number.toString();
  if(strNumber.length !== factors.length+1) return;
  var sumNumber = 0;
  for(var i = 0; i < factors.length; i++) {
    sumNumber += factors[i]*parseInt(strNumber[i]);
  }
  return sumNumber % 11 % 10;
}

function getBirthDate(number) {
  var strNumber = number.toString();
  var daysCount = parseInt(strNumber.substring(0, 5));
  console.info(daysCount, 'days count');
  // ISO 8601
  var startDate = moment('1899-12-31');
  return startDate.add(daysCount, 'days');
}

function getSex(number) {
  var strNumber = number.toString();
  var checkDigit = strNumber.charAt(8);
  if (checkDigit % 2) {
    return 'чоловіча';
  } else {
    return 'жіноча';
  }
}

function isCodeValid(number) {
  var strNumber = number.toString();
  var lastDigit = parseInt(strNumber.charAt(strNumber.length-1));
  return getCheckDigit(number) === lastDigit;
}

$(function() {
  $("#target-value").on('keyup', function() {
    var enteredValue = $(this).val();
    fillDigits(enteredValue);
    if(enteredValue.toString().length === 10) {
      if(!isCodeValid(enteredValue)) {
        $('#error-message').show();
      } else {
        $('#birthday').text(getBirthDate(enteredValue).format('D MMMM YYYY'));
        $("#sex").text(getSex(enteredValue));
      }
    }
  });
});
