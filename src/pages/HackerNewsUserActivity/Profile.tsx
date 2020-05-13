import React from "react";
import dayjs from "dayjs";
import * as mql from "../../mql_";

interface Props {
  socialAccount: mql.SocialAccount
  color: string;
}

export const Profile: React.FC<Props> = (p: Props) => {
  return <span>
    <p><a style={{"color": p.color}} target="_blank" rel="noopener" href={"https://news.ycombinator.com/user?id=" + p.socialAccount.username}>On HackerNews</a></p>
    <p>karma: {p.socialAccount.points}</p>
    {p.socialAccount && p.socialAccount.createdAt && p.socialAccount.createdAt.unix && p.socialAccount.createdAt.unix.value ?
      <p>created: {dayjs(p.socialAccount.createdAt.unix.value * 1000).format("DD/MM/YYYY")}</p> : null}
  </span>
};