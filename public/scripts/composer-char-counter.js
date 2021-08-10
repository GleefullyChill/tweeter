$(document).ready(function() {
  //on input function to reduce counter based on the amount of characters in the text field
  $('textarea').on('input', function() {
    let sum = 140;
    //assign the counter to a variable
    let $counter = $(this).parent().find('.counter');
    //reduce the text field current chracter length
    sum -= $(this).val().length;
    //push the sum into the value of the counter
    $counter.val(sum);
    //if the value of the counter is less than 0 turn the text red, return it to base color if it goes back to 0 or more
    if (sum < 0) {
      $counter.addClass('negNum')
    }
    if (sum >= 0) {
      $counter.removeClass('negNum')
    }
  });

})