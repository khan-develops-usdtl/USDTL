import { Grid, Paper } from '@material-ui/core'
import { sp } from '@pnp/sp'
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import * as React from 'react'
import { useEffect, useState } from 'react'
import styles from './SalesTraining.module.scss'
import { IFile, IVideo } from './IUSDTLSalesModel';
import { ApplicationType, FileTypeIcon, IconType, ImageSize } from '@pnp/spfx-controls-react/lib/FileTypeIcon';
import YouTubeIcon from '@material-ui/icons/YouTube';


const SalesTraining = ({context}) => {
    const [USDTLSalesModel, setUSDTLSalesModel] = useState<IFile[]>([])
    const [siteUrl, setSiteUrl] = useState<string>('')
    const [impactSalesManual, setImpactSalesManual] = useState<IFile[]>([])
    const [worksheetAndToolsFolders, setWorksheetAndToolsFolders] = useState<IFile[]>([])
    const [openFolder, setOpenFolder] = useState<string>('')
    const [openFiles, setOpenFiles] = useState<IFile[]>([])
    const [videos, setVideos] = useState<IVideo[]>([])
    useEffect(() => {
        sp.setup({ spfxContext: context })
        _getSalesModel()
    }, [])
    const _getSalesModel = async () => {
        const siteUrlRes = await sp.site.getContextInfo()
        const USDTLSalesModelRes = await sp.web.getFolderByServerRelativePath('Shared Documents/USDTL Sales Model').files()
        const impactSalesManualsRes = await sp.web.getFolderByServerRelativePath('Shared Documents/Impact Sales Manual').files()
        const worksheetAndToolsFoldersRes = await sp.web.getFolderByServerRelativePath('Shared Documents/Worksheets and Tools').folders()
        const videosRes = await sp.web.lists.getByTitle('Session Videos-AB').items.get()

        setVideos(videosRes)
        setSiteUrl(siteUrlRes.SiteFullUrl)
        setUSDTLSalesModel(USDTLSalesModelRes)
        setImpactSalesManual(impactSalesManualsRes)
        setWorksheetAndToolsFolders(worksheetAndToolsFoldersRes)
    }
    const _handleOpenFolder = async (e, folder) => {
        setOpenFolder(folder.Name)
        const files = await sp.web.getFolderByServerRelativePath(folder.ServerRelativeUrl).files()
        setOpenFiles(files)
    }
    const _handleCloseFolder = () => {
        setOpenFolder('');
        setOpenFiles([]);
    }
    const _typeChecker = (fileType) => {
        if(fileType === 'pdf') {
            return ApplicationType.PDF
        } else if(fileType === 'docx') {
            return ApplicationType.Word
        } else if(fileType === 'xlsx') {
            return ApplicationType.Excel
        }
    }
    return(
        <div className={ styles.SalesTraining }>
            <div className={ styles.heading }>SALES TRAINING</div>
            <Grid container spacing={2} className={ styles.gridContainer }> 
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className={ styles.subHeading }>USDTL Sales Model</div>
                    <Paper variant='outlined' square={false} className={ styles.paper }>
                        <div className={ styles.gridSubItem }>
                            { USDTLSalesModel.map(file => (
                            <Grid container className={ styles.gridSubContainer }>
                                <Grid item xs={12} sm={1} md={1} lg={1} xl={1} style={{ display: 'grid', placeSelf: 'center' }}>
                                    <a href={`${siteUrl}${file.ServerRelativeUrl}`} target='_blank'>
                                        <FileTypeIcon type={IconType.image} application={ _typeChecker(file.Name.split('.')[1]) } size={ ImageSize.medium }/>
                                    </a>
                                </Grid>
                                <Grid item xs={12} sm={11} md={11} lg={11} xl={11} style={{ display: 'grid', alignItems: 'center' }}>
                                    <div style={{ padding: '0 10px' }}>
                                        <a href={`${siteUrl}${file.ServerRelativeUrl}`} target='_blank' className={ styles.fileName}>{file.Name}</a>
                                        <div className={ styles.createdDate }>{new Date(file.TimeCreated).toLocaleDateString('en-US')}</div>
                                    </div>
                                </Grid>
                            </Grid>
                            ))}
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className={ styles.subHeading } >Impact Sales Manual</div>
                    <Paper variant='outlined' square={false} className={ styles.paper }>
                        <div className={ styles.gridSubItem }>
                            { impactSalesManual.map(file => (
                            <Grid container className={ styles.gridSubContainer }>
                                <Grid item xs={12} sm={1} md={1} lg={1} xl={1} style={{ display: 'grid', placeSelf: 'center' }}>
                                    <a href={`${siteUrl}${file.ServerRelativeUrl}`} target='_blank'>
                                        <FileTypeIcon type={IconType.image} application={ _typeChecker(file.Name.split('.')[1]) } size={ ImageSize.medium }/>
                                    </a>
                                </Grid>
                                <Grid item xs={12} sm={11} md={11} lg={11} xl={11} style={{ display: 'grid', alignItems: 'center' }}>
                                    <div style={{ padding: '0 10px' }}>
                                        <a href={`${siteUrl}${file.ServerRelativeUrl}`} target='_blank' className={ styles.fileName}>{file.Name}</a>
                                        <div className={ styles.createdDate }>{new Date(file.TimeCreated).toLocaleDateString('en-US')}</div>
                                    </div>
                                </Grid>
                            </Grid>
                            ))}
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className={ styles.subHeading }>Sales Training Videos</div>
                    <Paper variant='outlined' square={false} className={ styles.paper }>
                    <div className={ styles.gridSubItem }>
                    { videos.map(video => (
                        <Grid container className={ styles.gridSubContainer }>
                            <Grid item xs={12} sm={2} md={2} lg={2} xl={2} style={{ display: 'grid', placeSelf: 'center' }}>
                                <a href={ video.VideoLink.Url } target='_blank' style={{ position: 'relative' }}>
                                    {/* <i className="fa fa-youtube-play" aria-hidden="true" style={{ color: 'orange', fontSize: '3em' }}></i> */}
                                    <YouTubeIcon className={ styles.playButton } fontSize='small'></YouTubeIcon>
                                    <img className={ styles.thumbnail } src={video.ThumbnailImage.Url}/>
                                </a>
                            </Grid>
                            <Grid item xs={12} sm={10} md={10} lg={10} xl={10} style={{ display: 'grid', alignItems: 'center', padding: '0 5px' }}>
                                <div style={{ padding: '0 10px' }}>
                                    <a href={ video.VideoLink.Url } target='_blank' className={ styles.fileName}>{video.Title}</a>
                                    <div className={ styles.createdDate }>{new Date(video.Created).toLocaleDateString('en-US')}</div>
                                </div>

                            </Grid>
                        </Grid>
                        ))}
                    </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className={ styles.subHeading }>Worksheets and Tools</div>
                    <Paper variant='outlined' square={false} className={ styles.paper }>
                    <div className={ styles.gridSubItem }>
                        { worksheetAndToolsFolders.map(folder => (
                        <Grid container className={ styles.gridSubContainer }>
                            <Grid item xs={12} sm={1} md={1} lg={1} xl={1} style={{ display: 'grid', placeSelf: 'center' }}>
                                { folder.Name === openFolder ?
                                    <div>               
                                        <i onClick={_handleCloseFolder} className="fa fa-folder-open" aria-hidden="true" 
                                            style={{ color: 'orange', fontSize: '3em', cursor: 'pointer' }}></i>
                                    </div> :
                                    <div>
                                        <i onClick={e => _handleOpenFolder(e, folder)} 
                                            className="fa fa-folder" aria-hidden="true" style={{ color: 'orange', fontSize: '3em',cursor: 'pointer' }}>
                                        </i> 
                                    </div>
                                }
                            </Grid>
                            <Grid item xs={12} sm={11} md={11} lg={11} xl={11} style={{ display: 'grid', alignItems: 'center', padding: '0 10px' }}>
                                <div className={ styles.fileName }>{folder.Name}</div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                { folder.Name === openFolder &&
                                    openFiles.map(file => (
                                        <Grid container style={{ padding: '10px 0 10px 40px' }}>
                                            <Grid item xs={12} sm={1} md={1} lg={1} xl={1} style={{ display: 'grid', placeSelf: 'center', textAlign: 'center' }}>
                                                <a href={`${siteUrl}${file.ServerRelativeUrl}`} target='_blank'>
                                                    <FileTypeIcon type={IconType.image} application={ _typeChecker(file.Name.split('.')[1]) } size={ ImageSize.medium }/>
                                                </a>
                                            </Grid>
                                            <Grid item xs={12} sm={10} md={10} lg={10} xl={10} style={{ display: 'grid', alignItems: 'center' }}>
                                                <div>
                                                    <a href={`${siteUrl}${file.ServerRelativeUrl}`} target='_blank' className={ styles.fileName}>{file.Name}</a>
                                                    <div className={ styles.createdDate }>{new Date(file.TimeCreated).toLocaleDateString('en-US')}</div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>
                        ))}
                    </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>

    )
}

export default SalesTraining

