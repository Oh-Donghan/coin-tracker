import { useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ReactApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atom';

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

export interface ChartProps {
  coinId: string;
}

export default function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ['ohlcv', coinId],
    queryFn: () => fetchCoinHistory(coinId!),
  });

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ReactApexChart
          type='candlestick'
          series={[
            {
              name: 'Price',
              data: data?.map((price) => ({
                x: new Date(price.time_close * 1000).toDateString(),
                y: [
                  parseFloat(String(price.open)),
                  parseFloat(String(price.high)),
                  parseFloat(String(price.low)),
                  parseFloat(String(price.close)),
                ],
              })) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: {
              show: false,
            },
            xaxis: {
              type: 'datetime',
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toDateString()
              ),
              axisBorder: {
                show: true,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: true,
              },
            },
            yaxis: {
              show: false,
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}
