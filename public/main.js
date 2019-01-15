const submit = document.getElementById('button');
const destination = document.getElementById('destination');
const input = document.getElementById('city');
const container = document.getElementsByClassName('container')[0];

// Foursquare API Info
const clientId = '4BWCLT03DSVEW3SDJZTILC3KF3OW1A21FDLAQVJ4E10BX1UH';
const clientSecret = 'AOUL5A1XBB0PUDESPXPMJDMJH34P3PMV3RL0AZF5SIWRERK5';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// Fetch Venue Data
const getVenues = async () => {
  const city = input.value;
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20190113`;
  const response = await fetch(urlToFetch);

  destination.innerHTML = `<h2>${city}</h2>`

  if(response.ok) {
    const json = await response.json();
    const venues = json.response.groups[0];
    console.log(venues);

    return;
  }
  throw new Error('Request Failed!');
}

submit.addEventListener('click', () => {
  container.style.visibility = 'visible';
  getVenues();
}, false);
