"use strict";
/******************************************************************************
 * Handling navbar clicks and updating navbar
 */
/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

// Write a function in nav.js that is called when users click
// that navbar link. Look at the other function names in that file 
// that do similar things and pick something descriptive and similar.
function navStoryClick(evt){
  console.debug('navStoryClick', evt);
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}
$navSubmit.on('click', navStoryClick);

function navFavoritesClick(evt){
  console.debug('navFavoritesClick', evt);
  hidePageComponents();
  favoriteOnPage();
}
$body.on('click', '#nav-control-favorites', navFavoritesClick);


function navMyStories(evt){
  console.debug('navMyStories', evt);
  hidePageComponents();
  newStoryOnThePage();
  $ownStories.show();
}
$body.on('click', '#nav-control-Mystories', navMyStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);


function navLoginSingupClick(evt){
  console.debug('navLoginSingupClick', evt);
  hidePageComponents();
  $userProfile.show();
}
$navUserProfile.on('click', navLoginSingupClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

