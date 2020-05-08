import React from 'react';
import * as mql from "../mql_";

interface Props {
  warning: mql.Warning
}

export const Warning: React.FC<Props> = (p: Props) => {
  return <div className="alert alert-warning" role="alert">
    <p>{p.warning.message}</p>
  </div>
};