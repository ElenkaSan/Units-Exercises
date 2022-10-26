"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

////add a favorite parameter

function generateStoryMarkup(story, deleteButton = false, isFavorite = true) {
  // console.debug("generateStoryMarkup", story);
  let showDeleteIcon = deleteButton ? removeHTMLbtn() : '';
  let showStarIcon = isFavorite ? favoriteNotStoryHTML(story, currentUser) : ''

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        ${showDeleteIcon}
        ${showStarIcon}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function removeHTMLbtn(){
  return `
    <span class="trash-can">
     <i class="fas fa-trash-alt"></i>
    </span>`;
}

function favoriteNotStoryHTML(story, user){
  const star = user.isUserFavorite(story) ? 'fas' : 'far';
  return `
      <span class="star">
       <i class="${star} fa-star"></i>
      </span>`;
}

async function deleteStory(evt){
  console.debug('deleteStory');
  const storyId = $(evt.target).closest('li').attr('id');

  await storyList.removeStory(currentUser, storyId);
  await newStoryOnThePage();
}
$ownStories.on('click', '.trash-can', deleteStory);


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// 
// Write a function in stories.js that is called when users submit the form. 
// Pick a good name for it. This function should get the data from the form, 
// call the .addStory method you wrote, and then put that new story on the page.
async function submitStoryForm(evt){
  console.debug('submitStoryForm');
  evt.preventDefault();
  const author = $('#MakeAuthor').val();
  const title = $('#MakeTitle').val();
  const url = $('#MakeUrl').val();
  
  const username = currentUser.username;
  const storyData = {username, title, author, url};
  const story = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  $submitForm.slideUp('slow');
  $submitForm.trigger('reset');
}
$submitForm.on('submit', submitStoryForm);


function newStoryOnThePage(){
  console.debug('newStoryOnThePage');
  $ownStories.empty();
  if (currentUser.ownStories.length === 0){
    $ownStories.append('<h4>No stories here.</h4>');
  } else {
    for (let story of currentUser.ownStories){
      let isFav = currentUser.isUserFavorite(story);

      let $story = generateStoryMarkup(story, true, isFav);
      $ownStories.append($story);
    }
  }
  $ownStories.show();
}
// Allow logged in users to “favorite” and “un-favorite” a story.
// These stories should remain favorited when the page refreshes.
// Allow logged in users to see a separate list of favorited stories.
// The methods for adding and removing favorite status on a story 
// should be defined in the User class.

function favoriteOnPage(){
  console.debug('favoriteOnPage');
  $favorite.empty();
  if (currentUser.favorites.length === 0) {
    $favorite.append('<h4>No favorites added.</h4>');
  } else {
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favorite.append($story);
    }
  }
  $favorite.show();
}

async function changeFavoriteStory(evt){
  console.debug('changeFavoriteStory');
  const $closestLi = $(evt.target).closest('li');
  const storyId = $closestLi.attr('id');
  const story = storyList.stories.find(s => s.storyId === storyId);

  if ($(evt.target).hasClass('fas')) {
    await currentUser.unFavorite(story);
    $(evt.target).closest('i').toggleClass('fas far');
  } else {
    await currentUser.addingFavorite(story);
    $(evt.target).closest('i').toggleClass('fas far');
  }
}
$storiesLists.on('click', '.star', changeFavoriteStory);
