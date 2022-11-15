import * as React from 'react';
import styles from './Document.module.scss';
import { IDocumentProps } from './IDocumentProps';
import { IDocumentStates } from './IDocumentStates';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/folders/list";
import "@pnp/sp/folders/item";
import "@pnp/sp/files/folder";
import { ApplicationType, FileTypeIcon, IconType, ImageSize } from '@pnp/spfx-controls-react/lib/FileTypeIcon';



export default class Document extends React.Component<IDocumentProps, IDocumentStates> {
    static siteUrl: string;

    public constructor(props: IDocumentProps) {
        super(props);
        sp.setup({
            spfxContext: this.props.context
        });
        this.state = {
            benefits: [],
            hrForms: [],
            paylocity: [],
            policies: []
        }
        Document.siteUrl = this.props.context.pageContext.web.absoluteUrl
    }

    private async _getBeneftis() {
        const files: any[] = await sp.web.getFolderByServerRelativePath("Benefits").files();
        const modifiedData = files.map(file => ({
            ...file,
            name: file.Name, 
            url: `https://usdtl.sharepoint.com${file.ServerRelativeUrl}`,
            fileType: file.Name.split('.')[1] === 'pdf' ? ApplicationType.PDF : ApplicationType.Word,
            modifiedDate: new Date(file.TimeLastModified).toLocaleDateString("en-US")
            })
        );
        this.setState({
            benefits: modifiedData
        });
    };
    private async _getPolicies() {
        const files: any[] = await sp.web.getFolderByServerRelativePath("Policies").files();
        const modifiedData = files.map(file => ({
            ...file,
            name: file.Name, 
            url: `https://usdtl.sharepoint.com${file.ServerRelativeUrl}`,
            fileType: file.Name.split('.')[1] === 'pdf' ? ApplicationType.PDF : ApplicationType.Word,
            modifiedDate: new Date(file.TimeLastModified).toLocaleDateString("en-US")
            })
        );
        this.setState({
            policies: modifiedData
        });
    };
    private async _getHRForms() {
        const files: any[] = await sp.web.getFolderByServerRelativePath("HR Forms").files();
        const modifiedData = files.map(file => ({
            ...file,
            name: file.Name, 
            url: `https://usdtl.sharepoint.com${file.ServerRelativeUrl}`,
            fileType: file.Name.split('.')[1] === 'pdf' ? ApplicationType.PDF : ApplicationType.Word,
            modifiedDate: new Date(file.TimeLastModified).toLocaleDateString("en-US")
            })
        );
        this.setState({
            hrForms: modifiedData
        });
    };
    private async _getPaylocity() {
        const files: any[] = await sp.web.getFolderByServerRelativePath("Paylocity").files();
        const modifiedData = files.map(file => ({
            ...file,
            name: file.Name, 
            url: `https://usdtl.sharepoint.com${file.ServerRelativeUrl}`,
            fileType: file.Name.split('.')[1] === 'pdf' ? ApplicationType.PDF : ApplicationType.Word,
            modifiedDate: new Date(file.TimeLastModified).toLocaleDateString("en-US")
            })
        );
        this.setState({
            paylocity: modifiedData
        });
    };

    public componentDidMount() {
        this._getBeneftis();
        this._getHRForms();
        this._getPaylocity();
        this._getPolicies();
    };

