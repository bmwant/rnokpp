TOTAL_DIGITS_IN_CODE = 10;

function fillDigits(number) {
  var strNumber = number.toString();
  for(var i = 0; i < TOTAL_DIGITS_IN_CODE; i++) {
    var value =  i < strNumber.length ? strNumber.charAt(i) : '&nbsp;';
    $("#digit-" + i).html(value);
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

var colors = {
  'default': '#ebf2fa',
  'first': '#b490f5',
  'second': '#4894f0',
  'third': '#18d2ba',
  'fourth': '#1add9f'
};

$(function() {
  $("#target-value").on('keyup', function() {
    var enteredValue = $(this).val();
    fillDigits(enteredValue);
    $('#info-message').hide();
    $('#error-message').hide();
    if(enteredValue.toString().length === TOTAL_DIGITS_IN_CODE) {
      if(!isCodeValid(enteredValue)) {
        $('#error-message').show();
        $('#digit-9').removeClass('siimple-alert--green').addClass('siimple-alert--red');
      } else {
        $('#info-message').show();
        $('#birthday').text(getBirthDate(enteredValue).format('D MMMM YYYY'));
        $("#sex").text(getSex(enteredValue));
        $('#digit-9').removeClass('siimple-alert--red').addClass('siimple-alert--green');
      }
    }
  });

  $('.digit').mouseenter(function() {
    var section = $(this).data('section');
    var sectionColor = $(this).css('background-color');
    var sectionHint = $('#' + section + '-section-tooltip');
    sectionHint
      .css('background-color', colors[section])
      .addClass('highlighted-text');
  }).mouseleave(function() {
    var section = $(this).data('section');
    var sectionHint = $('#' + section + '-section-tooltip');
    sectionHint
      .css('background-color', colors['default'])
      .removeClass('highlighted-text');
  });
});
