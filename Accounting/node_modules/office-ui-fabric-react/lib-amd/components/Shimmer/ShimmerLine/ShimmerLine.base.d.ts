/// <reference types="react" />
import { BaseComponent } from '../../../Utilities';
import { IShimmerLineProps } from './ShimmerLine.types';
/**
 * {@docCategory Shimmer}
 */
export declare class ShimmerLineBase extends BaseComponent<IShimmerLineProps, {}> {
    private _classNames;
    constructor(props: IShimmerLineProps);
    render(): JSX.Element;
}
