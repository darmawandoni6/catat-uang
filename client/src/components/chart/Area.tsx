import type { FC } from 'react';

import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Props {
  dataValue: {
    name: string;
    [key: string]: number | string; // dynamic keys allowed
  }[];
}

const AreaComponent: FC<Props> = ({ dataValue }) => {
  const numberFormatter = (value: number): string => {
    if (value < 0) {
      return `-${numberFormatter(value * -1)}`;
    }
    if (value < 1000) {
      return value.toString();
    } else if (value < 1_000_000) {
      // ribuan → "1rb", "100rb"
      return `${Math.floor(value / 1000)}rb`;
    } else {
      // jutaan → "1jt", "1,5jt"
      const juta = value / 1_000_000;
      const formatted = juta % 1 === 0 ? juta.toString() : juta.toFixed(1).replace('.', ','); // ganti titik → koma
      return `${formatted}jt`;
    }
  };

  const separator = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <ComposedChart
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
        <YAxis tickFormatter={numberFormatter} />
        <Tooltip formatter={value => separator(Number(value))} />
        <Line type="monotone" dataKey="balance" stroke="#0891b280" />
        <Bar dataKey="income" barSize={10} fill="#0891b2" />
        <Bar dataKey="expanse" barSize={10} fill="#ec4899" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default AreaComponent;
