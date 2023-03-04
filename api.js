/*
  VARIABLES
*/
const baseApiLink = `https://restcountries.com/v2/`,
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

/*
    FUNCTIONS
*/

// Control Loading
function controlLoader(status = "close") {
  let loader = document.querySelector(".loader");
  if (status == "close") {
    loader.classList.add("close");
  } else {
    loader.classList.remove("close");
  }
}

// Theme Switcher Functions
function chanegMode(mode, text, icon) {
  console.log(mode);
  let iconClasses = `fa-regular theme-icon ${
    mode == "dark" ? "fa-sun-bright" : "fa-moon"
  }`;
  text.textContent = mode == "dark" ? "light mode" : "dark mode";
  icon.className = iconClasses;
  mode == "dark"
    ? document.body.classList.add("dark-theme")
    : document.body.classList.remove("dark-theme");
}

// Error Messgaes
function notifications(
  target,
  message = "Sorry, something went wrong...",
  details = "Please try again later"
) {
  target.innerHTML = `
      <div class="notifi-wrapper">
        <h2>${message}</h2>
        <p>${details}</p>
      </div>
      `;
  target.classList.add("no-grid", "no-flex");
  controlLoader(); // Close
}

// Scroll Top
function scrollTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
}

// Toggle Scroll Top Button
function controlScrollButton() {
  if (
    (document.documentElement.scrollTop || window.pageYOffset) >=
    window.innerHeight / 2
  ) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
}

// Country Card HTML Structure
function countryStructure(data) {
  return `
      <a href="#" class="country scale-effect" data-country-name="${data.name}">
          <div class="country-flag">
              <img src=${data.flags.svg} alt="${data.name} FLag">
          </div>
          <div class="country-info">
              <h2 class="country-title">${data.name}</h2>
              <ul class="country-brief">
                  <li><strong>population: </strong>${data.population}</li>
                  <li><strong>Region: </strong>${data.region}</li>
                  <li><strong>capital: </strong>${data.capital}</li>
              </ul>
          </div>
      </a>
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
getCountries(`${all}${byFields}`);

// Get Countries By Region
function getCountriesByRegion(region) {
  if (region == "all") {
    countriesGrid.innerHTML = "";
    getCountries(`${all}${byFields}`);
  } else {
    countriesGrid.innerHTML = "";
    getCountries(`${byRegion}${region}${byFields}`);
  }
}

// Get Countries By Search
function getCountriesBySearch() {
  let searchInputValue = searchInput.value.trim().toLowerCase();
  if (searchInputValue == "" || searchInputValue.length == 0) {
    countriesGrid.innerHTML = "";
    getCountries(`${all}${byFields}`);
    showMoreButton.style.display = "block";
  } else {
    countriesGrid.innerHTML = "";
    getCountries(`${byName}${searchInputValue}${byFields}`);
    showMoreButton.style.display = "none";
  }
}

// Control Drop Down Menu
function controlDropDown() {
  let dropDownWrapper = document.querySelector(".dropdown-wrapper");
  if (dropDownWrapper.classList.contains("open")) {
    dropDownWrapper.classList.remove("open");
  } else {
    dropDownWrapper.classList.add("open");
  }
}

/*
    EVENTS
*/

dropDownHeader.addEventListener("click", controlDropDown);
searchInput.addEventListener("paste", getCountriesBySearch);
searchInput.addEventListener("keyup", getCountriesBySearch);
scrollBtn.addEventListener("click", scrollTop);
window.addEventListener("scroll", controlScrollButton);
showMoreButton.addEventListener("click", () => {
  showMoreButton.textContent = "loading countries...";
  getCountries(all, (limit = 250), (getRest = true));
  setTimeout(() => {
    showMoreButton.style.display = "none";
    showMoreButton.textContent = "show more";
  }, 2000);
});
switchBtn.addEventListener("click", () => {
  theme = theme == "light" ? "dark" : "light";
  chanegMode(theme, switchBtnText, switchBtnIcon);
});

/*
    LOOPS
*/

dropDownBodyOptions.forEach((option) => {
  option.addEventListener("click", () => {
    controlLoader("open"); // Open
    let optionValue = option.dataset.region.toLowerCase();
    optionValue == "all"
      ? (showMoreButton.style.display = "block")
      : (showMoreButton.style.display = "none");
    getCountriesByRegion(optionValue);
    controlDropDown();
    // Extra Code [Can Be Omitted]
    optionValue = optionValue.split("");
    let firstLetter = optionValue[0].toUpperCase();
    optionValue = optionValue.slice(1);
    optionValue = firstLetter + optionValue.join("");
    dropDownHeader.querySelector("span").textContent = optionValue;
  });
});

/* 
  Functions Only For Codepen
*/
let boxModelWrapper = document.querySelector(".box-model-wrapper"),
  boxModelButtons = boxModelWrapper.querySelectorAll(".box-model .btn"),
  boxModelCloseBtn = boxModelWrapper.querySelector(".model-close");

// Guide User To See The Full Project [multipages] On Guithub Pages
function seeFullProject(arrayOfLinks) {
  arrayOfLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openBoxModel();
    });
  });
}

function closeBoxModel() {
  boxModelWrapper.classList.remove("show");
}

function openBoxModel() {
  boxModelWrapper.classList.add("show");
}

// Events
boxModelCloseBtn.addEventListener("click", closeBoxModel);
boxModelButtons.forEach((btn) => {
  btn.addEventListener("click", closeBoxModel);
});
