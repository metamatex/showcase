import React from 'react';
import * as mql from "../mql_";
import './HackerNewsUserActivity/style.css';
import {Error} from "../components/Error";
import * as transform from "./HackerNewsTrends/transform";
import {Chart} from "./HackerNewsTrends/Chart";
import {AccumulatedChart} from "./HackerNewsTrends/AccumulatedChart";
import {TopAuthorsChart} from "./HackerNewsTrends/TopAuthorsChart";
import {TopHostsChart} from "./HackerNewsTrends/TopHostsChart";
import * as _ from 'lodash';
import {Warning} from "../components/Warning";

interface Props {
  client: mql.Client
  color: string;
}

export const HackerNewsTrends: React.FC<Props> = (p: Props) => {
  let [topic, setTopic] = React.useState("");
  let [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<mql.Error[]>([]);
  const [warnings, setWarnings] = React.useState<mql.Warning[]>([]);
  const [posts, setPosts] = React.useState<mql.Post[]>([]);
  const [totalPoints, setTotalPoints] = React.useState<number>(0);
  const [totalTotalReplies, setTotalTotalReplies] = React.useState<number>(0);
  const [totalReplies, setTotalReplies] = React.useState<number>(0);
  const [domain, setDomain] = React.useState<number[]>([]);

  const isMobile = (window.screen.width) < 576;

  const loadSearch = (topic: string) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const fetch = async () => {
      let loop = true;
      let next: mql.ServicePage[] = [];
      let posts: mql.Post[] = [];

      setErrors([]);

      while (loop) {
        let rsp = await p.client.GetPosts({
          serviceFilter: {
            id: {
              value: {
                is: "hackernews",
              }
            }
          },
          mode: {
            kind: mql.GetModeKind.Search,
            search: {
              term: topic,
            },
          },
          pages: next,
        });

        let totalPoints: number = 0;
        let totalReplies: number = 0;
        let totalTotalReplies: number = 0;
        let domain: number[] = [];

        if (rsp.posts) {
          let postPosts = _.filter(rsp.posts, (post) => {
            return post.kind === mql.PostKind.Post
          });

          posts = posts.concat(postPosts);
          domain = transform.getCreatedAtDomain(posts);

          totalPoints = transform.getTotalPoints(posts);
          totalTotalReplies = transform.getTotalTotalReplies(posts);
          totalReplies = transform.getTotalReplies(posts);

          setDomain(domain);
          setTotalPoints(totalPoints);
          setPosts(posts);
          setTotalReplies(totalReplies);
          setTotalTotalReplies(totalTotalReplies);
        }

        if (rsp.errors) {
          setErrors(errors.concat(rsp.errors))
        }

        if (rsp.warnings) {
          setWarnings(warnings.concat(rsp.warnings))
        }

        if (rsp.pagination && rsp.pagination.next) {
          next = rsp.pagination.next;
        } else {
          loop = false;
        }
      }

      setIsLoading(false);

      console.log(transform.getTopHost(posts));
    };

    fetch().catch((reason: any) => {
      setIsLoading(false);

      setErrors([{
        message: reason.message,
      }])
    });
  };


  const renderInfo = () => {
    return <>
      <h5>How?</h5>
      <p>This app is powered by MetaMate. For the client to obtain all the data it needs, it simply sends the following
        query, and MetaMate aggregates the requested data under the hood</p>
      <div style={{
        background: '#ffffff',
        overflow: 'auto',
        width: 'auto',
        fontSize: "14px",
        border: 'solid gray',
        borderWidth: '.1em .1em .1em .8em',
        padding: '.2em .6em'
      }}>
        <pre style={{margin: 0, lineHeight: '125%'}}><span
          style={{color: '#228899', fontWeight: 'bold'}}>let</span> rsp <span style={{color: '#333333'}}>=</span> await p.client.GetPosts({"{"}{"\n"}{"  "}serviceFilter<span
          style={{color: '#333333'}}>:</span> {"{"}{"\n"}{"    "}id<span
          style={{color: '#333333'}}>:</span> {"{"}{"\n"}{"      "}value<span
          style={{color: '#333333'}}>:</span> {"{"}{"\n"}{"        "}is<span style={{color: '#333333'}}>:</span> <span
          style={{backgroundColor: '#e0e0ff'}}>"hackernews"</span>,{"\n"}{"      "}{"}"}{"\n"}{"    "}{"}"}{"\n"}{"  "}{"}"},{"\n"}{"  "}mode<span
          style={{color: '#333333'}}>:</span> {"{"}{"\n"}{"    "}search<span
          style={{color: '#333333'}}>:</span> {"{"}{"\n"}{"      "}term: <span style={{
          color: '#6666ff',
          fontWeight: 'bold'
        }}>term</span>,{"\n"}{"    "}{"}"},{"\n"}{"  "}{"}"},{"\n"}{"}"});{"\n"}</pre>
      </div>
      <p><a target="_blank" rel="noopener " style={{"color": p.color}} href="https://github.com/metamatex/showcase">Source
        code</a></p>
      <hr/>
      <p>Check out MetaMate's HackerNews service here: <a target="_blank" rel="noopener " style={{"color": p.color}}
                                                          href="https://metamate.io/blog/most-advanced-hackernews-api/">Most
        advanced HackerNews API</a></p>
    </>
  };

  const renderLikeIt = () => {
    return <>
      <h6>Do you like it?</h6>
      <hr/>
      <p>Please consider leaving a star on <a target="_blank" rel="noopener " style={{"color": p.color}}
                                              href="https://github.com/metamatex/metamate">github</a></p>
    </>
  };

  return <div>
    {errors ? errors.map(error => <Error
      error={error}/>) : null}
    <div className="row">
      <div className="col-12">
        <p>Enter a topic to see statistics, trends charts and leaderboards or try&nbsp;
          <a href="#" onClick={() => {
            setTopic("graphql");
            loadSearch("graphql")
          }}>graphql</a>,&nbsp;
          <a href="#" onClick={() => {
            setTopic("kubernetes");
            loadSearch("kubernetes")
          }}>kubernetes</a>,&nbsp;
          <a href="#" onClick={() => {
            setTopic("hashicorp.com");
            loadSearch("hashicorp.com")
          }}>hashicorp.com</a>,&nbsp;
          <a href="#" onClick={() => {
            setTopic("Elon Musk");
            loadSearch("Elon Musk")
          }}>Elon Musk</a>,&nbsp;
          <a href="#" onClick={() => {
            setTopic("ethereum");
            loadSearch("ethereum")
          }}>ethereum</a>
        </p>
      </div>
    </div>
    <div className="row">
      <div className="col-12 col-md-3">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="topic"
                 onChange={(e: any) => setTopic(e.target.value)}
                 onKeyDown={(e: any) => e.key === "Enter" ? loadSearch(topic) : null}
                 value={topic}/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button"
                    onClick={(e: any) => loadSearch(topic)}>
              {isLoading ? <span>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span> Loading...</span>
            </span> :
                <span>Show</span>
              }
            </button>
          </div>
        </div>
        <div className="alert alert-success d-none d-md-block" role="alert">
          {renderInfo()}
        </div>
        <div className="alert alert-warning d-none d-md-block" role="alert">
          {renderLikeIt()}
        </div>
      </div>
      <div className="col-12 col-md-9">
        {warnings ? warnings.map(warning => <Warning
          warning={warning}/>) : null}
        <PostsCharts posts={posts} isMobile={isMobile} totalPoints={totalPoints}
                     totalTotalReplies={totalTotalReplies} domain={domain}/>
        <AccumulatedChartView posts={posts} isMobile={isMobile} domain={domain}/>
        <div className="row">
          <div className="col-12 col-md-6">
            <TopAuthorChartView posts={posts} isMobile={isMobile}/>
          </div>
          <div className="col-12 col-md-6">
            <TopHostsChartView posts={posts} isMobile={isMobile}/>
          </div>
        </div>
        <div className="alert alert-success d-md-none" role="alert">
          {renderInfo()}
        </div>
        <div className="alert alert-warning d-md-none" role="alert">
          {renderLikeIt()}
        </div>
      </div>
    </div>
    {/*<textarea value={YAML.stringify(authorsReplies)} readOnly style={{"width": "100%", "height": "2000px",}}/>*/}
  </div>
};

