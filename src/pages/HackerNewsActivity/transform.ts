import * as mql from "../../mql_";
import * as _ from 'lodash';

export const toPointsCommentsTimeseries = (ps: mql.Post[]): { x: number, y: number, z: number, title: string, id: mql.ServiceId }[] => {
  return ps.map((p: mql.Post): { x: number, y: number, z: number, title: string, id: mql.ServiceId } => {
    return {
      x: p.createdAt && p.createdAt.unix && p.createdAt.unix.value ? p.createdAt.unix.value: 0,
      y: p.relations && p.relations.favoredBySocialAccounts && p.relations.favoredBySocialAccounts.count ? p.relations.favoredBySocialAccounts.count: 0,
      z: p.relations && p.relations.wasRepliedToByPosts && p.relations.wasRepliedToByPosts.count ? p.relations.wasRepliedToByPosts.count : 0,
      title: p.title && p.title.value ? p.title.value: "",
      id: p.id ? p.id: {},
    }
  })
};

export const toPointsCommentsTimeseriesMap = (psm: {[k: string]: mql.Post[]}): {[k: string]:{ x: number, y: number, z: number }[]} => {
  return _.mapValues(psm, toPointsCommentsTimeseries)
};

export const splitByCategory = (ps: mql.Post[]): { [k: string]:mql.Post[] } => {
  return _.groupBy(ps, (p: mql.Post):string => {
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

export const serviceIdToString = (id: mql.ServiceId): string => {
  return id.serviceName + "/" + id.value
};

export const getTotalPoints = (posts: mql.Post[]): number => {
  return _.reduce(posts, (sum: number, post: mql.Post) => {
    let a = post && post.relations && post.relations.favoredBySocialAccounts && post.relations.favoredBySocialAccounts.count ? post.relations.favoredBySocialAccounts.count : 0;
    return sum + a;
  }, 0)
};

export const getCreatedAtDomain = (posts: mql.Post[]): number[] => {
  let accumulator = [0,0];
  if (posts.length == 0) {
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

export const getMaxDomain = (domains: number[][]): number[] => {
  let accumulator = [0,0];
  if (domains.length == 0) {
    return accumulator
  } else {
    accumulator = domains[0];
  }

  return _.reduce(domains, (accumulator: number[], domain: number[]) => {
    if (domain[0] < accumulator[0]) {
      accumulator[0] = domain[0]
    }

    if (domain[1] > accumulator[1]) {
      accumulator[1] = domain[1]
    }

    return accumulator;
  }, accumulator)
};