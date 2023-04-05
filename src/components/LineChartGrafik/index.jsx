import { getCurrencyString } from '@helpers/curency';
import React from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import style from './styles/main.module.scss';

const LineChartGrafik = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={style.tooltip}>
          <p className="label">{`Utang Saya : ${getCurrencyString(payload[0].value)}`}</p>
          <p className="label">{`Utang Pelanggan : ${getCurrencyString(payload[1].value)}`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="utangPelanggan" fill="#ff3332" />
        <Bar dataKey="utangSaya" fill="#03a651" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default React.memo(LineChartGrafik);
