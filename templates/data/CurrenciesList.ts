const Btc = "/static/images/btc.svg";
const Etc = "/static/images/eth.svg";
const Bnb = "/static/images/bnb.svg";
const Xrp = "/static/images/xrp.svg";
const Ada = "/static/images/ada.svg";
const Algo = "/static/images/algo.svg";
const Atom = "/static/images/atom.svg";
const Avax = "/static/images/avax.svg";
const Cake = "/static/images/cake.svg";
const Dai = "/static/images/dai.svg";
const Dash = "/static/images/dash.svg";
const Doge = "/static/images/doge.svg";
const Dot = "/static/images/dot.svg";
const Kava = "/static/images/kava.svg";
const Ltc = "/static/images/ltc.svg";
const Matic = "/static/images/matic.svg";
const Near = "/static/images/near.svg";
const Neo = "/static/images/neo.svg";
const Shib = "/static/images/shib.svg";
const Trx = "/static/images/trx.svg";
const Twt = "/static/images/twt.svg";
const Uni = "/static/images/uni.svg";
const Usdc = "/static/images/usdc.svg";
const Usdt = "/static/images/usdt.svg";
const Vet = "/static/images/vet.svg";
const Xlm = "/static/images/xlm.svg";

const w = {
    bitcoin: "wallet",
    erc20: "wallet",
    bep20: "wallet",
    ripple: "wallet",
    cardano: "wallet",
    algorand: "wallet",
    cosmos: "wallet",
    avalanche: "wallet",
    dash: "wallet",
    dogecoin: "wallet",
    polkadot: "wallet",
    kava: "wallet",
    litecoin: "wallet",
    polygon: "wallet",
    near: "wallet",
    neo: "wallet",
    tron: "wallet",
    stellar: "wallet",
    vechain: "wallet"
}

export const CurrenciesList = [
    {
        id: 1,
        name: "Bitcoin",
        short: "BTC",
        img: Btc,
        minimum: 0.004,
        maximum: 5,
        wallet: w.bitcoin
    },
    {
        id: 2,
        name: "Ethereum",
        short: "ETH",
        img: Etc,
        minimum: 0.02,
        maximum: 50,
        wallet: w.erc20
    },
    {
        id: 3,
        name: "BNB",
        short: "BNB",
        img: Bnb,
        minimum: 0.1,
        maximum: 500,
        wallet: w.bep20
    },
    {
        id: 4,
        name: "XRP",
        short: "XRP",
        img: Xrp,
        minimum: 25,
        maximum: 50000,
        wallet: w.ripple
    }
,
    {
        id: 5,
        name: "Cardano",
        short: "ADA",
        img: Ada,
        minimum: 50,
        maximum: 100000,
        wallet: w.cardano
    },
    {
        id: 6,
        name: "Algorand",
        short: "ALGO",
        img: Algo,
        minimum: 100,
        maximum: 200000,
        wallet: w.algorand
    },
    {
        id: 7,
        name: "Cosmos",
        short: "ATOM",
        img: Atom,
        minimum: 2,
        maximum: 5000,
        wallet: w.cosmos
    },
    {
        id: 8,
        name: "Avalanche",
        short: "AVAX",
        img: Avax,
        minimum: 1,
        maximum: 2000,
        wallet: w.avalanche
    },
    {
        id: 9,
        name: "PancakeSwap",
        short: "CAKE",
        img: Cake,
        minimum: 5,
        maximum: 10000,
        wallet: w.bep20
    },
    {
        id: 10,
        name: "Dai",
        short: "DAI",
        img: Dai,
        minimum: 10,
        maximum: 50000,
        wallet: w.erc20
    },
    {
        id: 11,
        name: "Dash",
        short: "DASH",
        img: Dash,
        minimum: 0.5,
        maximum: 1000,
        wallet: w.dash
    },
    {
        id: 12,
        name: "Dogecoin",
        short: "DOGE",
        img: Doge,
        minimum: 1000,
        maximum: 2000000,
        wallet: w.dogecoin
    },
    {
        id: 13,
        name: "Polkadot",
        short: "DOT",
        img: Dot,
        minimum: 5,
        maximum: 10000,
        wallet: w.polkadot
    },
    {
        id: 14,
        name: "Kava",
        short: "KAVA",
        img: Kava,
        minimum: 10,
        maximum: 20000,
        wallet: w.kava
    },
    {
        id: 15,
        name: "Litecoin",
        short: "LTC",
        img: Ltc,
        minimum: 0.5,
        maximum: 1000,
        wallet: w.litecoin
    },
    {
        id: 16,
        name: "Polygon",
        short: "MATIC",
        img: Matic,
        minimum: 50,
        maximum: 100000,
        wallet: w.polygon
    },
    {
        id: 17,
        name: "Near Protocol",
        short: "NEAR",
        img: Near,
        minimum: 10,
        maximum: 20000,
        wallet: w.near
    },
    {
        id: 18,
        name: "NEO",
        short: "NEO",
        img: Neo,
        minimum: 2,
        maximum: 5000,
        wallet: w.neo
    },
    {
        id: 19,
        name: "Shiba Inu",
        short: "SHIB",
        img: Shib,
        minimum: 1000000,
        maximum: 2000000000,
        wallet: w.erc20
    },
    {
        id: 20,
        name: "Tron",
        short: "TRX",
        img: Trx,
        minimum: 100,
        maximum: 200000,
        wallet: w.tron
    },
    {
        id: 21,
        name: "Trust Wallet Token",
        short: "TWT",
        img: Twt,
        minimum: 20,
        maximum: 40000,
        wallet: w.bep20
    },
    {
        id: 22,
        name: "Uniswap",
        short: "UNI",
        img: Uni,
        minimum: 5,
        maximum: 10000,
        wallet: w.erc20
    },
    {
        id: 23,
        name: "USD Coin",
        short: "USDC",
        img: Usdc,
        minimum: 10,
        maximum: 50000,
        wallet: w.erc20
    },
    {
        id: 24,
        name: "Tether",
        short: "USDT",
        img: Usdt,
        minimum: 10,
        maximum: 50000,
        wallet: w.erc20
    },
    {
        id: 25,
        name: "Vechain",
        short: "VET",
        img: Vet,
        minimum: 1000,
        maximum: 2000000,
        wallet: w.vechain
    },
    {
        id: 26,
        name: "Stellar",
        short: "XLM",
        img: Xlm,
        minimum: 100,
        maximum: 200000,
        wallet: w.stellar
    }
]