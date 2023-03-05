let detailsGrid = document.querySelector(".country-details");
let borderCountries;
byFields = `?fields=flag,name,nativeName,population,region,subregion,capital,topLevelDomain,currencies,languages,borders`;

/*
    FUNCTIONS
*/


// Country Details HTML Structure

function countryDetailsStructure(data) {
    return `
      <div class="country-flag">
        <img src=${data.flag} alt="${data.flag} Flag" />
      </div>
      <div class="country-info">
      <div class="col col-1">
        <h1 class="country-title">${data.name}</h1>
      </div>
      <div class="col col-2">
        <div class="col col-1">