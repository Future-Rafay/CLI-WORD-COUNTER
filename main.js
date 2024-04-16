// #! /usr/bin/env node
import inquirer from "inquirer";
// Exchange rates from various currencies to PKR (Pakistani Rupees)
const exchangeRatesToPkr = {
    "USD": 277.90, // Assuming exchange rate from USD to PKR
    "GBP": 351.01, // Assuming exchange rate from GBP to PKR
    "EUR": 301.12, // Assuming exchange rate from EUR to PKR
};
let confirmExit;
do {
    confirmExit = await inquirer.prompt({
        type: "confirm",
        name: "exit",
        message: "Do you want to convert amount ?"
    });
    if (!confirmExit.exit) {
        break; // Exit the loop if the user chooses not to convert
    }
    let conversionInput = await inquirer.prompt([
        {
            name: "fromCurrency",
            type: "list",
            choices: ["USD", "GBP", "EUR", "PKR"],
            message: "Select the currency you have: "
        },
        {
            name: "toCurrency",
            type: "list",
            choices: ["USD", "GBP", "EUR", "PKR"],
            message: "Select the currency you want to convert to: "
        },
        {
            name: "amount",
            type: "number",
            message: "Enter the amount to convert: ",
        }
    ]);
    let convertedAmount;
    if (conversionInput.fromCurrency === "PKR") {
        convertedAmount = conversionInput.amount / exchangeRatesToPkr[conversionInput.toCurrency];
        console.log(`Here is your amount converted: ${conversionInput.amount} PKR = ${convertedAmount.toFixed(2)} ${conversionInput.toCurrency}`);
    }
    else if (conversionInput.toCurrency === "PKR") {
        convertedAmount = conversionInput.amount * exchangeRatesToPkr[conversionInput.fromCurrency];
        console.log(`Here is your amount converted: ${conversionInput.amount} ${conversionInput.fromCurrency} = ${convertedAmount.toFixed(2)} PKR`);
    }
    else {
        let amountInPkr = conversionInput.amount * exchangeRatesToPkr[conversionInput.fromCurrency];
        convertedAmount = amountInPkr / exchangeRatesToPkr[conversionInput.toCurrency];
        console.log(`Here is your amount converted: ${conversionInput.amount} ${conversionInput.fromCurrency} = ${convertedAmount.toFixed(2)} ${conversionInput.toCurrency}`);
    }
} while (confirmExit);
