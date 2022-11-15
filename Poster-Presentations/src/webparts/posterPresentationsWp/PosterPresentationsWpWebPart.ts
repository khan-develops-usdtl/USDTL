import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PosterPresentationsWpWebPartStrings';
import PosterPresentationsWp from './components/PosterPresentationsWp';
import { IPosterPresentationsWpProps } from './components/IPosterPresentationsWpProps';

export interface IPosterPresentationsWpWebPartProps {
  description: string;
}

export default class PosterPresentationsWpWebPart extends BaseClientSideWebPart<IPosterPresentationsWpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPosterPresentationsWpProps> = React.createElement(
      PosterPresentationsWp,
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
