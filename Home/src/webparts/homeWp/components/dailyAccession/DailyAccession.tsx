import * as React from 'react';
import styles from './DailyAccession.module.scss';
import * as jquery from 'jquery';
import { IFrameDialog } from '@pnp/spfx-controls-react/lib/IFrameDialog';
import { IDailyAccessionProps } from './IDailyAccessionProps';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { FileTypeIcon, ApplicationType, IconType, ImageSize } from '@pnp/spfx-controls-react/lib/FileTypeIcon';
import { Grid } from '@material-ui/core';
export interface IDailyAccessionStates {
    hideDialog: boolean;
    fileUrl: string;
    files: [
        {
            title: '',
            url: '',
            fileType: any,
            modifiedDate: ''
        }
    ]
}

export default class DailyAccession extends React.Component<IDailyAccessionProps, IDailyAccessionStates> {
    static siteUrl: string;
    public constructor(props) {
        super(props)
        this.state = {
            fileUrl: '',
            hideDialog: true,
            files: [
                {
                    title: '',
                    url: '',
                    fileType: null,
                    modifiedDate: ''
                }
            ]     
        }
        DailyAccession.siteUrl = this.props.siteUrl
    }

    private getExcelData() {
        const reactContextHandler = this

        jquery.ajax({
            url: `${DailyAccession.siteUrl}/_api/web/GetFolderByServerRelativeUrl('/Shared Documents/Misc List')/Files`,
            type: 'GET',
            headers: { 'Accept': 'application/json; odata=verbose;' },
            success: function(resultData) {
                const modifiedData = resultData.d.results.map(result => ({
                    ...result,
                    title: result.Title , 
                    url: result.LinkingUri ? result.LinkingUri : `${DailyAccession.siteUrl}${result.ServerRelativeUrl}`,
                    fileType: result.Name.split('.')[1] === 'pdf' ? ApplicationType.PDF : ApplicationType.Excel,
                    modifiedDate: new Date(result.TimeLastModified).toLocaleDateString("en-US")
                    })
                )
                reactContextHandler.setState({
                    files: modifiedData
                })
            },
            error: function (jqXHR, textStatus, errorThrown) { }
        })
    }

    public componentDidMount() {
        this.getExcelData();
    }

    public render() {
        return(
            <div className={ styles.dailyAccession }>
                <div className={ styles.heading }>
                    <i className="fa fa-file" aria-hidden="true"></i> TRENDING INFORMATION
                </div>
                <div className={ styles.container }>
                    { this.state.files.map(file => {
                        return(
                            <Grid container className={ styles.gridContainer}>
                                <Grid item xs={12} sm={2} md={2} lg={2} xl={2} className={ styles.gridItemFileIcon }>
                                    <a className={ styles.fileLink } href={ file.url } target="_blank">
                                        <div><FileTypeIcon type={IconType.image} application={ file.fileType } size={ ImageSize.medium } /></div>
                                    </a>
                                </Grid>
                                <Grid item xs={12} sm={10} md={10} lg={10} xl={10} className={ styles.gridItemContent }>
                                    <div>
                                        <a className={ styles.fileLink } href={ file.url } target="_blank">
                                            <div className={ styles.fileHeading }>{ file.title }</div>
                                        </a>
                                        <div className={ styles.modifiedDate }>Updated on { file.modifiedDate }</div>
                                    </div>
                                </Grid>
                          </Grid>  
                            )
                        })
                    }
                    <IFrameDialog 
                        url={ this.state.fileUrl }
                        hidden={this.state.hideDialog}
                        allowFullScreen={true}
                        dialogContentProps={{
                            type: DialogType.close,
                            showCloseButton: true
                        }}
                        modalProps={{ isBlocking: false }}
                        onDismiss={() => this.setState({ hideDialog: true })}
                        width={'1600px'}
                        height={'900px'}
                    /> 
                </div>

            </div>
        )
    }
}