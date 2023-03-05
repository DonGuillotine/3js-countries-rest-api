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
        <ul>
            <li><strong>native name: </strong> ${data.nativeName}</li>
            <li><strong>population: </strong> ${data.population}</li>
            <li><strong>region: </strong> ${data.region}</li>
            <li><strong>sub region: </strong> ${data.subregion}</li>
            <li><strong>capital: </strong> ${data.capital}</li>
          </ul>
          </div>
          <div class="col col-2">
            <ul>
              <li><strong>top level domain: </strong> ${data.topLevelDomain}</li>
              <li><strong>currencies: </strong> ${data.currencies[0].name}</li>
              <li><strong>languages: </strong> ${data.languages
                .map((lang) => lang.name)
                .join(", ")}</li>
            </ul>
            </div>
      </div>
      <div class="col col-3">