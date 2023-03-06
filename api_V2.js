const baseApiLink = `https://restcountries.com/v3.1/`,
  all = "all",
  byRegion = `region/`,
  byName = `name/`,
  byAlpha = `alpha/`;
let byFields = `?fields=name,population,region,capital,flags`,
  countriesGrid = document.querySelector(".countries-grid"),
  dropDownHeader = document.querySelector(".dropdown-header"),
  dropDownBodyOptions = document.querySelectorAll(".dropdown-body li"),
  searchInput = document.querySelector(".search-input"),
  scrollBtn = document.querySelector(".scroll-top"),
  showMoreButton = document.querySelector(".show-more-btn"),
  switchBtn = document.querySelector(".theme-toggle"),
  switchBtnText = switchBtn.querySelector(".theme-text"),
  switchBtnIcon = switchBtn.querySelector(".theme-icon"),
  theme = "light";


// Country Card HTML Structure
function countryStructure(data) {
    return `
    <div class="mx-auto max-w-sm bg-transparent border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
        <a href="#" data-country-name="${data.name}>
            <img class="rounded-t-lg opacity-20" src=${data.flags.svg} alt="${data.name} FLag" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">${data.name}</h5>
            </a>
            <ul class="max-w-md space-y-1 list-disc list-inside dark:text-gray-400">
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
      // console.log(data);
      limit ? (data.length = limit) : "";
      getRest ? (data.length = data.splice(0, 50).length) : "";
  
      if (response.status >= 200 && response.status < 300) {
        if (data) {
          controlLoader("open"); // Open
          countriesGrid.classList.remove("no-grid", "no-flex");
          limit == null ? (countriesGrid.innerHTML = "") : "";
  
          data.forEach((country) => {
            countriesGrid.innerHTML += countryStructure(country);
          });
          let countries = countriesGrid.querySelectorAll(".country");
          seeFullProject(countries);
  
          controlLoader(); // Close
        } else {
          notifications(countriesGrid);
        }
      } else {
        notifications(
          countriesGrid,
          (message = `Sorry, country ${data.message}...`),
          (details = "Please check spelling and try again")
        );
      }
    } catch (error) {
      //   console.error(error);
      notifications(
        countriesGrid,
        (message = "Sorry something went wrong..."),
        error
      );
    }
  }