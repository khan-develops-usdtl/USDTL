import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpecimenAliquotingWpWebPartStrings';
import SpecimenAliquotingWp from './components/SpecimenAliquotingWp';
import { ISpecimenAliquotingWpProps } from './components/ISpecimenAliquotingWpProps';

export interface ISpecimenAliquotingWpWebPartProps {
  description: string;
}

export default class SpecimenAliquotingWpWebPart extends BaseClientSideWebPart<ISpecimenAliquotingWpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpecimenAliquotingWpProps> = React.createElement(
      SpecimenAliquotingWp,
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
