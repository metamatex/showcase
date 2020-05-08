import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
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
  domain: any;
  isMobile: boolean;
}

const CustomTooltip = ({active, payload, label}: TooltipProps) => {
  if (!active || !payload) {
    return null;
  }

  return (
    <div style={{"background": "#fff", "border": "2px solid #ddd", "padding": "3px", "borderRadius": "5px",}}>
      <p>Comment: <span dangerouslySetInnerHTML={{__html: payload[0]["payload"]["content"]}}></span></p>
      <p>Date: {dayjs(payload[0]["payload"]["x"] * 1000).format("DD/MM/YYYY")}</p>
      <p>Replies: {payload[0]["payload"]["y"]}</p>
    </div>
  );
};

export const CommentsChart: React.FC<Props> = React.memo((p: Props) => {
  const openNewTab = (e: any) => {
    Object.assign(document.createElement('a'), { target: '_blank', href: 'https://news.ycombinator.com/item?id=' + e.id.value}).click();
  };

  let onClick: ((e:any) => void)|undefined = undefined;

  if (!p.isMobile) {
    onClick = openNewTab;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{top: 20, right: 20, bottom: 10, left: -30}}>
        <CartesianGrid strokeDasharray="1 5"/>
        <XAxis dataKey="x" name="time" tickFormatter={(x: number) => dayjs(x * 1000).format("DD/MM/YYYY")} type="number"
               domain={p.domain}/>
        <YAxis dataKey="y" name="replies" scale="sqrt"/>
        <Tooltip cursor={{strokeDasharray: '3 3'}} content={CustomTooltip}/>
        <Legend/>
        <Scatter name="comment" data={p.points} onClick={onClick} fill="#6ab04c"/>
      </ScatterChart>
    </ResponsiveContainer>
  )
});