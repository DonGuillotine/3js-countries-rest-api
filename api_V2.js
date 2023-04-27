const baseApiLink = `https://restcountries.com/v3.1/`,
  all = "all",
  byRegion = `region/`,
  byName = `name/`,
  byAlpha = `alpha/`;
let byFields = `?fields=name,population,region,capital,flags`,
  countriesGrid = document.querySelector(".countries-grid"),
  searchInput = document.querySelector(".search-input"),
  dropDownBody = document.querySelectorAll(".dropDownBody li")


// Error Messgaes
function notifications() {
}  


// Country Card HTML Structure
function countryStructure(data) {
    return `
    <div class="mx-auto max-w-sm bg-transparent border-gray-200 rounded-lg shadow-xl mb-10 dark:bg-gray-800 dark:border-gray-700">
        <a href="#" data-country-name="${data.name.common}">
            <img class="rounded-t-lg opacity-60" src=${data.flags.svg} alt="${data.name.common} FLag" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">${data.name.common}</h5>
            </a>
            <ul class="max-w-md text-white space-y-1 list-disc list-inside dark:text-gray-400">
                <li><strong>population: </strong>${data.population}</li>
                <li><strong>Region: </strong>${data.region}</li>
                <li><strong>capital: </strong>${data.capital}</li>
            </ul>
        </div>
    </div>
        `;
  }

// Get All Countries
async function getCountries(query, limit = 50, getRest = false) {
    let url = `${baseApiLink}${query}`;
    try {
      let response = await fetch(url, { cache: "force-cache" });
      // console.log(response);
      let data = await response.json();
      console.log(data);
      limit ? (data.length = limit) : "";
      getRest ? (data.length = data.splice(0, 50).length) : "";
  
      if (response.status >= 200 && response.status < 300) {
        if (data) {
        //   controlLoader("open"); // Open
        //   countriesGrid.classList.remove("no-grid", "no-flex");
          limit == null ? (countriesGrid.innerHTML = "") : "";
  
          data.forEach((country) => {
            countriesGrid.innerHTML += countryStructure(country);
          });
        //   let countries = countriesGrid.querySelectorAll(".country");
        //   seeFullProject(countries);
        // Close
        //   controlLoader(); 
        } else {
            console.log("Error");
        //   notifications(countriesGrid);
        }
      } else {
        // notifications(
        //   countriesGrid,
        //   (message = `Sorry, country ${data.message}...`),
        //   (details = "Please check spelling and try again")
        // );
        console.log("Error");
      }
    } catch (error) {
        console.error(error);
    //   notifications(
    //     countriesGrid,
    //     (message = "Sorry something went wrong..."),
    //     error
    //   );
    }
  }

  getCountries(`${all}${byFields}`);


  // Get Countries By Search
function getCountriesBySearch() {
  let searchInputValue = searchInput.value.trim().toLowerCase();
  if (searchInputValue == "" || searchInputValue.length == 0) {
    countriesGrid.innerHTML = "";
    getCountries(`${all}${byFields}`);
    // showMoreButton.style.display = "block";
  } else {
    countriesGrid.innerHTML = "";
    getCountries(`${byName}${searchInputValue}${byFields}`);
    // showMoreButton.style.display = "none";
  }
}

// Get Countries by Region
function getCountriesByRegion(region){
  if(region == "all"){
    countriesGrid.innerHTML = "";
    getCountries(`${all}${byFields}`);
  }else{
    countriesGrid.innerHTML = "";
    getCountries(`${byName}${region}${byFields}`);
  }
}

// Event Listeners

// For Search
searchInput.addEventListener("keyup", getCountriesBySearch);
searchInput.addEventListener("paste", getCountriesBySearch);

// For Filtering
dropDownBody.forEach((links)=>{
  links.addEventListener("click", ()=>{
    let userRegion = links.dataset.region.toLowerCase();
    getCountriesByRegion(userRegion);
  })
})


// Scroll Top
function scrollTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
}