interface PostsChartsProps {
  posts: mql.Post[]
  isMobile: boolean;
  totalPoints: number;
  totalTotalReplies: number;
  domain: any;
}

export const PostsCharts: React.FC<PostsChartsProps> = React.memo((p: PostsChartsProps) => {
  if (p.posts.length === 0) {
    return null;
  }

  let postsPerCategory = transform.splitByCategory(p.posts);

  let psm = transform.toPointsCommentsTimeseriesMap(postsPerCategory);

  return <div>
    <span style={{"fontSize": "20px"}}>{p.posts.length} Submissions</span><br/>
    <span>total points: {p.totalPoints}</span>&nbsp;&nbsp;&nbsp;
    <span>avg points: {Math.round(((p.totalPoints ? p.totalPoints : 1) / p.posts.length) * 100) / 100}</span><br/>
    <span>total comments: {p.totalTotalReplies}</span>&nbsp;&nbsp;&nbsp;
    <span>avg comments: {Math.round(((p.totalTotalReplies ? p.totalTotalReplies : 1) / p.posts.length) * 100) / 100}</span><br/>
    <br/>
    <span>points</span>
    <Chart isMobile={p.isMobile} domain={p.domain} points={psm}/>
  </div>
});

interface AccumulatedChartViewsProps {
  posts: mql.Post[]
  isMobile: boolean;
  domain: any;
}

