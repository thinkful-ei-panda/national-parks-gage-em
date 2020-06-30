
const apikey = 'PUBdaeTi76jawwrtS0wJrCNQhEb59H9slyuoHqOQ';
//const searchURL = 'https://developer.nps.gov/api/v1/parks';

 
 
function template(call){
  const arr =[];
  console.log('works');
  call.data.map(park =>{
    arr.push(`
            <li>
                <h2>${park.fullName}</h2>
                <a href="${park.url}">${park.url}</a>
                <p>${park.description}</p>
            </li>`);
  }
  );
  $('#results-list').html(arr.join(''));
} 
 
function parkReserver(q,l){
 
  fetch(`https://developer.nps.gov/api/v1/parks?q=${q}&limit=${l}&api_key=${apikey}`)
    .then(response =>{
      if (response.ok){
        console.log('works');
        return response.json();
      }
      throw new console.error('woops');
        
    })
    .then(jsonData => {
      template(jsonData);
    })
    .catch(e => console.log(e));
} 

const onClick =()=> {
  $('.national-park-search').submit( (e) => {
    e.preventDefault();
    console.log('works');
    const q = $('#national-park-name').val();
    const l = $('#d-count').val();
    parkReserver(q,l);
  })
}
 
function watchForm() {
  onClick();
  // $('#go').submit(e =>{
  //   e.preventDefault;
  //   console.log('works');
  //   const q = $('#national-park-name').val();
  //   const l = $('#d-count').val();
  //   parkReserver(q,l);
    
  // });
}
 
 
 
$(watchForm);
