let money = 100;
let inventory = 0;
let marketingLevel = 0;
let investmentStatus = "None";
let reputation = 100; // Initial reputation

function updateDisplay() {
    document.getElementById('money').innerText = '$' + money;
    document.getElementById('inventory').innerText = 'Goods in Inventory: ' + inventory;
    document.getElementById('marketingLevel').innerText = 'Marketing Level: ' + marketingLevel;
    document.getElementById('investmentStatus').innerText = 'Investment Status: ' + investmentStatus;
    document.getElementById('reputation').innerText = 'Reputation: ' + getReputationStatus();
}

function buyGoods() {
    if (money >= 10) {
        money -= 10;
        inventory += 1;
        updateDisplay();
    } else {
        alert("Not enough money to buy goods!");
    }
}

function sellGoods() {
    if (inventory >= 1) {
        let basePrice = 20;
        let sellingPrice = basePrice + (marketingLevel * 5); // Selling price with marketing bonus
        money += sellingPrice;
        inventory -= 1;
        updateDisplay();
    } else {
        alert("No goods to sell!");
    }
}

function invest() {
    let investmentAmount = parseFloat(prompt("Enter the amount to invest:"));
    if (investmentAmount && investmentAmount > 0 && investmentAmount <= money) {
        money -= investmentAmount;
        let success = Math.random() < 0.5; // 50% chance of success
        if (success) {
            let profit = investmentAmount * 2; // Double the investment on success
            money += profit;
            investmentStatus = "Success";
            updateDisplay();
        } else {
            let loss = investmentAmount * 0.5; // Lose half of the investment on failure
            money -= loss;
            investmentStatus = "Failure";
            updateDisplay();
        }
    } else {
        alert("Invalid investment amount!");
    }
}

function market() {
    let marketingCost = 20 + (10 * marketingLevel); // Increase marketing cost with each upgrade
    if (money >= marketingCost) {
        money -= marketingCost;
        marketingLevel++;
        alert("Marketing upgraded! You can now attract more customers.");
        updateDisplay();
    } else {
        alert("Not enough money to upgrade marketing!");
    }
}

// Automatically earn money based on marketing level
setInterval(function() {
    if (inventory > 0) {
        let basePrice = 20;
        let sellingPrice = basePrice + (marketingLevel * 5); // Selling price with marketing bonus
        money += sellingPrice;
        inventory -= 1; // Decrease inventory when money increases (indicating a sale)
        updateDisplay();
    }
    else {
        // Decrease marketing level and reputation if inventory is 0
        if (marketingLevel > 0) {
            marketingLevel--;
        }
        if (reputation > 0) {
            reputation -= 5; // Decrease reputation by 5
        }
        updateDisplay();
    }
}, 3000); // Adjust the interval as needed

// Decrease reputation when inventory is empty
setInterval(function() {
    if (inventory === 0 && reputation > 0) {
        reputation -= 10; // Decrease reputation by 10 when inventory is empty
        updateDisplay();
    }
}, 5000); // Adjust the interval as needed

function getReputationStatus() {
    if (reputation >= 70) {
        return 'Good';
    } else if (reputation >= 30) {
        return 'Fair';
    } else {
        return 'Poor';
    }
}

updateDisplay();
