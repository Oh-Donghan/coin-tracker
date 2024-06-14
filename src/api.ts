import axios from 'axios';

const BASE_URL = `https://api.coinpaprika.com/v1`;

// axios로 비동기처리 하기
export const fetchCoins = async () => {
  return await axios.get(`${BASE_URL}/coins`).then((response) => response.data);
};

export const fetchCoinInfo = async (coinId: string) => {
  return await axios
    .get(`${BASE_URL}/coins/${coinId}`)
    .then((response) => response.data);
};

export const fetchCoinTickers = async (coinId: string) => {
  return await axios
    .get(`${BASE_URL}/tickers/${coinId}`)
    .then((response) => response.data);
};

export const fetchCoinHistory = async (coinId: string) => {
  return await axios
    .get(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
    .then((response) => response.data);
};

// promise로 비동기처리 하기
// export function fetchCoins() {
//   return fetch('https://api.coinpaprika.com/v1/coins').then((response) =>
//     response.json()
//   );
// }
