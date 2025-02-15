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
    });
  };
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
    $date['0'].innerHTML = timeago.format($date['0'].innerHTML);
    
    //create the headers two elements, then the header element
    const $leftHead = $('<div>');
    $leftHead.append($avatar, $username);
    const $header = $('<header class="user-info">');
    $header.append($leftHead, $userid);

    //create the footers two elements, then the footer element
    const $interactives = $('<div class="interactives">');
    $interactives.append($flag, $retweet, $heart);
    const $footer = $('<footer class="tweet-footer">');
    $footer.append($date, $interactives);

    //declare the container for the elements defined above to be appended to
    const $tweet = $('<article class="tweet">').addClass('tweet');
    
    //append all the items into the tweet
    $tweet.append($header, $tweetPost, $footer);
    return $tweet;
  };
  const renderTweets = function(tweets) {
    const $tweetContainer = $('.tweet-container');
    $tweetContainer.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    }
  };
  //create new tweets with a ajax request
  const $newTweet = $('form');
  $newTweet.submit(function(event) {
    event.preventDefault();
    const $counter = $(this).find('.counter');
    let counter = $counter.val();

    //an error calling funtion
    const errorEvent = function($errorMessage) {
      //build the error HTML
      const $errorText = $('<h2>Error! </h2>');
      const $errorBox = $('<div>').addClass("error");
      const $errorContainer = $('.error-container');
      $errorBox.append($errorText, $errorMessage);
      //attach the error box and slide it into view
      $errorBox.appendTo($errorContainer).hide().slideDown();
      //add a handle to use when removing the message
      $errorContainer.addClass("errorNow");
    };
    //determines if an errormessage should be shown and what it should say
    if (counter >= 140) {
      const $errorMessage = $('<h5>Please write something before you press submit!</5>');
      //call the error function
      errorEvent($errorMessage);
      return;
    }
    if (counter < 0) {
      const $errorMessage = $('<h5>Please use fewer characters win your tweet!</h2>');
      errorEvent($errorMessage);
      return;
    }
    //serailize the data and send it to /tweets to become a tweet
    const serializedData = $(this).serialize();
    $.post('/tweets', serializedData).then(loadTweets);

    //empty the text area and rest the counter val
    const $textArea = $(this).find('textarea');
    $textArea.val('');
    $counter.val(140)
  });
});