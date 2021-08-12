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
  $.get("./lib/data-helpers.js", (response) => {
    renderTweets();
    console.log(response)
   })
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
    const $flag = $('<div class="interactive"><i class="fas fa-flag">');
    const $retweet = $('<div class="interactive"><i class="fas fa-retweet">');
    const $heart = $('<div class="interactive"><i class="fas fa-heart">');

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
  renderTweets(data)
  const $newTweet = $('form');
  $newTweet.submit(function(event) {
    event.preventDefault();
    console.log($(this))
    const serializedData = $(this).serialize();
    console.log(serializedData)
    $.post('/tweets', serializedData).then(renderTweets);

  })
})
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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