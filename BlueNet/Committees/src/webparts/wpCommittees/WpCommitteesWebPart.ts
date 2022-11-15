import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'WpCommitteesWebPartStrings';
import WpCommittees from './components/WpCommittees';
import { IWpCommitteesProps } from './components/IWpCommitteesProps';

export interface IWpCommitteesWebPartProps {
  context: WebPartContext;
}

export default class WpCommitteesWebPart extends BaseClientSideWebPart<IWpCommitteesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWpCommitteesProps> = React.createElement(
      WpCommittees,
      {
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
