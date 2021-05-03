// Headline animation
var animationDelay = 2500;
animateHeadline(document.getElementById("main-header"));

function animateHeadline(headline) {
  setTimeout(function () {
    hideWord(headline.getElementsByClassName("is-visible")[0]);
  }, animationDelay);
}

function hideWord(word) {
  var nextWord = takeNext(word);
  switchWord(word, nextWord);
  setTimeout(function () {
    hideWord(nextWord);
  }, animationDelay);
}

function takeNext(word) {
  let nextWord = word.nextElementSibling;
  if (nextWord != null) return nextWord;
  else {
    return word.parentElement.firstElementChild;
  }
}

function switchWord(oldWord, newWord) {
  oldWord.className = "is-hidden";
  newWord.className = "is-visible";
}

function onNavClick(id) {
  document.getElementById(id).scrollIntoView();
}
