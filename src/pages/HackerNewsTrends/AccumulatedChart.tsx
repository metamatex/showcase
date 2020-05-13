import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
  ZAxis
} from 'recharts';
import React from "react";
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat);

interface Props {
  points: any[];
  isMobile: boolean;
  domain: any;
}

const labelFormatter = (label: string | number) : React.ReactNode => {
  label = label as number;

  return <span>{dayjs(label *1000).format("MM/YYYY")}</span>;
};

const CustomTooltip = ({active, payload, label}: TooltipProps) => {
  if (!active || !payload) {
    return null;
  }

  const openNewTab = (e: any) => {
    Object.assign(document.createElement('a'), {
      target: '_blank',
      href: 'https://news.ycombinator.com/item?id=' + e.id.value
    }).click();
  };

  return (
    <div onClick={openNewTab}
         style={{"background": "#fff", "border": "2px solid #ddd", "padding": "3px", "borderRadius": "5px",}}>
      <p>Title: <a href="#" onClick={openNewTab}>{payload[0]["payload"]["title"]}</a></p>
      <p>Date: {dayjs(payload[0]["payload"]["x"] * 1000).format("DD/MM/YYYY")}</p>
      <p>Points: {payload[0]["payload"]["y"]}</p>
      <p>Comments: {payload[0]["payload"]["z"]}</p>
    </div>
  );
};

export const AccumulatedChart: React.FC<Props> = React.memo((p: Props) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart margin={{top: 20, right: 20, bottom: 10, left: -15}} data={p.points}>
        <CartesianGrid strokeDasharray="1 5"/>
        <XAxis dataKey="ts" tickFormatter={(x: number) => dayjs(x *1000).format("MM/YYYY")} type="number" domain={p.domain}/>
        <YAxis scale="sqrt"/>
        <Tooltip cursor={{strokeDasharray: '3 3'}} labelFormatter={labelFormatter}/>
        <Legend/>
        <Line type="monotone" dataKey="submissions" stroke="red" strokeWidth={2} dot={{ strokeWidth: 1 }}/>
        <Line type="monotone" dataKey="points" stroke="green" strokeWidth={2} dot={{ strokeWidth: 1 }}/>
        <Line type="monotone" dataKey="comments" stroke="blue" strokeWidth={2} dot={{ strokeWidth: 1 }}/>
      </LineChart>
    </ResponsiveContainer>
  )
});