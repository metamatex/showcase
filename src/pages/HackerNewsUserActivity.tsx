import React from 'react';
import * as mql from "../mql_";
import './HackerNewsUserActivity/style.css';
import {Error} from "../components/Error";
import * as transform from "./HackerNewsUserActivity/transform";
import {Chart} from "./HackerNewsUserActivity/Chart";
import {CommentsChart} from "./HackerNewsUserActivity/CommentsChart";
import {Profile} from "./HackerNewsUserActivity/Profile";
import * as _ from 'lodash';

interface Props {
  client: mql.Client
  color: string;
}

export const HackerNewsUserActivity: React.FC<Props> = (p: Props) => {
  let [username, setUsername] = React.useState("");
  let [isLoading, setIsLoading] = React.useState(false);
  const [socialAccount, setSocialAccount] = React.useState<mql.SocialAccount>();
  const [errors, setErrors] = React.useState<mql.Error[]>();
  const [authorsPosts, setAuthorsPosts] = React.useState<mql.Post[]>([]);
  const [authorsReplies, setAuthorsReplies] = React.useState<mql.Post[]>([]);
  const [bookmarksPosts, setBookmarksPosts] = React.useState<mql.Post[]>([]);
  const [maxDomain, setMaxDomain] = React.useState<number[]>([]);
  const [totalPoints, setTotalPoints] = React.useState<number>();
  const [totalTotalReplies, setTotalTotalReplies] = React.useState<number>();
  const [totalReplies, setTotalReplies] = React.useState<number>();

  const isMobile = (window.screen.width) < 576;

  const loadSocialAccount = () => {
    setIsLoading(true);

    const fetch = async () => {
      let rsp = await p.client.GetSocialAccounts({
        mode: {
          kind: mql.GetModeKind.Id,
          id: {
            kind: mql.IdKind.ServiceId,
            serviceId: {
              serviceName: "hackernews",
              value: username,
            }
          },
        },
        relations: {
          authorsPosts: {},
          bookmarksPosts: {},
        }
      });

      let socialAccount: mql.SocialAccount | undefined = undefined;
      let authorsPosts: mql.Post[] = [];
      let authorsReplies: mql.Post[] = [];
      let bookmarksPosts: mql.Post[] = [];
      let totalPoints: number = 0;
      let totalReplies: number = 0;
      let totalTotalReplies: number = 0;

      if (rsp.socialAccounts && rsp.socialAccounts.length === 1) {
        socialAccount = rsp.socialAccounts[0];
      }

      if (rsp.errors) {
        setErrors(rsp.errors)
      } else {
        setErrors([])
      }

      if (socialAccount && socialAccount.relations && socialAccount.relations.authorsPosts && socialAccount.relations.authorsPosts.posts) {
        let posts = socialAccount.relations.authorsPosts.posts;

        authorsPosts = _.filter(posts, (post) => {
          return post.kind === mql.PostKind.Post
        });

        authorsReplies = _.filter(posts, (post) => {
          return post.kind === mql.PostKind.Reply
        });

        totalPoints = transform.getTotalPoints(authorsPosts);
        totalTotalReplies = transform.getTotalTotalReplies(authorsPosts);
        totalReplies = transform.getTotalReplies(authorsReplies);
      }

      if (socialAccount && socialAccount.relations && socialAccount.relations.bookmarksPosts && socialAccount.relations.bookmarksPosts.posts) {
        bookmarksPosts = socialAccount.relations.bookmarksPosts.posts;
      }

      let authorsPostsDomain = transform.getCreatedAtDomain(authorsPosts);
      let bookmarksPostsDomain = transform.getCreatedAtDomain(bookmarksPosts);
      let authorsRepliesDomain = transform.getCreatedAtDomain(authorsReplies);

      let maxDomain = transform.getMaxDomain([
        authorsPostsDomain,
        bookmarksPostsDomain,
        authorsRepliesDomain,
      ]);

      setMaxDomain(maxDomain);

      setIsLoading(false);
      setSocialAccount(socialAccount);
      setAuthorsPosts(authorsPosts);
      setBookmarksPosts(bookmarksPosts);
      setAuthorsReplies(authorsReplies);
      setTotalPoints(totalPoints);
      setTotalReplies(totalReplies);
      setTotalTotalReplies(totalTotalReplies);
    };

    fetch().catch((reason: any) => {
      setIsLoading(false);

      setErrors([{
        message: reason.message,
      }])
    });
  };

  const renderSubmissionsChart = () => {
    if (authorsPosts.length === 0) {
      return
    }

    let postsPerCategory = transform.splitByCategory(authorsPosts);

    let psm = transform.toPointsCommentsTimeseriesMap(postsPerCategory);

    return <div>
      <span style={{"fontSize": "20px"}}>{authorsPosts.length} Submissions</span><br/>
      <span>total points: {totalPoints}</span>&nbsp;&nbsp;&nbsp;
      <span>avg points: {Math.round(((totalPoints ? totalPoints : 1) / authorsPosts.length) * 100) / 100}</span><br/>
      <span>total comments: {totalTotalReplies}</span>&nbsp;&nbsp;&nbsp;
      <span>avg comments: {Math.round(((totalTotalReplies ? totalTotalReplies : 1) / authorsPosts.length) * 100) / 100}</span><br/>
      <br/>
      <span>points</span>
      <Chart isMobile={isMobile} domain={maxDomain} points={psm}/>
    </div>
  };

  const renderFavoritesChart = () => {
    if (bookmarksPosts.length === 0) {
      return
    }

    let postsPerCategory = transform.splitByCategory(bookmarksPosts);

    let psm = transform.toPointsCommentsTimeseriesMap(postsPerCategory);

    return <div>
      <span style={{"fontSize": "20px"}}>{bookmarksPosts.length} Favorites</span><br/>
      <br/>
      <span>points</span>
      <Chart isMobile={isMobile} domain={maxDomain} points={psm}/>
    </div>
  };

  const renderRepliesChart = () => {
    if (authorsReplies.length === 0) {
      return
    }

    let psm = transform.toCommentsTimeseries(authorsReplies);

    return <div>
      <span style={{"fontSize": "20px"}}>{authorsReplies.length} Comments</span><br/>
      <span>total replies: {totalReplies}</span>&nbsp;&nbsp;&nbsp;
      <span>avg replies: {Math.round(((totalReplies ? totalReplies : 1) / authorsReplies.length) * 100) / 100}</span><br/>
      <br/>
      <span>replies</span>
      <CommentsChart domain={maxDomain} points={psm} isMobile={isMobile}/>
    </div>
  };

  const renderProfile = () => {
    if (!socialAccount || !totalPoints) {
      return
    }

    return <Profile color={p.color} socialAccount={socialAccount}/>
  };

  const renderInfo = () => {
    return <>
      <h5>How?</h5>
      <p>This app is powered by MetaMate. For the client to obtain all the data it needs, it simply sends the following query, and MetaMate aggregates the requested data under the hood</p>
      <div style={{background: '#ffffff', fontSize: "13.5px", overflow: 'auto', width: 'auto', border: 'solid gray', borderWidth: '.1em .1em .1em .1em', padding: '.2em .6em'}}><pre style={{margin: 0, lineHeight: '125%'}}><span style={{color: '#228899', fontWeight: 'bold'}}>let</span> rsp <span style={{color: '#333333'}}>=</span> await client.GetSocialAccounts({"{"}{"\n"}{"  "}mode<span style={{color: '#333333'}}>:</span> {"{"}{"\n"}{"    "}id<span style={{color: '#333333'}}>:</span> {"{"}{"\n"}{"      "}serviceId<span style={{color: '#333333'}}>:</span> {"{"}{"\n"}{"        "}serviceName<span style={{color: '#333333'}}>:</span> <span style={{backgroundColor: '#e0e0ff'}}>"hackernews"</span>,{"\n"}{"        "}value: <span style={{color: '#6666ff', fontWeight: 'bold'}}>username</span>,{"\n"}{"      "}{"}"}{"\n"}{"    "}{"}"},{"\n"}{"  "}{"}"},{"\n"}{"  "}relations<span style={{color: '#333333'}}>:</span> {"{"}{"\n"}{"    "}authorsPosts<span style={{color: '#333333'}}>:</span> {"{"}{"}"},{"\n"}{"    "}bookmarksPosts<span style={{color: '#333333'}}>:</span> {"{"}{"}"},{"\n"}{"  "}{"}"}{"\n"}{"}"});{"\n"}</pre></div>
      <p><a target="_blank" rel="noopener " style={{"color": p.color}} href="https://github.com/metamatex/showcase">Source code</a></p>
      <hr/>
      <p>Check out MetaMate's HackerNews service here:  <a target="_blank" rel="noopener " style={{"color": p.color}} href="https://metamate.io/blog/most-advanced-hackernews-api/">Most advanced HackerNews API</a></p>
    </>
  };

  return <div>
    {errors ? errors.map(error => <Error
      error={error}/>) : null}
    <div className="row">
      <div className="col-12">
        <p>Enter a HackerNews username to see statistics for submissions, comments and favorites</p>
      </div>
    </div>
    <div className="row">
      <div className="col-12 col-md-3">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="username"
                 onChange={(e: any) => setUsername(e.target.value)}
                 onKeyDown={(e: any) => e.key === "Enter" ? loadSocialAccount() : null}/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button"
                    onClick={(e: any) => loadSocialAccount()}>
              {isLoading ? <span>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span> Loading...</span>
            </span> :
                <span>Show</span>
              }
            </button>
          </div>
        </div>
        {renderProfile()}
        <div className="alert alert-success d-none d-md-block" role="alert">
          {renderInfo()}
        </div>
      </div>
      <div className="col-12 col-md-9">
        {renderSubmissionsChart()}
        {renderRepliesChart()}
        {renderFavoritesChart()}
        <div className="alert alert-success d-md-none" role="alert">
          {renderInfo()}
        </div>
      </div>
    </div>
    {/*<textarea value={YAML.stringify(authorsReplies)} readOnly style={{"width": "100%", "height": "2000px",}}/>*/}
  </div>
};
