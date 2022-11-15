import { ApplicationType, FileTypeIcon, IconType, ImageSize } from '@pnp/spfx-controls-react/lib/FileTypeIcon'
import * as React from 'react';
import { useState, useEffect } from 'react'
import styles from './Branding.module.scss';
import { Grid, Paper } from '@material-ui/core';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/folders/list";
import "@pnp/sp/folders/item";
import "@pnp/sp/files/folder";
import { IDocument } from './IStates';

const Branding = ({context}) => {
    const [documents, setDocuments] = useState<IDocument[]>([])
    useEffect(() => {
        sp.setup({ spfxContext: context })
        _getDocuments()
    }, [])

    const _getDocuments = async () => {
        const documentsRes = await sp.web.getFolderByServerRelativePath('Branding').files()
        setDocuments(documentsRes)
    }
    const _typeChecker = (file) => {
        const fileType = file.Name.split('.')[file.Name.split('.').length-1]
        if(fileType === 'pdf') {
            return ApplicationType.PDF
        } else if(fileType === 'docx') {
            return ApplicationType.Word
        } else if(fileType === 'xlsx') {
            return ApplicationType.Excel
        } else if(fileType === 'aspx') {
            return ApplicationType.ASPX
        } 
    }
    return(
        <div className={ styles.branding } style={{ borderBottom: '0.125em solid #e1e1e1', paddingBottom: '0.5em' }}>
            <div className={ styles.heading }>BRANDING</div>
            <Grid container spacing={2} className={ styles.gridContainer }>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Paper variant='outlined' square={false} className={ styles.paper }>
                    { documents.map(document => (
                        <Grid container className={ styles.gridSubContainer }>
                            <Grid item xs={3} sm={2} md={2} lg={1} xl={1} style={{ display: 'grid', placeSelf: 'center' }}>
                                <a href={ `https://usdtl.sharepoint.com${document.ServerRelativeUrl}` } target="_blank" className={ styles.iconLink }>
                                    <div><FileTypeIcon type={IconType.image} application={ _typeChecker(document) } size={ ImageSize.small } /></div>
                                </a>
                            </Grid>
                            <Grid item xs={9} sm={10} md={10} lg={11} xl={11}>
                                <a href={ `https://usdtl.sharepoint.com${document.ServerRelativeUrl}` } target="_blank" className={ styles.fileHeading }>
                                    { document.Name }
                                </a>
                                <div className={ styles.fileDate } >{ new Date(document.TimeLastModified).toLocaleDateString('en-US') }</div>
                            </Grid>
                        </Grid>
                    ))}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Paper variant='outlined' square={false} className={ styles.paper }>

                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}   

export default Branding

