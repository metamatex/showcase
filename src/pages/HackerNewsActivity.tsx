import React from 'react';
import * as mql from "../mql_";
import * as YAML from "yaml";
import {Error} from "../components/Error";
import * as transform from "./HackerNewsActivity/transform";
import {Chart} from "./HackerNewsActivity/Chart";
import {Profile} from "./HackerNewsActivity/Profile";
import * as _ from 'lodash';

interface Props {
  client: mql.Client
}

export const HackerNewsActivity: React.FC<Props> = (p: Props) => {
  let [username, setUsername] = React.useState("21stio");
  let [isLoading, setIsLoading] = React.useState(false);
  const [socialAccount, setSocialAccount] = React.useState<mql.SocialAccount>();
  const [errors, setErrors] = React.useState<mql.Error[]>();
  const [authorsPosts, setAuthorsPosts] = React.useState<mql.Post[]>();
  const [authorsReplies, setAuthorsReplies] = React.useState<mql.Post[]>();
  const [bookmarksPosts, setBookmarksPosts] = React.useState<mql.Post[]>();
  const [totalPoints, setTotalPoints] = React.useState<number>();

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

      let socialAccount: mql.SocialAccount|undefined = undefined;
      let authorsPosts: mql.Post[]|undefined = undefined;
      let authorsReplies: mql.Post[]|undefined = undefined;
      let bookmarksPosts: mql.Post[]|undefined = undefined;
      let totalPoints: number = 0;

      if (rsp.socialAccounts && rsp.socialAccounts.length === 1) {
        socialAccount = rsp.socialAccounts[0];
      }

      if (rsp.errors) {
        setErrors(rsp.errors)
      }

      if (socialAccount && socialAccount.relations && socialAccount.relations.authorsPosts && socialAccount.relations.authorsPosts.posts) {
        let posts = socialAccount.relations.authorsPosts.posts;

        authorsPosts = _.filter(posts, (post) => {
          return post.kind === mql.PostKind.Post
        });

        authorsReplies = _.filter(posts, (post) => {
          return post.kind === mql.PostKind.Reply
        });

        totalPoints = transform.getTotalPoints(authorsPosts)
      }

      if (socialAccount && socialAccount.relations && socialAccount.relations.bookmarksPosts && socialAccount.relations.bookmarksPosts.posts) {
        bookmarksPosts = socialAccount.relations.bookmarksPosts.posts;
      }

      setIsLoading(false);
      setSocialAccount(socialAccount);
      setAuthorsPosts(authorsPosts);
      setBookmarksPosts(bookmarksPosts);
      setAuthorsReplies(authorsReplies);
      setTotalPoints(totalPoints);
    };

    fetch().catch((reason:any) => {
      setIsLoading(false);

      setErrors([{
        message: reason.message,
      }])
    });
  };

  const renderSubmissionsChart = () => {
    if (!authorsPosts) {
      return
    }

    let postsPerCategory = transform.splitByCategory(authorsPosts);

    let psm = transform.toPointsCommentsTimeseriesMap(postsPerCategory);

    return <div>
      <h5>{authorsPosts.length} Submissions</h5>
      <Chart points={psm}/>
    </div>
  };

  const renderFavoritesChart = () => {
    if (!bookmarksPosts) {
      return
    }

    let postsPerCategory = transform.splitByCategory(bookmarksPosts);

    let psm = transform.toPointsCommentsTimeseriesMap(postsPerCategory);

    return <div>
      <h5>{bookmarksPosts.length} Favorites</h5>
      <Chart points={psm}/>
    </div>
  };

  const renderProfile = () => {
    if (!socialAccount || !totalPoints) {
      return
    }

    return <Profile socialAccount={socialAccount} totalPoints={totalPoints}/>
  };

  return <div>
    <p>HackerNews Activity</p>

    {errors ? errors.map(error => <Error
      error={error}/>) : null}
    <div className="row">
      <div className="col-3">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="username"
                   value={username}
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
      </div>
      <div className="col-9">
        {renderSubmissionsChart()}
        {renderFavoritesChart()}
      </div>
    </div>
    <pre>{JSON.stringify(process.env, undefined, 2)}</pre>
    <textarea value={YAML.stringify(socialAccount)} readOnly style={{"width": "100%","height": "2000px",}}/>
  </div>
};
