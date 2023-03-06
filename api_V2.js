// Country Card HTML Structure
function countryStructure(data) {
    return `
    <div class="mx-auto max-w-sm bg-transparent border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg opacity-20" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p class="mb-3 font-normal text-white dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>
</div>

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