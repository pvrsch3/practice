"use strict";

const URL = "http://api.tvmaze.com/";
const MISSING_IMG = "https://tinyurl.com/missing-tv"

const $showsList = $("#shows-list");
const $episodesList = $("#episodesList");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

//instead of axios.get('url') format ,
//is it v this format bc request in axios method?
// axios({
 // method:
 // url:
//})
//searchShows
async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
   const res = await axios({
    method: 'GET',
    url:`${URL}search/shows?q=${term}`
   });
   //returns promise array, map creates new array called result
   //declare each show with result array
   //,data returns a js object 
   //returns each show object w/ params 
   //default image if no image url to show
   return res.data.map(result => {
    const show = result.show;
     return {
      id: show.id,
      name: show.name,
      summary: show.summary,
      image: show.image ? show.image : MISSING_IMG
     };
  });
}



/** Given list of shows, create markup for each and to DOM */

//passed-in shows
function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      //add img to result object 
      //show image
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media"> 
           <img src="${show.image}" alt="${show.name}" class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.**/

//ties searchForShow and populateShows together

//why is it searchForm-term ?
async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);
  //^ gets search terms and gets shows and filld DOM wiht populateShows
  // Hide episodes area 
  $episodesArea.hide();
  populateShows(shows);
}
//that only gets ^ shown if they ask for episodes
$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

//getEpisodes
async function getEpisodesOfShow(id) { 
  const res = await axios({
    method: 'GET',
    url: `${URL}shows/${id}/episodes`
  });
 //return promise array
 //ep is the episodes
  return res.data.map(ep => ({
    id:  ep.id,
    name: ep.name,
    season: ep.season,
    number: ep.number
  }))
}

/** Write a clear docstring for this function... */
// <li>Pilot (season 1, number 1)</li>. format

function populateEpisodes(episodes) { 
  $episodesList.empty();

  for(let episode of episodes) {
  const $list = $(
    `<li>
     ${episode.name}
     (season ${episode.season}, number ${episode.number})
   </li>
  `);

$episodesList.append($list);
}

$episodesArea.show();
}



//Handle click 
//get the ID of the show: search "closest" ancestor
  // with the class of .Show (which is put onto the enclosing div, which
  // has the .data-show-id attribute).

//where is the Show class from?  populateShows func
//Where is the show-id attribute from? populateShows func
//why evt ?
async function getEpisodesAndShowId(evt) {
//evt in function target the closest .Show and the show-id is the data??
  const showId = $(evt.target).closest(".Show").data("show-id");
  //use your getEpisodes and populateEpisodes functions.
  const episodes = await getEpisodesOfShow(showId);
  populateEpisodes(episodes);
}

//Add a click handler that listens for clicks on those buttons.
$showsList.on("click", ".Show-getEpisodes", getEpisodesAndShowId);


