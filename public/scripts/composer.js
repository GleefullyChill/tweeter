$(() => {
  //Remove error message if error no longer applies
  $('textarea').on('input', function() {
    const $errorContainer = $('.error-container');
    let textLength = $(this).val().length;
    //added errorNow class to error-container after error slideDown occurred
    if ($errorContainer.hasClass("errorNow")) {
      const $counter = $(this).parent().find('.counter');
      const $error = $('.error');
      //check if error still applies
      if ($counter.val() >= 0 && textLength > 0) {
        //slideUp occurs and errorNow class is removed
        $error.slideUp("normal", function() {
          $(this).remove();
          $errorContainer.removeClass("errorNow");
        });
      }
    }
  });
  //New tweet form starts toggled
  $('.new-tweet').hide();
  //Write a New Tweet toggles the hidden form for a new tweet
  $('.toggle-switch').on('click', function() {
    const $newTweet = $('.new-tweet');
    $newTweet.slideToggle();
    //be sure you clear the textarea when toggling, so it's always "new" then focus on the text Area
    $textArea = $('textArea');
    $textArea.val('');
    $textArea.focus();
    //get rid of any error messages when the form it's attached to disappears
    const $error = $('.error');
    const $errorContainer = $('.error-container');
    $error.slideUp("normal", function() {
      $(this).remove();
      $errorContainer.removeClass("errorNow");
    });
  });
  //scroll function
  // will return you to the top
  $(window).scroll(function() {
    const $body = $('body');
    if (!$body.hasClass('scroll-return-button') && window.scrollY > 170) {

      //make the button
      const $scroll = $('<i class="fas fa-angle-double-up"></i>');
      const $platform = $('<i class="fas fa-circle"></i>');
      //append to make the styling easier
      $platform.append($scroll);
      //add to index.html via the body
      $body.append($platform).addClass('scroll-return-button');
      //add the click function
      $($platform).click(function() {
        //scroll to top of screen open
        $(window).scrollTop(0);
        //open the form if hidden
        const $newTweet = $('.new-tweet');
        if ($newTweet.is(':hidden')) {
          $newTweet.slideToggle();
          $textArea = $('textArea');
          $textArea.val('');
        }
        //add focus to textarea
        $textArea.focus();
        //remove scroll platform from the body
        $(this).remove();
        $body.removeClass('scroll-return-button');
      });
    }
    //remove button and class if you return to the top by scrolling
    if ($body.hasClass('scroll-return-button') && window.scrollY <= 160) {
      $('.fa-circle').remove();
      $body.removeClass('scroll-return-button');
    }
  });
  
});