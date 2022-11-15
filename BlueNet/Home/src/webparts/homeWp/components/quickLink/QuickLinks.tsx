import * as React from 'react';
import { useEffect, useState } from 'react'
import styles from './QuickLink.module.scss';
import { Grid } from '@material-ui/core';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/folders/list";
import "@pnp/sp/folders/item";
import { IQuickLinks } from './IQuickLinks';

const QuickLinks = ({context}) => {
    const [quickLinks, setQuickLinks] = useState<IQuickLinks[]>([])
    useEffect(() => {
        sp.setup({ spfxContext: context })
        _getQuickLinks()
    }, [])
    const _getQuickLinks = async () => {
        const quickLinksRes = await sp.web.lists.getByTitle("Quick Links").items.get()
        setQuickLinks(quickLinksRes)
    }
    return(
        <div className={ styles.quickLinksWp }>
            <div className={ styles.webpartDivHeading}>
              <i className="fa fa-link aicon" aria-hidden="true"></i> QUICK LINKS
            </div>
            <Grid container spacing={1} style={{height: '26.25em', overflowY:'auto'}}>
                { quickLinks.map(quickLink => (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    { quickLink.LinkUrl &&
                        <div className={ styles.content }>
                            <a href={ quickLink.LinkUrl.Url } target="_blank">
                                <i className={ `${quickLink.TileIcon} fa-4x`  } aria-hidden="true"></i>
                                <p className={ styles.text }>{ quickLink.Title }</p>
                            </a>
                        </div>
                    }
                </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default QuickLinks

// export interface IQuickLinkStates {
//     quickLinks: [
//       {
//         "Title": "",
//         "Url": "",
//         "TileIcon": ""
//       }
  
//     ]
// }
// export default class QuickLink extends React.Component<IQuickLinkProps, IQuickLinkStates> {
//     static siteUrl: string = ""
//     public constructor(props: IQuickLinkProps, states: IQuickLinkStates) {
//       super(props)
//       this.state = {
//         quickLinks: [
//           {
//             "Title": "",
//             "Url": "",
//             "TileIcon": ""
//           }
//         ]
//       }
//       QuickLink.siteUrl = this.props.siteUrl
//     }
    
//   private getQuickLinks() {
//     const reactContextHandler = this
//     jquery.ajax({
//       url: `${QuickLink.siteUrl}/_api/web/lists/getbytitle('Quick Links')/items`,
//       type: "GET",
//       headers: { 'Accept': 'application/json; odata=verbose;' },
//       success: reusltData => {
//         const modifiedResult = reusltData.d.results.map(result => 
//           ({...result, Url: result.LinkUrl.Url })
//         )
//         reactContextHandler.setState({
//           quickLinks: modifiedResult
//         }) 
//       },
//       error: function (jqXHR, textStatus, errorThrown) {
//       }
//     })
//   }

//   public componentDidMount() {
//     this.getQuickLinks()
//   }
//     public render() {
//         return(
//           <div>
            // <div className={ styles.webpartDivHeading}>
            //   <i className="fa fa-link aicon" aria-hidden="true"></i> QUICK LINKS
            // </div>
            // <Grid container spacing={1} style={{height: '26.25em', overflowY:'auto'}}>
            //   { this.state.quickLinks.map(quickLink => (
            //     <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            //       <div className={ styles.content }>
            //         <a href={ quickLink.Url } target="_blank">
            //           <i className={ `${quickLink.TileIcon} fa-4x`  } aria-hidden="true"></i>
            //           <p className={ styles.text }>{ quickLink.Title }</p>
            //         </a>
            //       </div>
            //     </Grid>
            //     ))}
            // </Grid>
//           </div>
//         )
//     }
// }
