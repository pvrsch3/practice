const gifArea = ("#gif");
const searchInput = ("#search");

function addGif(res) {
    let numResults = res.data.length;
    if (numResults) {
        //random gifs multiple times submit form
      let randomIdx = Math.floor(Math.random() * numResults);
      //why this class?
      let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
      let $newGif = $("<img>", {
        src: res.data[randomIdx].images.original.url,
        class: "w-100"
      });
      $newCol.append($newGif);
      $gifArea.append($newCol);
    }
  }
  
  /* handle form submission: clear search box & make ajax call */
  // submit button
  $("form").on("submit", async function(evt) {
    evt.preventDefault();
  
    let searchTerm = $searchInput.val();
    $searchInput.val("");
  // when submit form, axios make request to giphy for info. get request
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
      params: {
        q: searchTerm,
        api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
      }
    });
    //graba gif from response data
    addGif(response.data);
  });
  
//    remove gif from the page 
  
  $("#remove").on("click", function() {
    //removes all gifs
    $gifArea.empty();
  });