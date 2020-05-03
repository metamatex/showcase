import React from 'react';
import * as mql from "../mql_";

interface Props {
  error: mql.Error
}

export const Error: React.FC<Props> = (p: Props) => {
  switch (p.error.kind) {
    case mql.ErrorKind.IdNotPresent:
      return <IdNotPresentError error={p.error} />;
    default:
      return <MessageError error={p.error} />;
  }
};

export const IdNotPresentError: React.FC<Props> = (p: Props) => {
  return <div className="alert alert-danger" role="alert">
    id not found
  </div>
};

export const MessageError: React.FC<Props> = (p: Props) => {
  return <div className="alert alert-danger" role="alert">
    <p>{p.error.message}</p>
  </div>
};
