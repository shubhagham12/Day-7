
// Initialize an XMLHttp Request
let xhr = new XMLHttpRequest();

// Open a request and pass url to open methods.
xhr.open("GET", "https://restcountries.com/v2/all");

// Process the request on the server side and retrieve the data
xhr.onload = function () {
  // Provide the data if the request lies in the range of 200-<300
  if (xhr.status >= 200 && xhr.status < 300) {
    // Provide the data to the server
    let countries = JSON.parse(this.response);
    console.log(countries);
    // (A)
    let asianCountries = countries.filter(
      (country) => country.region === "Asia"
    );
    console.log(asianCountries);
    // Note: This is not the actual output, actual output will contain details of each Asian country. For, reference here I have just given the country name and the region, and 50 is the total asian countries we get if we filter countries based on region.
    // output: [{name: 'British Indian Ocean Territory', region: 'Asia',...}, {name: 'Laos', region: 'Asia',...}, {name: 'Iraq', region: 'Asia',...},....... 52]

    // (B)
    let population = countries.filter((country) => country.population < 200000);
    console.log(population);
    // Note: This is not the actual output, actual output will contain details of each Asian country. For, reference here I have just given the country name and the population field.
    // Output: [{name: 'United States Virgin Islands', population: 106290,...}, {name: 'Kiribati',...}, population: 119446,...}, {name: 'Cayman Islands',...}, population: 65720,...}, {name: 'Aruba',...}, population: 106766,...}]

    // (C)
    countries.forEach((country) => {
      console.log(`
      Country: ${country.name},
      Capital: ${country.capital},
      Flag: ${country.flags.svg}
      `);
    });
    // Output:
    
    /*
    Country: Barbados,
    Capital: Bridgetown,
    Flag: https://flagcdn.com/bb.svg
    Country: British Indian Ocean Territory,
    Capital: Diego Garcia,
    Flag: https://flagcdn.com/io.svg
    Country: Republic of the Congo,
    Capital: Brazzaville,
    Flag: https://flagcdn.com/cg.svg
    .
    .
    .
    */

    // (D)
    let totalPopulation = countries.reduce((acc, el) => acc + el.population, 0);
    console.log(totalPopulation);
    // Output: 7777721563

    // (E)
    // First we filter out the countries having currencies with undefined currency data
    let haveCurrencyData = countries.filter(
      (dummy) => dummy.currencies !== undefined
    );
    // Then we use the filtered data to fetch the countries using USD.
    let usdCurrencyCountries = haveCurrencyData.filter((el) => {
      for (let key in el.currencies) {
        if (el.currencies[key].name === "United States dollar") {
          return el;
        }
      }
    });
    console.log(usdCurrencyCountries);

    /* Output: Total countries is 16 
    [{name: 'Bonaire, Sint Eustatius and Saba', currencies: [{name: 'United States dollar'}]},
     {name: 'Cambodia', currencies: [{name: 'United States dollar'}]},
     {name: 'El Salvador', currencies: [{name: 'United States dollar'}]},
     {name: 'Turks and Caicos Islands', currencies: [{name: 'United States dollar'}]},
     {name: 'United States of America', currencies: [{name: 'United States dollar'}]},
     ....
    ]
    */
  }
};

xhr.send();