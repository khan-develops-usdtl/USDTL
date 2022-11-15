import * as React from 'react';
import styles from './QuickLink.module.scss';
import { IQuickLinkProps } from './IQuickLinkProps';
import * as jquery from 'jquery';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { Grid } from '@material-ui/core';
SPComponentLoader.loadCss('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

export interface IQuickLinkStates {
    quickLinks: [
      {
        "Title": "",
        "Url": "",
        "TileIcon": ""
      }
  
    ]
}
export default class QuickLink extends React.Component<IQuickLinkProps, IQuickLinkStates> {
    static siteUrl: string = ""
    public constructor(props: IQuickLinkProps, states: IQuickLinkStates) {
      super(props)
      this.state = {
        quickLinks: [
          {
            "Title": "",
            "Url": "",
            "TileIcon": ""
          }
        ]
      }
      QuickLink.siteUrl = this.props.siteUrl
    }
    
  private getQuickLinks() {
    const reactContextHandler = this
    jquery.ajax({
      url: `${QuickLink.siteUrl}/_api/web/lists/getbytitle('Quick Links')/items`,
      type: "GET",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: reusltData => {
        const modifiedResult = reusltData.d.results.map(result => 
          ({...result, Url: result.LinkUrl.Url })
        )
        reactContextHandler.setState({
          quickLinks: modifiedResult
        }) 
      },
      error: function (jqXHR, textStatus, errorThrown) {
      }
    })
  }

  public componentDidMount() {
    this.getQuickLinks()
  }
    public render() {
        return(
          <div>
            <div className={ styles.webpartDivHeading}>
              <i className="fa fa-link aicon" aria-hidden="true"></i> QUICK LINKS
            </div>
            <Grid container spacing={1} style={{height: '26.25em', overflowY:'auto'}}>
              { this.state.quickLinks.map(quickLink => (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                  <div className={ styles.content }>
                    <a href={ quickLink.Url } target="_blank">
                      <i className={ `${quickLink.TileIcon} fa-4x`  } aria-hidden="true"></i>
                      <p className={ styles.text }>{ quickLink.Title }</p>
                    </a>
                  </div>
                </Grid>
                ))}
            </Grid>
          </div>
        )
    }
}
