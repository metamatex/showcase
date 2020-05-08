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
  points: { [k: string]: any[] };
  domain: any;
  isMobile: boolean;
}

const CustomTooltip = ({active, payload, label}: TooltipProps) => {
  if (!active || !payload) {
    return null;
  }

  const openNewTab = (e: any) => {
    Object.assign(document.createElement('a'), { target: '_blank', href: 'https://news.ycombinator.com/item?id=' + e.id.value}).click();
  };

  return (
    <div onClick={openNewTab} style={{"background": "#fff", "border": "2px solid #ddd", "padding": "3px", "borderRadius": "5px",}}>
      <p>Title: <a href="#" onClick={openNewTab}>{payload[0]["payload"]["title"]}</a></p>
      <p>Date: {dayjs(payload[0]["payload"]["x"] * 1000).format("DD/MM/YYYY")}</p>
      <p>Points: {payload[0]["payload"]["y"]}</p>
      <p>Comments: {payload[0]["payload"]["z"]}</p>
    </div>
  );
};

export const Chart: React.FC<Props> = React.memo((p: Props) => {
  const openNewTab = (e: any) => {
    Object.assign(document.createElement('a'), { target: '_blank', href: 'https://news.ycombinator.com/item?id=' + e.id.value}).click();
  };

  let onClick: ((e:any) => void)|undefined = undefined;

  if (!p.isMobile) {
    onClick = openNewTab;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{top: 20, right: 20, bottom: 10, left: -15}}>
        <CartesianGrid strokeDasharray="1 5"/>
        <XAxis dataKey="x" name="time" tickFormatter={(x: number) => dayjs(x * 1000).format("DD/MM/YYYY")} type="number"
               domain={p.domain}/>
        <YAxis dataKey="y" name="points" scale="sqrt"/>
        <ZAxis dataKey="z" range={[50, 1000]} name="comments"/>
        <Tooltip cursor={{strokeDasharray: '3 3'}} content={CustomTooltip}/>
        <Legend/>
        <Scatter name="show" data={p.points["show"]} onClick={onClick} fill="#f6e58d"/>
        <Scatter name="story" data={p.points["story"]} onClick={onClick} fill="#ff7979"/>
        <Scatter name="ask" data={p.points["ask"]} onClick={onClick} fill="#4834d4"/>
        <Scatter name="launch" data={p.points["launch"]} onClick={onClick} fill="#6ab04c"/>
      </ScatterChart>
    </ResponsiveContainer>
  )
});