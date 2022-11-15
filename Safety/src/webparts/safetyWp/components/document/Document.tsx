import * as React from 'react';
import styles from './Document.module.scss';
import { IDocumentProps } from './IDocumentProps';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/folders/list";
import "@pnp/sp/folders/item";
import "@pnp/sp/files/folder";
import { ApplicationType, FileTypeIcon, IconType, ImageSize } from '@pnp/spfx-controls-react/lib/FileTypeIcon';
import { IDocumentsStates } from './IDocumentsStates';


export default class Document extends React.Component<IDocumentProps, IDocumentsStates> {
    static siteUrl: string;

    public constructor(props: IDocumentProps) {
        super(props);
        sp.setup({
            spfxContext: this.props.context
        });
        this.state = {
            files: []
        }
        Document.siteUrl = this.props.context.pageContext.web.absoluteUrl
    }

    private async _getItems() {
        const files: any[] = await sp.web.getFolderByServerRelativePath("Shared Documents/Safety").files();
        const modifiedData = files.map(file => ({
            ...file,
            name: file.Name, 
            url: `https://usdtl.sharepoint.com${file.ServerRelativeUrl}`,
            fileType: file.Name.split('.')[1] === 'pdf' ? ApplicationType.PDF : ApplicationType.Excel,
            modifiedDate: new Date(file.TimeLastModified).toLocaleDateString("en-US")
            })
        );
        this.setState({
            files: modifiedData
        });
    };

    public componentDidMount() {
        this._getItems();
    };

    
    public render() {
        return(
            <div>
                <div className={ styles.heading }>SAFETY DOCUMENTS</div>
                <div className={ styles.container }>
                <div className={ styles.section }>
                    <div className={ styles.sectionLeft }>
                            { this.state.files.map(file => (
                                <div className={ styles.grid }>
                                    <div className={ styles.gridItemIcon }>
                                        <a href={ file.url } target="_blank" className={ styles.iconLink }>
                                            <div><FileTypeIcon type={IconType.image} application={ file.fileType } size={ ImageSize.small } /></div>
                                        </a>
                                    </div>
                                    <div className={ styles.gridItemFile }>
                                        <a href={ file.url } target="_blank" className={ styles.fileHeading }>{ file.name }</a>
                                        <div className={ styles.fileDate } >{ file.modifiedDate }</div>
                                    </div>
                                </div>
                                  



                            ))
                            }
                        </div>
                    </div>

                    


                    <div className={ styles.sectionRight } ></div>
                    
                              


                              
 

                </div>
            </div>
            

            
        );
    }
}