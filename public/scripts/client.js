/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//const $tweet = $(`<article class="tweet">Hello world</article>`);
//forcing stuff into the tweet container
//need a photo, username, userid in the header
//in "tweet-post", put the content
//and put the date into "date"
//need to add the interactives, separately
$(() => {
  //get the pre-made posts, as if others tweets are there to start you off
  const loadTweets = function() {
    $.get("/tweets", (response) => {
      renderTweets(response);
    })
  }
  loadTweets();
   
  //create the elements with the tweet and then append them to the tweet-container
  const createTweetElement = function(tweet) {
    //get the link within the avatars
    //const link = $('<a>').html(tweet.user.avatars)['0'].innerHTML;
    const $avatar = $(`<img class="avatar">`).attr("src", tweet.user.avatars);
    const $username = $('<output class="username">').text(tweet.user.name);
    const $userid = $('<section class="user-id">').text(tweet.user.handle);
    const $tweetPost = $('<article class="tweet-post">').text(tweet.content.text);
    const $date = $('<section class="date">').text(tweet.created_at);
    //declare the interacitves attached to elements with interactives class
    const $flag = $('<div class="interactive"><i class="fas fa-flag"></div>');
    const $retweet = $('<div class="interactive"><i class="fas fa-retweet"></div>');
    const $heart = $('<div class="interactive"><i class="fas fa-heart"></div>');

    //format the date
    $date['0'].innerHTML = timeago.format($date['0'].innerHTML)
    
    //create the headers two elements, then the header element
    const $leftHead = $('<div>');
    $leftHead.append($avatar, $username);
    const $header = $('<header class="user-info">');
    $header.append($leftHead, $userid);

    //create the footers two elements, then the footer element
    const $interactives = $('<div class="interactives">');
    $interactives.append($flag, $retweet, $heart)
    const $footer = $('<footer class="tweet-footer">');
    $footer.append($date, $interactives)

    //declare the container for the elements defined above to be appended to
    const $tweet = $('<article class="tweet">').addClass('tweet');
    
    //append all the items into the tweet
    $tweet.append($header, $tweetPost, $footer);
    return $tweet;
  }
  const renderTweets = function(tweets) {
    const $tweetContainer = $('.tweet-container');
    $tweetContainer.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    }
  }

  //create new tweets with a azax request
  const $newTweet = $('form');
  $newTweet.submit(function(event) {
    event.preventDefault();
    let $counter = $(this).find('.counter')
    $counter = $counter.val();
    //attempt to put .error-container into an errorEvent
    
    const errorEvent = function($errorMessage) {
      const $errorText = $('<h2>Error! </h2>')
      const $errorBox = $('<header>').addClass("error");
      const $errorContainer = $('.error-container');
      $errorBox.append($errorText, $errorMessage)
      $errorBox.appendTo($errorContainer).hide().slideDown()
      $errorContainer.addClass("errorNow")
    }
    //put these into a callback function with the message as a parameter
    if ($counter >= 140) {
      const $errorMessage = $('<h5>Please write something before you press submit!</5>')
      //call the error function
      errorEvent($errorMessage)
      return;
    }
    if ($counter < 0) {
      const $errorMessage = $('<h5>Please use fewer characters win your tweet!</h2>')
      errorEvent($errorMessage)
      return;
    }

    const serializedData = $(this).serialize();
    console.log(serializedData)
    //$.post('/tweets', serializedData).then(renderTweets);

  })
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
          $errorContainer.removeClass("errorNow")
        })
      }
    }
  })
})

// Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }



// Test / driver code (temporary)
 // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.