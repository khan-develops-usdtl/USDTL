import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ScreeningExtractionsWpWebPartStrings';
import ScreeningExtractionsWp from './components/ScreeningExtractionsWp';
import { IScreeningExtractionsWpProps } from './components/IScreeningExtractionsWpProps';

export interface IScreeningExtractionsWpWebPartProps {
  description: string;
}

export default class ScreeningExtractionsWpWebPart extends BaseClientSideWebPart<IScreeningExtractionsWpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IScreeningExtractionsWpProps> = React.createElement(
      ScreeningExtractionsWp,
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
