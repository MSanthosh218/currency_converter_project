document.addEventListener("DOMContentLoaded", () => {
    const convertButton = document.getElementById("convert");
    const resultElement = document.getElementById("result");

    convertButton.addEventListener("click", convertCurrency);

   
    function getListOfCurrencies() {
        return fetch("https://api.frankfurter.app/currencies")
            .then(res => res.json());
    }

    function buildCurrencyOptions() {
        getListOfCurrencies().then(listOfCurrencies => {
            const fromCurrencies = document.getElementById("fromcurrrency");
            const toCurrencies = document.getElementById("tocurrency");

            for (let key in listOfCurrencies) {
                const fromCurrencyOption = document.createElement("option");
                fromCurrencyOption.value = key;
                fromCurrencyOption.innerText = key;
                fromCurrencies.appendChild(fromCurrencyOption);

                const toCurrencyOption = document.createElement("option");
                toCurrencyOption.value = key;
                toCurrencyOption.innerText = key;
                toCurrencies.appendChild(toCurrencyOption);
            }
        });
    }

   
    function convertCurrency() {
        const fromCurrency = document.getElementById("fromcurrrency").value;
        const toCurrency = document.getElementById("tocurrency").value;
        const amount = document.getElementById("amount").value;

        fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
            .then(res => res.json())
            .then(data => {
                const conversionRate = data.rates[toCurrency];
                const result = (amount * conversionRate).toFixed(2);
                resultElement.textContent = result; // Display result in the span
            })
            .catch(err => {
                resultElement.textContent = "Error fetching data!";
            });
    }

  
    buildCurrencyOptions();
});
