const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const searchValue = searchBtn.value;


// get travel recommendation data from json form
function getData() {
    const url = "../data/travel_recommendation_api.json";
    const input = document.getElementById("search").value.toLowerCase();
    const resultDiv = document.getElementById("searchResult");
    resultDiv.innerHTML = '';
    resultDiv.style.display = 'none'; // Hide the div initially

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
                const specificCountry = data.countries.find(country => 
                    country.name.toLowerCase() === input
                );
                
                if (specificCountry) {
                    results.push(specificCountry);
                } else {
                    resultDiv.innerHTML = "No matching results found.";
                    resultDiv.style.display = 'block';
                    return;
                }
            }

            if (results.length > 0) {
                results.forEach(item => {
                    const itemDiv = document.createElement("div");
                    itemDiv.innerHTML += `<h2>${item.name}</h2>`;
                    
                    if (input === 'countries' || results.length === 1) {
                        item.cities.forEach(city => {
                            itemDiv.innerHTML += `<h3>${city.name}</h3>`;
                            itemDiv.innerHTML += `<img src="${city.imageUrl}" alt="${city.name} "/>`;
                            itemDiv.innerHTML += `<p>${city.description}</p>`;
                        });
                    } else {
                        itemDiv.innerHTML += `<img src="${item.imageUrl}" alt="${item.name}"/>`;
                        itemDiv.innerHTML += `<p>${item.description}</p>`;
                    }
                    resultDiv.appendChild(itemDiv);
                });
                resultDiv.style.display = 'block'; // Show the div when results are populated
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
            resultDiv.style.display = 'block'; // Show the div for error messages
        });
}



searchBtn.addEventListener('click', getData);

function resetSearch() {
    searchValue = '';
}

resetBtn.addEventListener('click', resetSearch);

