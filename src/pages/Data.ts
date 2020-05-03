import * as mql from "../mql_";
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