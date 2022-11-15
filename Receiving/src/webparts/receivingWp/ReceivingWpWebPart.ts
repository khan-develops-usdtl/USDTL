import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReceivingWpWebPartStrings';
import ReceivingWp from './components/ReceivingWp';
import { IReceivingWpProps } from './components/IReceivingWpProps';

export interface IReceivingWpWebPartProps {
  description: string;
}

export default class ReceivingWpWebPart extends BaseClientSideWebPart<IReceivingWpWebPartProps> {

  public render(): void {
    console.log(this.context.pageContext.web.absoluteUrl)
    const element: React.ReactElement<IReceivingWpProps> = React.createElement(
      ReceivingWp,
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
