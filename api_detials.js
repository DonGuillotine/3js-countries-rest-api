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