const submit = document.getElementById('button');
const destination = document.getElementById('destination');
const input = document.getElementById('city');
const container = document.getElementsByClassName('container')[0];
const form = document.getElementsByClassName('input-form')[0];
const venuesDiv = document.getElementById('venues');

// Foursquare API Info
const clientId = '4BWCLT03DSVEW3SDJZTILC3KF3OW1A21FDLAQVJ4E10BX1UH';
const clientSecret = 'AOUL5A1XBB0PUDESPXPMJDMJH34P3PMV3RL0AZF5SIWRERK5';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// Fetch Venue Data
const getVenues = async () => {
  const city = input.value;
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20190113`;
  const response = await fetch(urlToFetch);


  if(response.ok) {
    const json = await response.json();
    const venues = json.response.groups[0];

    return venues;
  }
  throw new Error('Request Failed!');
}

const renderVenue = (venues) => {
  const venueArray = venues.items;

  venueArray.forEach(item => {
    let venueHTML = `
      <h3>${item.venue.name}</h3>
      <p>Here's a paragraph</p>
    `;
    let venueDiv = document.createElement('div');
    venueDiv.className = 'venue';
    venueDiv.innerHTML = venueHTML;

    venuesDiv.appendChild(venueDiv);
    console.log(venueDiv);
  });
}

submit.addEventListener('click', () => {
  const city = input.value;

  container.style.visibility = 'visible';
  destination.innerHTML = `<h2>${city}</h2>`;
  venuesDiv.innerHTML = '';

  getVenues().then(venues => renderVenue(venues));
  return false;
});


input.addEventListener('keydown', (key) => {
  if (key.keyCode === 13) {
    key.preventDefault();

    const city = input.value;
    console.log(city);

    container.style.visibility = 'visible';
    destination.innerHTML = `<h2>${city}</h2>`;
    venuesDiv.innerHTML = '';

    getVenues().then(venues => renderVenue(venues));
  }
});
