import React from 'react';
import * as mql from "../mql_";
import axios from 'axios';
import YAML from 'yaml';
import {Chart} from "./Chart";
import * as data from "./Data";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);


export const Post: React.FC = () => {
  const [getPostFeedsRsp, setGetPostFeedsRsp] = React.useState<mql.GetPostFeedsResponse>();
  const [id, setId] = React.useState<mql.ServiceId>();
  let done = true;

  let opts: mql.ClientOpts = {
    addr: "http://localhost/httpjson",
    client: axios.create(),
  };

  let c = new mql.Client(opts);

  React.useEffect( () => {
    const fetch = async () => {
      let rsp = await c.GetPostFeeds({
        serviceFilter: {
          name: {
            is: "hackernews"
          }
        },
        filter: {
          id: {
            value: {
              is: "topstories"
            }
          }
        },
        relations: {
          containsPosts: {}
        }
      });

      setGetPostFeedsRsp(rsp);
    };

    fetch();
  }, [done]);


  const getPosts = (rsp: mql.GetPostFeedsResponse): mql.Post[] => {
    if (!rsp.postFeeds) {
      return [];
    }

    let pf = rsp.postFeeds[0];

    if (!pf.relations || !pf.relations.containsPosts || !pf.relations.containsPosts.posts) {
      return [];
    }

    return pf.relations.containsPosts.posts;
  };

  const renderPostFeeds = () => {
    if (!getPostFeedsRsp) {
      return
    }

    let ps = getPosts(getPostFeedsRsp);

    return renderPosts(ps.slice(1, 50))
  };

  const renderPosts = (ps: mql.Post[]) => {
    let refs : {[k: string]: React.Ref<any> } = {};

    return <ul>
      {ps.map((p: mql.Post) => {
        if (!p.id) {
          return
        }

        let ref = React.createRef();
        refs[data.serviceIdToString(p.id)] = ref;

        let isHighlighted = false;
        if (id && p.id == id) {
          isHighlighted = true;
        }

        return <PostComponent post={p} isHighlighted={isHighlighted} ref={ref}/>
      })}
    </ul>
  };

  const renderChart = () => {
    if (!getPostFeedsRsp) {
      return
    }

    let ps = getPosts(getPostFeedsRsp);

    let postsPerCategory = data.splitByCategory(ps);

    let psm = data.toPointsCommentsTimeseriesMap(postsPerCategory);

    return <Chart points={psm} setId={setId}/>
  };

  return <div>
    <h1>Post</h1>
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1">{ renderPostFeeds() }</div>
      <div className="col-span-2">{ renderChart() }</div>
    </div>
  </div>;
};

interface Props {
  post: mql.Post
  isHighlighted: boolean
  ref: React.Ref<any>
}

export const PostComponent: React.FC<Props> = (p: Props) => {
  let host: string = "";

  if (p.post.links && p.post.links.length > 0 && p.post.links[0].url && p.post.links[0].url.value) {
    host = new URL(p.post.links[0].url.value).host
  }

  let ref = React.useRef(null);

  let className = "bg-gray-100 border-2 border-orange-500 rounded m-1 p-1";
  if (p.isHighlighted) {
    className = "bg-gray-100 border-2 border-orange-500 rounded m-1 p-1 bg-orange-200";
  }

  return <div ref={p.ref} className={className}>
    <p>
      <span>{p.post.title && p.post.title.value ? p.post.title.value : null} </span>
      <span className="text-gray-700">({host ? host : null})</span>
    </p>
    <p className="text-sm text-gray-700">
      <span>{p.post.relations && p.post.relations.favoredBySocialAccounts && p.post.relations.favoredBySocialAccounts.count ? p.post.relations.favoredBySocialAccounts.count : null} </span>
      <span>points by </span>
      <span>{p.post.relations && p.post.relations.authoredBySocialAccount && p.post.relations.authoredBySocialAccount.username ? p.post.relations.authoredBySocialAccount.username : null} </span>
      <span>{p.post.createdAt && p.post.createdAt.unix && p.post.createdAt.unix.value ? dayjs(1000*p.post.createdAt.unix.value).fromNow(): null} </span>
      <span> | xxx comments </span>
    </p>
  </div>
};

export const PostComponent0: React.FC<Props> = (p: Props) => {
  return <ul>
    <p>
      <textarea>
        {YAML.stringify(p.post)}
      </textarea>

    </p>
    <li>
      Title: {p.post.title && p.post.title.value ? p.post.title.value : null}
    </li>
    <li>
      Content: {p.post.content && p.post.content.value ? p.post.content.value : null}
    </li>
    <li>
      Upvotes: {p.post.relations && p.post.relations.favoredBySocialAccounts && p.post.relations.favoredBySocialAccounts ? p.post.relations.favoredBySocialAccounts.count : null}
    </li>
    <li>
      Links: {p.post.links ? p.post.links.map((l: mql.HyperLink)=>{
      return <a target="_blank" rel="noopener noreferrer" href={l.url ? l.url.value:"#"}>{l.label}</a>
    }) : null}
    </li>

  </ul>
};

export const Post0: React.FC = () => {
  const [getPostFeedsRsp, setGetPostFeedsRsp] = React.useState<mql.GetPostFeedsResponse>({});

  let opts: mql.ClientOpts = {
      addr: "https://metamate.one/httpjson",
      client: axios.create(),
  };

  let c = new mql.Client(opts);

  React.useEffect( () => {
    const fetch = async () => {
      let rsp = await c.GetPostFeeds({
        serviceFilter: {
          name: {
            is: "hackernews"
          }
        }
      });

      setGetPostFeedsRsp(rsp);
    };

    fetch();
  });

  const renderPostFeeds = () => {
    if (!getPostFeedsRsp || !getPostFeedsRsp.postFeeds) {
      return null;
    }

    return <div>
      {getPostFeedsRsp.postFeeds.map((f: mql.PostFeed) => {
        if (!f.id) {
          return null;
        }

        if (!f.info || !f.info.name) {
          return null;
        }

        return <h3 key={f.id.value}>{f.info.name.value}</h3>
      })}
    </div>
  };

  return <div>
    <h1>Post</h1>
    { renderPostFeeds() }
  </div>;
};

