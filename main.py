from flask import Flask, render_template, request, session, redirect, url_for, jsonify
from flask_session import Session
from flask_cors import CORS
import httpx
import asyncio

app = Flask(__name__)
app.secret_key = 'super-secret-key'

# Enable CORS for all routes
CORS(app)

app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

CRYPTO_IDS = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum',
    'BNB': 'binancecoin',
    'XRP': 'ripple',
    'ADA': 'cardano',
    'ALGO': 'algorand',
    'ATOM': 'cosmos',
    'AVAX': 'avalanche-2',
    'CAKE': 'pancakeswap-token',
    'DAI': 'dai',
    'DASH': 'dash',
    'DOGE': 'dogecoin',
    'DOT': 'polkadot',
    'KAVA': 'kava',
    'LTC': 'litecoin',
    'MATIC': 'matic-network',
    'NEAR': 'near',
    'NEO': 'neo',
    'SHIB': 'shiba-inu',
    'TRX': 'tron',
    'TWT': 'trust-wallet-token',
    'UNI': 'uniswap',
    'USDC': 'usd-coin',
    'USDT': 'tether',
    'VET': 'vechain',
    'XLM': 'stellar'
}

async def get_crypto_prices() -> dict:
    # получить цены с CoinGecko
    try:
        crypto_ids = list(CRYPTO_IDS.values())
        ids_string = ','.join(crypto_ids)
        
        async with httpx.AsyncClient() as client:
            result = await client.get(
                f'https://api.coingecko.com/api/v3/simple/price?ids={ids_string}&vs_currencies=usd'
            )
            
        if result.status_code != 200:
            # fallback with all currencies
            return {
                'bitcoin': {'usd': 110513.00},
                'ethereum': {'usd': 4230.00},
                'binancecoin': {'usd': 826.00},
                'ripple': {'usd': 2.36},
                'cardano': {'usd': 0.84},
                'algorand': {'usd': 0.18},
                'cosmos': {'usd': 5.50},
                'avalanche-2': {'usd': 45.00},
                'pancakeswap-token': {'usd': 3.50},
                'dai': {'usd': 1.00},
                'dash': {'usd': 45.00},
                'dogecoin': {'usd': 0.15},
                'polkadot': {'usd': 8.50},
                'kava': {'usd': 0.75},
                'litecoin': {'usd': 85.00},
                'matic-network': {'usd': 0.85},
                'near': {'usd': 5.00},
                'neo': {'usd': 15.00},
                'shiba-inu': {'usd': 0.000025},
                'tron': {'usd': 0.25},
                'trust-wallet-token': {'usd': 1.50},
                'uniswap': {'usd': 12.00},
                'usd-coin': {'usd': 1.00},
                'tether': {'usd': 1.00},
                'vechain': {'usd': 0.05},
                'stellar': {'usd': 0.12}
            }
            
        return result.json()
    except Exception as e:
        print(f"Error fetching crypto prices: {e}")
        # fallback with all currencies
        return {
                'bitcoin': {'usd': 110513.00},
                'ethereum': {'usd': 4230.00},
                'binancecoin': {'usd': 826.00},
                'ripple': {'usd': 2.36},
                'cardano': {'usd': 0.84},
                'algorand': {'usd': 0.18},
                'cosmos': {'usd': 5.50},
                'avalanche-2': {'usd': 45.00},
                'pancakeswap-token': {'usd': 3.50},
                'dai': {'usd': 1.00},
                'dash': {'usd': 45.00},
                'dogecoin': {'usd': 0.15},
                'polkadot': {'usd': 8.50},
                'kava': {'usd': 0.75},
                'litecoin': {'usd': 85.00},
                'matic-network': {'usd': 0.85},
                'near': {'usd': 5.00},
                'neo': {'usd': 15.00},
                'shiba-inu': {'usd': 0.000025},
                'tron': {'usd': 0.25},
                'trust-wallet-token': {'usd': 1.50},
                'uniswap': {'usd': 12.00},
                'usd-coin': {'usd': 1.00},
                'tether': {'usd': 1.00},
                'vechain': {'usd': 0.05},
                'stellar': {'usd': 0.12}
        }

@app.route('/api/crypto-prices')
def crypto_prices():
    try:
        prices = asyncio.run(get_crypto_prices())
        
        # Convert to format expected by frontend
        formatted_prices = {}
        for symbol, crypto_id in CRYPTO_IDS.items():
            if crypto_id in prices:
                formatted_prices[symbol] = prices[crypto_id]['usd']
            else:
                formatted_prices[symbol] = 0.00
                
        return jsonify(formatted_prices)
    except Exception as e:
        print(f"Error in crypto_prices endpoint: {e}")
        return jsonify({'error': 'Failed to fetch prices'}), 500

@app.route('/')
def index():
    return "Flask backend running"

if __name__ == '__main__':
    app.run(debug=True)
