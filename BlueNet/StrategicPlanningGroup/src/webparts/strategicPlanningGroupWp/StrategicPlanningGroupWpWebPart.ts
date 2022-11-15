import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'StrategicPlanningGroupWpWebPartStrings';
import StrategicPlanningGroupWp from './components/StrategicPlanningGroupWp';
import { IStrategicPlanningGroupWpProps } from './components/IStrategicPlanningGroupWpProps';

export interface IStrategicPlanningGroupWpWebPartProps {
  context: WebPartContext
}

export default class StrategicPlanningGroupWpWebPart extends BaseClientSideWebPart<IStrategicPlanningGroupWpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IStrategicPlanningGroupWpProps> = React.createElement(
      StrategicPlanningGroupWp,
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
