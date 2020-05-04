import React from "react";
import dayjs from "dayjs";
import * as mql from "../../mql_";

interface Props {
  socialAccount: mql.SocialAccount
  totalPoints: number
}

export const Profile: React.FC<Props> = (p: Props) => {
  return <span>
    <p><a target="_blank" rel="noopener noreferrer" href={"https://news.ycombinator.com/user?id=" + p.socialAccount.username}>On HackerNews</a></p>
    <p>karma: {p.socialAccount.points}</p>
    {p.socialAccount && p.socialAccount.createdAt && p.socialAccount.createdAt.unix && p.socialAccount.createdAt.unix.value ?
      <p>created: {dayjs(p.socialAccount.createdAt.unix.value * 1000).format("DD/MM/YYYY")}</p> : null}
    <p>total points: {p.totalPoints}</p>
  </span>
};