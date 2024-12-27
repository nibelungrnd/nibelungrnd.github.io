async function fetchSolanaPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await response.json();
        const price = data.solana.usd;
        document.getElementById('solPrice').textContent = `$${price.toFixed(2)}`;
    } catch (error) {
        console.error('Error fetching Solana price:', error);
        document.getElementById('solPrice').textContent = 'Error loading price';
    }
}

// Fetch initial price
fetchSolanaPrice();

// Update price every minute
setInterval(fetchSolanaPrice, 60000); 