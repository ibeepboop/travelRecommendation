const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const searchValue = searchBtn.value;


// get travel recommendation data from json form
function getData() {
  const url = "../data/travel_recommendation_api.json";
  const input = document.getElementById("search").value.toLowerCase();
  const resultDiv = document.getElementById("searchResult");
  resultDiv.innerHTML = '';

  fetch(url)
    .then(response => response.json())
    .then(data => {
        let results = [];

        if (input === 'countries') {
            results = data.countries;
        } else if (input === 'temples') {
            results = data.temples;
        } else if (input === 'beaches') {
            results = data.beaches;
        } else {
            resultDiv.innerHTML += "No matching results found."
            return;
        }
        
        results.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.innerHTML += `<h2>${item.name}</h2>`;

            // For 'countries', add nested city data
            if (input === 'countries') {
                item.cities.forEach(city => {
                    itemDiv.innerHTML += `<h3>${city.name}</h3>`;
                    itemDiv.innerHTML += `<img src="${city.imageUrl}" alt="${city.name}"/>`;
                    itemDiv.innerHTML += `<p>${city.description}</p>`;
                });
            } else {
                // For 'temples' and 'beaches', add main item data
                itemDiv.innerHTML += `<img src="${item.imageUrl}" alt="${item.name}"/>`;
                itemDiv.innerHTML += `<p>${item.description}</p>`
            }

            resultDiv.appendChild(itemDiv);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML += 'An error occurred while fetching data.';
    });

}


searchBtn.addEventListener('click', getData);

function resetSearch() {
    searchValue = '';
}

resetBtn.addEventListener('click', resetSearch);

