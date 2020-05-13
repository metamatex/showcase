import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
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
  points: any;
  isMobile: boolean;
}

export const TopAuthorsChart: React.FC<Props> = React.memo((p: Props) => {
  const openNewTab = (e: any) => {
    Object.assign(document.createElement('a'), { target: '_blank', href: 'https://news.ycombinator.com/user?id=' + e.author}).click();
  };

  let onClick: ((e:any) => void)|undefined = undefined;

  if (!p.isMobile) {
    onClick = openNewTab;
  }

  return (
    <ResponsiveContainer width="100%" height={1000}>
      <BarChart margin={{top: 20, right: 20, bottom: 10, left: 70}} data={p.points} layout="vertical">
        <CartesianGrid strokeDasharray="1 5"/>
        <XAxis type="number"/>
        <YAxis type="category" dataKey="author"/>
        <Tooltip/>
        <Legend/>
        <Bar dataKey="count" name="submissions" onClick={onClick} fill="#f6e58d" cursor="pointer"/>
      </BarChart>
    </ResponsiveContainer>
  )
});