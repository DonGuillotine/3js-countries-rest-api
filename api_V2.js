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