document.addEventListener('DOMContentLoaded', function() {
    loadWatchedTokens();
});

const displayedTokens = new Set(); // Keep track of displayed contract addresses
const tokenPrices = {}; // Object to hold the previous prices of tokens

async function getTokenPrice() {
    const contractAddress = document.getElementById('contractAddress').value.trim();
    if(!contractAddress) return;

    if(displayedTokens.has(contractAddress)) {
        alert('This token is already being displayed.');
        return;
    }

    addTokenToWatchList(contractAddress);
}

function addTokenToWatchList(contractAddress) {
    // Fetch and display token data, then save
    fetchAndDisplayToken(contractAddress);
    saveWatchedTokens();
}

async function fetchAndDisplayToken(contractAddress) {
    // Fetch token data from Dexscreener's API
    const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`);
    const data = await response.json();

    if(data && data.pairs && data.pairs.length > 0) {
        const tokenInfo = data.pairs[0];
        tokenPrices[contractAddress] = parseFloat(tokenInfo.priceUsd).toFixed(2);
        createTokenWidget(contractAddress, tokenInfo, 'gray');
        displayedTokens.add(contractAddress);
        setTimeout(() => updateTokenPrice(contractAddress), 3000);
    } else {
        alert('Token information not available. Please check the contract address and try again.');
    }
}

function createTokenWidget(contractAddress, tokenInfo, color) {
    const widget = document.createElement('div');
    widget.className = 'token-widget';
    widget.id = `widget-${contractAddress}`;
    widget.innerHTML = `
        <div class="token-name">${tokenInfo.baseToken.symbol}</div>
        <div class="token-price" id="price-${contractAddress}" style="color: ${color};">$${tokenInfo.priceUsd}</div>
        <span class="remove-widget" style="color:black" onclick="removeWidget('${contractAddress}')">X</span>
    `;
    document.getElementById('tokenInfo').appendChild(widget);
}


function removeWidget(contractAddress) {
    document.getElementById(`widget-${contractAddress}`).remove();
    displayedTokens.delete(contractAddress);
    delete tokenPrices[contractAddress];
    saveWatchedTokens(); // Update the saved list after removal
}

function saveWatchedTokens() {
    const watchedTokens = JSON.stringify(Array.from(displayedTokens));
    localStorage.setItem('watchedTokens', watchedTokens);
}

function loadWatchedTokens() {
    const watchedTokens = JSON.parse(localStorage.getItem('watchedTokens'));
    if(watchedTokens) {
        watchedTokens.forEach(contractAddress => {
            fetchAndDisplayToken(contractAddress);
        });
    }
}

async function updateTokenPrice(contractAddress, initialize) {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`);
    const data = await response.json();

    if(data && data.pairs && data.pairs.length > 0) {
        const tokenInfo = data.pairs[0];
        const newPrice = parseFloat(tokenInfo.priceUsd).toFixed(6);

        if (!initialize) {
            const oldPriceInfo = tokenPrices[contractAddress] || { price: newPrice, direction: '' };
            const oldPrice = oldPriceInfo.price;
            const priceElement = document.getElementById(`price-${contractAddress}`);
            
            let direction = oldPriceInfo.direction; // Retain the last known direction if the price hasn't changed
            
            if (newPrice > oldPrice) {
                direction = 'up';
            } else if (newPrice < oldPrice) {
                direction = 'down';
            }
            
            // Determine the color and arrow based on the direction
            const color = direction === 'up' ? 'green' : 'red';
            const arrow = direction === 'up' ? '↑' : '↓';

            priceElement.innerHTML = `$${newPrice} <span style="color: ${color};">${arrow}</span>`;
        }

        // Update the stored price and direction for comparison in the next interval
        tokenPrices[contractAddress] = { price: newPrice, direction: direction };

        if (displayedTokens.has(contractAddress)) {
            setTimeout(() => updateTokenPrice(contractAddress, false), 10005); // Continue updating this token's price
        }
    }

 

}
