import * as React from 'react';
import { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/folders/list";
import "@pnp/sp/folders/item";
import { IQuickLinks } from './IQuickLinks';
import styles from './QuickLinks.module.scss';

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
        <div className={ styles.quickLinksWp } style={{ borderBottom: '0.125em solid #e1e1e1' }}>
            <div className={ styles.webpartDivHeading}>
              <i className="fa fa-link aicon" aria-hidden="true"></i> QUICK LINKS
            </div>
            <Grid container spacing={1} style={{height: '18em', overflowY:'auto'}}>
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