$(document).ready(function() {
  $('textarea').on('input', () => {
    let $counter = 140;
    $counter -= $('textarea').val().length;
    $('.counter').val($counter);
  });

})