    public render() {
        return(
            <div>
         <div className={ styles.section }>
            <div className={ styles.sectionLeft }>
                <div className={ styles.heading }>BENEFITS</div>
                <div className={ styles.container }>
                { this.state.benefits.map(benefit => (
                        <div className={ styles.grid }>
                            <div className={ styles.gridItemIcon }>
                                <a href={ benefit.url } target="_blank" className={ styles.iconLink }>
                                    <div><FileTypeIcon type={IconType.image} application={ benefit.fileType } size={ ImageSize.small } /></div>
                                </a>
                            </div>
                            <div className={ styles.gridItemFile }>
                                <a href={ benefit.url } target="_blank" className={ styles.fileHeading }>{ benefit.name }</a>
                                <div className={ styles.fileDate } >{ benefit.modifiedDate }</div>
                            </div>
                        </div>
                    ))
                    }
                </div>
                </div>
            <div className={ styles.sectionRight }>
                <div className={ styles.heading }>HR FORMS</div>
                <div className={ styles.container }>
                    { this.state.hrForms.map(hrForm => (
                        <div className={ styles.grid }>
                            <div className={ styles.gridItemIcon }>
                                <a href={ hrForm.url } target="_blank" className={ styles.iconLink }>
                                    <div><FileTypeIcon type={IconType.image} application={ hrForm.fileType } size={ ImageSize.small } /></div>
                                </a>
                            </div>
                            <div className={ styles.gridItemFile }>
                                <a href={ hrForm.url } target="_blank" className={ styles.fileHeading }>{ hrForm.name }</a>
                                <div className={ styles.fileDate } >{ hrForm.modifiedDate }</div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>   
            </div>
            <div className={ styles.section }>
            <div className={ styles.sectionLeft }>
            <div className={ styles.heading }>PAYLOCITY</div>
            <div className={ styles.container }>
                { this.state.paylocity.map(paylocity => (
                    <div className={ styles.grid }>
                        <div className={ styles.gridItemIcon }>
                            <a href={ paylocity.url } target="_blank" className={ styles.iconLink }>
                                <div><FileTypeIcon type={IconType.image} application={ paylocity.fileType } size={ ImageSize.small } /></div>
                            </a>
                        </div>
                        <div className={ styles.gridItemFile }>
                            <a href={ paylocity.url } target="_blank" className={ styles.fileHeading }>{ paylocity.name }</a>
                            <div className={ styles.fileDate } >{ paylocity.modifiedDate }</div>
                        </div>
                    </div>
                ))
                }
            </div>
            </div>
            <div className={ styles.sectionRight }>
            <div className={ styles.heading }>POLICIES</div>
            <div className={ styles.container }>
                { this.state.policies.map(policy => (
                    <div className={ styles.grid }>
                        <div className={ styles.gridItemIcon }>
                            <a href={ policy.url } target="_blank" className={ styles.iconLink }>
                                <div><FileTypeIcon type={IconType.image} application={ policy.fileType } size={ ImageSize.small } /></div>
                            </a>
                        </div>
                        <div className={ styles.gridItemFile }>
                            <a href={ policy.url } target="_blank" className={ styles.fileHeading }>{ policy.name }</a>
                            <div className={ styles.fileDate } >{ policy.modifiedDate }</div>
                        </div>
                    </div>
                ))
                }
            </div>
            </div>
            </div>   
                        </div>
                    );
                }
            }




{/* <Grid container spacing={2}>
<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
    <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className={ styles.heading }>BENEFITS</div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ maxHeight: '430px' }}>
                { this.state.benefits.map(benefit => (
                    <Grid container spacing={1} style={{ borderBottom: '2px solid #e1e1e1', padding: '5px 0'}}>
                        <Grid item xs={12} sm={1} md={1} lg={1} xl={1}>
                            <a href={ benefit.url } target="_blank" className={ styles.iconLink }>
                                <div><FileTypeIcon type={IconType.image} application={ benefit.fileType } size={ ImageSize.small } /></div>
                            </a>
                        </Grid>
                        <Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
                            <a href={ benefit.url } target="_blank" className={ styles.fileHeading }>{ benefit.name }</a>
                            <div className={ styles.fileDate } >{ benefit.modifiedDate }</div>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
    </Grid>
</Grid>
<Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
    <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className={ styles.heading }>HR FORMS</div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={ styles.fileDiv }>
            { this.state.hrForms.map(hrForms => (
                <Grid container spacing={1} style={{ borderBottom: '2px solid #e1e1e1', padding: '5px 0'}}>
                    <Grid item xs={12} sm={1} md={1} lg={1} xl={1}>
                        <a href={ hrForms.url } target="_blank" className={ styles.iconLink }>
                            <div><FileTypeIcon type={IconType.image} application={ hrForms.fileType } size={ ImageSize.small } /></div>
                        </a>
                    </Grid>
                    <Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
                        <a href={ hrForms.url } target="_blank" className={ styles.fileHeading }>{ hrForms.name }</a>
                        <div className={ styles.fileDate } >{ hrForms.modifiedDate }</div>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    </Grid>
</Grid>
<Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
    <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className={ styles.heading }>PAYLOCITY</div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={ styles.fileDiv }>
            { this.state.paylocity.map(paylocity => (
                <Grid container spacing={1} style={{ borderBottom: '2px solid #e1e1e1', padding: '5px 0'}}>
                    <Grid item xs={12} sm={1} md={1} lg={1} xl={1}>
                        <a href={ paylocity.url } target="_blank" className={ styles.iconLink }>
                            <div><FileTypeIcon type={IconType.image} application={ paylocity.fileType } size={ ImageSize.small } /></div>
                        </a>
                    </Grid>
                    <Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
                        <a href={ paylocity.url } target="_blank" className={ styles.fileHeading }>{ paylocity.name }</a>
                        <div className={ styles.fileDate } >{ paylocity.modifiedDate }</div>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    </Grid>
</Grid>
<Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
    <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className={ styles.heading }>POLICIES</div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={ styles.fileDiv }>
            { this.state.policies.map(policy => (
                <Grid container spacing={1} style={{ borderBottom: '2px solid #e1e1e1', padding: '5px 0'}}>
                    <Grid item xs={12} sm={1} md={1} lg={1} xl={1}>
                        <a href={ policy.url } target="_blank" className={ styles.iconLink }>
                            <div><FileTypeIcon type={IconType.image} application={ policy.fileType } size={ ImageSize.small } /></div>
                        </a>
                    </Grid>
                    <Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
                        <a href={ policy.url } target="_blank" className={ styles.fileHeading }>{ policy.name }</a>
                        <div className={ styles.fileDate } >{ policy.modifiedDate }</div>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    </Grid>
</Grid>
</Grid> */}