import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
    xAxis: [
      {
        label: 'Mushroom Consumption',
      },
    ],
    width: 500,
    height: 400,
  };
  const dataset = [
    {
      param_1: 59,
      param_2: 57,
      param_3: 86,
      param_4: 21,
      district: 'Ampara',
      district_id: '1',
    },
    {
      param_1: 50,
      param_2: 52,
      param_3: 78,
      param_4: 28,
      district: 'Anuradhapura',
      district_id: '2',
    },
    {
      param_1: 47,
      param_2: 53,
      param_3: 106,
      param_4: 41,
      district: 'Badulla',
      district_id: '3',
    },
    {
      param_1: 54,
      param_2: 56,
      param_3: 92,
      param_4: 73,
      district: 'Batticaloa',
      district_id: '4',
    },
    {
      param_1: 57,
      param_2: 69,
      param_3: 92,
      param_4: 99,
      district: 'Colombo',
      district_id: '5',
    },
    {
      param_1: 60,
      param_2: 63,
      param_3: 103,
      param_4: 144,
      district: 'Galle',
      district_id: '6',
    },
    {
      param_1: 59,
      param_2: 60,
      param_3: 105,
      param_4: 319,
      district: 'Gampaha',
      district_id: '7',
    },
    {
      param_1: 65,
      param_2: 60,
      param_3: 106,
      param_4: 249,
      district: 'Hambantota',
      district_id: '8',
    },
    {
      param_1: 51,
      param_2: 51,
      param_3: 95,
      param_4: 131,
      district: 'Jaffna',
      district_id: '9',
    },
    {
      param_1: 60,
      param_2: 65,
      param_3: 97,
      param_4: 55,
      district: 'Kalutara',
      district_id: '10',
    },
    {
      param_1: 67,
      param_2: 64,
      param_3: 76,
      param_4: 48,
      district: 'Kandy',
      district_id: '11',
    },
    {
      param_1: 61,
      param_2: 70,
      param_3: 103,
      param_4: 25,
      district: 'Kegalle',
      district_id: '12',
    },
  ];

const valueFormatter = (value) => `${value}g`;

const DemandAxisGridChart = () => {
    return (
        <BarChart
          dataset={dataset}
          yAxis={[{ scaleType: 'band', dataKey: 'district' }]}
          series={[{ dataKey: 'param_4', label: 'Consumed Amount', valueFormatter }]}
          layout="horizontal"
          margin={{ top: 0, bottom: 0, left: 90, right: 0 }}
          grid={{ vertical: true }}
          {...chartSetting}
        />
    );
}

export default DemandAxisGridChart;
