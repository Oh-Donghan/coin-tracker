import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { ChartProps } from './Chart';
import { useQuery } from '@tanstack/react-query';
import { IPriceData } from './Coin';
import { fetchCoinTickers } from '../api';

export default function Price() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IPriceData>({
    queryKey: ['prices', coinId],
    queryFn: () => fetchCoinTickers(coinId),
  });

  const percentChange = (change: number | undefined) => {
    if (change === undefined) return null;
    const sign = change > 0 ? '+' : '';
    const className = change > 0 ? 'positive' : 'negative';
    return (
      <span className={className}>
        {sign}
        {change.toFixed(2)}%
      </span>
    );
  };

  return (
    <>
      <div>
        {isLoading ? (
          'Loading...'
        ) : (
          <>
            <OverviewItem>
              <div>최고가:</div>
              <div>{data?.quotes.USD.ath_price.toFixed(3)}</div>
              <div>({data?.quotes.USD.ath_date.split('T')[0]})</div>
            </OverviewItem>
            <OverviewItem>
              <div>시가 총액:</div>
              <div>{data?.quotes.USD.market_cap.toLocaleString()}</div>
            </OverviewItem>
            <GridArea>
              <GridItem>
                <span>1시간전과 시세차이</span>
                <div>
                  <span>
                    {percentChange(data?.quotes.USD.percent_change_1h)}
                  </span>
                </div>
              </GridItem>
              <GridItem>
                <span>7일전과 시세차이</span>
                <div>
                  <span>
                    {percentChange(data?.quotes.USD.percent_change_7d)}
                  </span>
                </div>
              </GridItem>
              <GridItem>
                <span>30일전과 시세차이</span>
                <div>
                  <span>
                    {percentChange(data?.quotes.USD.percent_change_30d)}
                  </span>
                </div>
              </GridItem>
              <GridItem>
                <span>1년전과 시세차이</span>
                <div>
                  <span>
                    {percentChange(data?.quotes.USD.percent_change_1y)}
                  </span>
                </div>
              </GridItem>
            </GridArea>
          </>
        )}
      </div>
    </>
  );
}

const OverviewItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  font-size: 15px;
`;

const GridArea = styled.div`
  display: grid;
  justify-items: center;
  gap: 15px;
  grid-template-columns: repeat(2, 1fr);
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-radius: 15px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  span {
    font-size: 14px;
    color: #cccccc;
  }
  div {
    span {
      font-size: 25px;
      &.positive {
        color: #1849a9;
      }
      &.negative {
        color: #ad2121;
      }
    }
  }
`;
