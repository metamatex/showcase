import * as mql from "../../mql_";
import * as _ from 'lodash';
import dayjs from "dayjs";

export const toPointsCommentsTimeseries = (ps: mql.Post[]): { x: number, y: number, z: number, title: string, id: mql.ServiceId }[] => {
  return ps.map((p: mql.Post): { x: number, y: number, z: number, title: string, id: mql.ServiceId } => {
    return {
      x: p.createdAt && p.createdAt.unix && p.createdAt.unix.value ? p.createdAt.unix.value : 0,
      y: p.relations && p.relations.favoredBySocialAccounts && p.relations.favoredBySocialAccounts.count ? p.relations.favoredBySocialAccounts.count : 0,
      z: p.totalWasRepliedToByPostsCount ? p.totalWasRepliedToByPostsCount : 0,
      title: p.title && p.title.value ? p.title.value : "",
      id: p.id ? p.id : {},
    }
  })
};

export const toPointsCommentsTimeseriesMap = (psm: { [k: string]: mql.Post[] }): { [k: string]: { x: number, y: number, z: number }[] } => {
  return _.mapValues(psm, toPointsCommentsTimeseries)
};

export const splitByCategory = (ps: mql.Post[]): { [k: string]: mql.Post[] } => {
  return _.groupBy(ps, (p: mql.Post): string => {
    if (!p.title || !p.title.value) {
      return ""
    }

    if (p.title.value.toLowerCase().includes("show hn")) {
      return "show"
    }

    if (p.title.value.toLowerCase().includes("ask hn")) {
      return "ask"
    }

    if (p.title.value.toLowerCase().includes("launch hn")) {
      return "launch"
    }

    return "story"
  })
};


export const getTotalPoints = (posts: mql.Post[]): number => {
  return _.reduce(posts, (sum: number, post: mql.Post) => {
    let a = post && post.relations && post.relations.favoredBySocialAccounts && post.relations.favoredBySocialAccounts.count ? post.relations.favoredBySocialAccounts.count : 0;
    return sum + a;
  }, 0)
};

export const getTotalReplies = (posts: mql.Post[]): number => {
  return _.reduce(posts, (sum: number, p: mql.Post) => {
    let a = p.relations && p.relations.wasRepliedToByPosts && p.relations.wasRepliedToByPosts.count ? p.relations.wasRepliedToByPosts.count : 0;
    return sum + a;
  }, 0)
};

export const getTotalTotalReplies = (posts: mql.Post[]): number => {
  return _.reduce(posts, (sum: number, p: mql.Post) => {
    let a = p.totalWasRepliedToByPostsCount ? p.totalWasRepliedToByPostsCount : 0;
    return sum + a;
  }, 0)
};

export const getCreatedAtDomain = (posts: mql.Post[]): number[] => {
  let accumulator = [0, 0];
  if (posts.length === 0) {
    return accumulator
  } else {
    let post = posts[0];
    let ts = post && post.createdAt && post.createdAt.unix && post.createdAt.unix.value ? post.createdAt.unix.value : 0;

    accumulator = [ts, ts]
  }

  return _.reduce(posts, (accumulator: number[], post: mql.Post) => {
    let ts = post && post.createdAt && post.createdAt.unix && post.createdAt.unix.value ? post.createdAt.unix.value : 0;

    if (ts < accumulator[0]) {
      accumulator[0] = ts
    }

    if (ts > accumulator[1]) {
      accumulator[1] = ts
    }

    return accumulator;
  }, accumulator)
};

export const toMonthlyPointsCommentsSubmissionsTimeseries = (domain: number[], ps: mql.Post[]): { points: number, submissions: number, comments: number }[] => {
  let cursor = dayjs(domain[0] * 1000).startOf('month');
  let end = dayjs(domain[1] * 1000).endOf('month');

  let months: { [k: string]: { points: number, submissions: number, comments: number, ts: number } } = {};
  while (cursor.unix() < end.unix()) {
    months[cursor.valueOf()] = {points: 0, submissions: 0, comments: 0, ts: cursor.valueOf()};
    cursor = cursor.add(1, 'month').startOf("month");
  }

  let reduced = _.chain(ps)
    .groupBy((post: mql.Post) => {
      if (post.createdAt && post.createdAt.unix && post.createdAt.unix.value) {
        return dayjs(post.createdAt.unix.value * 1000).startOf('month').valueOf();
      } else {
        return ""
      }
    })
    .mapValues((ps: mql.Post[]) => {
      return _.reduce(ps, (v: { [k: string]: number }, p: mql.Post) => {
          if (p.relations && p.relations.favoredBySocialAccounts && p.relations.favoredBySocialAccounts.count) {
            v.points = v.points + p.relations.favoredBySocialAccounts.count;
          }

          if (p.totalWasRepliedToByPostsCount) {
            v.comments = v.comments + p.totalWasRepliedToByPostsCount;
          }

          v.submissions = v.submissions + 1;

          return v;
        },
        {points: 0, submissions: 0, comments: 0, ts: 0}
      )
    })
    .value();

  let merged = _.chain(months)
    .mapValues((v: { points: number, submissions: number, comments: number, ts: number }) => {
      if (v.ts in reduced) {
        return reduced[v.ts];
      }

      return v
    })
    .tap((x) => console.log(x))
    .map((v: any, k: string) => {
      v.ts = parseInt(k) / 1000;

      return v
    })
    .sortBy('ts')
    .value() as { points: number, submissions: number, comments: number }[];

  return merged;
};

export const getTopPoster = (posts: mql.Post[]): {author: string, count: number}[] => {
  return _.chain(posts)
    .groupBy((p: mql.Post) => {
      if (p.relations && p.relations.authoredBySocialAccount && p.relations.authoredBySocialAccount.id && p.relations.authoredBySocialAccount.id.value) {
        return p.relations.authoredBySocialAccount.id.value;
      }

      return ""
    })
    .mapValues((posts: mql.Post[]) => posts.length)
    .map((v: number, k: string) => {
      return {author: k, count: v}
    })
    .sortBy("count")
    .reverse()
    .value();
};

export const getTopHost = (posts: mql.Post[]): {host: string, count: number}[] => {
  return _.chain(posts)
    .groupBy((p: mql.Post) => {
      if (p.links && p.links.length > 0 && p.links[0].url  && p.links[0].url.value) {
        let parts = new URL(p.links[0].url.value).hostname.split('.');
        return parts[parts.length - 2] + "." + parts[parts.length - 1];
      }

      return ""
    })
    .mapValues((posts: mql.Post[]) => posts.length)
    .map((v: number, k: string) => {
      return {host: k, count: v}
    })
    .sortBy("count")
    .reverse()
    .value();
};