export const AccumulatedChartView: React.FC<AccumulatedChartViewsProps> = React.memo((p: AccumulatedChartViewsProps) => {
  if (p.posts.length === 0) {
    return null;
  }

  let monthlyTs = transform.toMonthlyPointsCommentsSubmissionsTimeseries(p.domain, p.posts);

  return <div>
    <span style={{"fontSize": "20px"}}>submissions / points / comments per month</span><br/>
    <br/>
    <AccumulatedChart isMobile={p.isMobile} domain={p.domain} points={monthlyTs}/>
  </div>
});

interface TopAuthorChartViewsProps {
  posts: mql.Post[]
  isMobile: boolean;
}

export const TopAuthorChartView: React.FC<TopAuthorChartViewsProps> = React.memo((p: TopAuthorChartViewsProps) => {
  if (p.posts.length === 0) {
    return null;
  }

  let data = transform.getTopPoster(p.posts);

  return <div>
    <span style={{"fontSize": "20px"}}>Authors</span><br/>
    <span>total: {data.length}</span><br/>
    <br/>
    <span>Top 30</span>
    <TopAuthorsChart isMobile={p.isMobile} points={data.slice(0, 30)}/>
  </div>
});

interface TopHostsChartViewsProps {
  posts: mql.Post[]
  isMobile: boolean;
}

export const TopHostsChartView: React.FC<TopHostsChartViewsProps> = React.memo((p: TopHostsChartViewsProps) => {
  if (p.posts.length === 0) {
    return null;
  }

  let data = transform.getTopHost(p.posts);

  return <div>
    <span style={{"fontSize": "20px"}}>Hosts</span><br/>
    <span>total: {data.length}</span><br/>
    <br/>
    <span>Top 30</span>
    <TopHostsChart isMobile={p.isMobile} points={data.slice(0, 30)}/>
  </div>
});