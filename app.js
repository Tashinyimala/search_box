const endpoint    = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities      = [];
const searchInput = document.querySelector('.search');
const suggestion  = document.querySelector('.suggestions');

fetch(endpoint)
        .then(data     => data.json())
        .then(jsonData => cities.push(...jsonData));

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi'); // g for globel & i for insensitive for lower/uppercase.
        return place.city.match(regex) || place.state.match(regex);
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

function displayMatches() {
    const searchText = this.value;
    const matchArray = findMatches(searchText, cities);
    const html       = matchArray.map(place => {
        const regex     = new RegExp(searchText, 'gi');
        const cityName  = place.city.replace(regex, `<span class="hl">${searchText}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${searchText}</span>`);
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="name">${numberWithCommas(place.population)}</span>
            </li>
        `;
    }).join('');

    suggestion.innerHTML = html;
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);