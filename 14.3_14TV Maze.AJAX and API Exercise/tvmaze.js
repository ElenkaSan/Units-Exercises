// /** Given a query string, return array of matching shows:
//  *     { id, name, summary, episodesUrl }
//  */
// /** Search Shows
//  *    - given a search term, search for tv shows that
//  *      match that query.  The function is async show it
//  *       will be returning a promise. *
//  *   - Returns an array of objects. Each object should include
//  *     following show information:
//  *    {
//         id: <show id>,
//         name: <show name>,
//         summary: <show summary>,
//         image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
//       }
//  */
async function searchShows(query) {  
  //   // TODO: Make an ajax request to the searchShows api.  Remove
  //   // hard coded data.
  let $searthTerm = $(await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`));
  let shows = $searthTerm[0].data;
  return shows.map(function(result) {
    return {
        id: result.show.id,
        name: result.show.name,
        summary: result.show.summary,
        image: result.show.image ? result.show.image.medium : 'https://tinyurl.com/tv-missing',
    }
  })
}
// /** Populate shows list:
//  *     - given list of shows, add shows to DOM
//  */
function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();
  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top" src="${show.image}" alt="Image from ${show.name}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <div class="d-grid">
              <button type= "button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Episodes</button>
             </div>
           </div>
         </div>
       </div>
      `);
    $showsList.append($item);
  }
}
// /** Handle search form submission:
//  *    - hide episodes area
//  *    - get list of matching shows and show in shows list
//  */
$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();
  let query = $("#search-query").val();
  if (!query) return;
  $("#episodes-area").hide();
  let shows = await searchShows(query);
  populateShows(shows);
})
// /** Given a show ID, return list of episodes:
//  *      { id, name, season, number }
//  */
 async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
        // you can get this by making GET request to
        // http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  let $searthTerm = $(await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`));
  return ($searthTerm[0].data.map(function(episode) {
    return {
        id: episode.id,
        name: episode.name,
        season: episode.season,
        number: episode.number        
    }
  }))
  // TODO: return array-of-episode-info, as described in docstring above
 }
async function populateEpisodes(episodeObj) {
  const $episodesList = $("#episodes-list");
  $episodesList.empty();
  for (let episode of episodeObj){
    let $aboutEps = $(`<li>${episode.name}:
                      <br><i>Season</i> ${episode.season} <i>Episode</i> ${episode.number}</li>`);
    $episodesList.append($aboutEps);
  }
}

$('#shows-list').on('click','button', async function episodeRequest (evt){
  evt.preventDefault();
  $("#episodes-area").show();
  let showId = $(evt.target);
  let Id = showId.closest(".Show").data("show-id");
  let $episodes = $(await getEpisodes(Id));
  populateEpisodes($episodes);
})

$(document).on('click', function(evt) {
  $(evt.target).closest ('li').toggleClass('color');
})