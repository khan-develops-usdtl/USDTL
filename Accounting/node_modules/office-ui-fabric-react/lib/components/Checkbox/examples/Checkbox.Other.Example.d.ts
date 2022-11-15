/// <reference types="react" />
import * as React from 'react';
export interface ICheckboxOtherExamplesState {
    isChecked: boolean;
}
export declare class CheckboxOtherExamples extends React.Component<{}, ICheckboxOtherExamplesState> {
    state: ICheckboxOtherExamplesState;
    render(): JSX.Element;
    private _onCheckboxChange;
    private _onControlledCheckboxChange;
    private _renderLabelWithLink;
}
