import { FC } from 'react';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Props {
  dataValue: {
    name: string;
    [key: string]: number | string; // dynamic keys allowed
  }[];
}

const AreaComponent: FC<Props> = ({ dataValue }) => {
  const dataKey = Object.keys(dataValue[0])[1];

  const numberFormatter = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value); // 1,000 → 1,000
  };
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        width={500}
        height={200}
        data={dataValue}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ className: 'max-sm:text-xs' }} />
        <YAxis tickFormatter={numberFormatter} tick={{ className: 'max-sm:text-xs' }} />
        <Tooltip formatter={value => numberFormatter(Number(value))} />

        <Area type="monotone" dataKey={dataKey} stroke="#0891b2" fill="#0891b2" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaComponent;
