'use strict';

const apiKey = 'PUBdaeTi76jawwrtS0wJrCNQhEb59H9slyuoHqOQ';
const searchURL = 'https://developer.nps.gov/api/v1';



const formatQueryParams = function(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${endcodeURIComponent(params[key])}`);
  return queryItems.join('&');
};

const displayResults = function(responseJson) {
  // if there are previous results, remove them
  // console.log(responseJson);
  $('#results-list').empty();
  // iterate thru the items array
  for (let i = 0; i < responseJson.data.length; i++) {
    let park = responseJson.data[i];
    // for each park object in the items
    // array, add a list item to the results
    // list with fullName, description, url
    $('#results-list').append(` 
      <li><h3>${park.name}</h3>
      <p>${park.description}</p>
      <p><a href="${park.url}">${park.url}</a></p>
      </li> 
      `);
    // display the results section
    $('#results').removeClass('hidden');
  }
};


// Extract data to be used on page
// @param data - the JSON data

const getParkData = function(query, maxResults=10) {
  const params = {
    api_Key: apiKey,
    limit: maxResults,
    stateCode: query,
  };
  
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;


  // console.log(url);

  // fetch url
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#js-error-message').text('Oops something went wrong: ${error.message}');
    });
};



// function to watch form
const watchForm = function() {
  $('form').submit(event => {
    event.preventDefault();
    const state = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    // function to get search results with params
    getParkData(state, maxResults);
  });
};

$(watchForm);