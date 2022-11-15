import * as jquery from 'jquery';
import * as React from 'react';
import styles from './JobPosting.module.scss';
import { IJobPostingProps } from './IJobPostingProps';

export interface IJobPostingStates {
    jobPosts: [
      {
        "Title": "",
        "PostDate": "",
        "Description": "",
        "DocumentUrl": ""
      }
    ]
}

export default class JobPosting extends React.Component<IJobPostingProps, IJobPostingStates> {
    static siteUrl: string;
    public constructor(props: IJobPostingProps, states: IJobPostingStates) {
      super(props)
      this.state = {
        jobPosts: [
          {
            "Title": "",
            "PostDate": "",
            "Description": "",
            "DocumentUrl": ""
          }
        ]
      }
      JobPosting.siteUrl = this.props.siteUrl
    }
    private getJobPosting() {
      const reactContextHandler = this
  
      jquery.ajax({
        url: `${JobPosting.siteUrl}/_api/web/lists/getbytitle('Job Posting')/items`,
        type: "GET",
        headers: { 'Accept': 'application/json; odata=verbose;' },
        success: resultData => {
          const modifiedResult = resultData.d.results.map(result => 
            ({ ...result,
              PostDate: new Date(result.Date).toLocaleDateString("en-US"),
              DocumentUrl: result.DocumentLink ? result.DocumentLink.Url : null
            }))
          reactContextHandler.setState({
            jobPosts: modifiedResult
          })
        },
        error: (jqXHR, textStatus, errorThrown) => {}
      })
    }
    public componentDidMount() {
      this.getJobPosting()
    }
    public render() {
      return (
        <div>
            <div className={ styles.webPartDivHeading }>
                <i className="fa fa-hacker-news fa-lg" aria-hidden="true"></i> JOB POSTINGS
            </div>
            <div className={ styles.innerDiv }>
                { this.state.jobPosts.map(jobPost => {
                    return(
                        <div className={ styles.container }>
                          { jobPost.DocumentUrl ?
                            <div>
                              <a className={ styles.jobPostingsDocLink } style={{ padding: 0}}href={ jobPost.DocumentUrl } target="_blank" > 
                                <div className={ styles.jobPostingsHeading } style={{ padding: 0}}>{ jobPost.Title }</div>
                              </a>
                              <div className={ styles.jobPostingsDate }>Posted on { jobPost.PostDate }</div>
                              <div className={ styles.jobPostingsDesc }>{ jobPost.Description }</div>
                            </div> :
                            <div>
                              <div className={ styles.jobPostingsHeading } style={{ padding: 0}}>{ jobPost.Title }</div>
                              <div className={ styles.jobPostingsDate }>Posted on { jobPost.PostDate }</div>
                              <div className={ styles.jobPostingsDesc }>{ jobPost.Description }</div>
                            </div>
                          }                                    
                        </div>
                    )
                })
                }
            </div>
        </div>
      );
    }
  }

