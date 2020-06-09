
const apikey = 'PUBdaeTi76jawwrtS0wJrCNQhEb59H9slyuoHqOQ';
const searchURL = 'https://developer.nps.gov/api/v1/parks';
//date->fullname->discretion
 
 
 
 
function parkReserver(){
 
 
  fetch(`https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=${apikey}`)
    .then(response =>{
      if (response.ok){
        return response.json();
      }
      throw new console.error('woops');
        
    })
    .then(jsonData => {
      extractData(jsonData);
    })
    .catch(e => console.log(e));
} 
 
/** 
* @param {string} fullname
* @param {URL} html_url
* @param {string} description
* @param {date} the JSON data
*/
 
const getParks = function(data){
  data.forEach(park => {
    let{
      fullname,
      url,
      description
    } = park;
    
    

            
    $('results-list').append(template(fullname,url,description));
  }
  );
    
};
 
function template(fullname, url, description){
  let t = `
            <li>
                <h2>${fullname}</h2>
                <a href="${url}">${url}</a>
                <p>${description}</p>
            </li>`;
  return t; 
}
 
 
 
 
function watchForm() {
  $('form').submit(e =>{
    e.preventDefault;

        
  });
}
 
 
 
$(watchForm);
