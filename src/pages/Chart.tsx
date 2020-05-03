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
import * as mql from "../mql_";

dayjs.extend(advancedFormat);

interface Props {
  points: { [k: string]: any[] };
  setId: (id: mql.ServiceId) => void;
}

const CustomTooltip = ({active, payload, label}: TooltipProps) => {
  if (!active || !payload) {
    return null;
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded p-1">
      <p>Title: {payload[0]["payload"]["title"]}</p>
      <p>Date: {dayjs(payload[0]["payload"]["x"] * 1000).format("DD/MM/YYYY")}</p>
      <p>Points: {payload[0]["payload"]["y"]}</p>
    </div>
  );
};

export const Chart: React.FC<Props> = (p: Props) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <ScatterChart margin={{top: 20, right: 20, bottom: 10, left: 10}}>
        <CartesianGrid strokeDasharray="1 5"/>
        <XAxis dataKey="x" name="time" tickFormatter={(x: number) => dayjs(x * 1000).format("DD/MM/YYYY")} type="number"
               domain={['dataMin', 'dataMax']}/>
        <YAxis dataKey="y" name="points" scale="sqrt"/>
        <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km"/>
        <Tooltip cursor={{strokeDasharray: '3 3'}} content={CustomTooltip}/>
        <Legend/>
        <Scatter name="show" data={p.points["show"]} fill="#f6e58d" onMouseEnter={(e:any)=> {p.setId(e.id)}}/>
        <Scatter name="story" data={p.points["story"]} fill="#ff7979" onMouseEnter={(e:any)=> {p.setId(e.id)}}/>
        <Scatter name="ask" data={p.points["ask"]} fill="#4834d4" onMouseEnter={(e:any)=> {p.setId(e.id)}}/>
        <Scatter name="launch" data={p.points["launch"]} fill="#6ab04c" onMouseEnter={(e:any)=> {p.setId(e.id)}}/>
      </ScatterChart>
    </ResponsiveContainer>
  )
};