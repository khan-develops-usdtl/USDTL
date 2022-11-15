/// <reference types="react" />
import { BaseComponent } from '../../../Utilities';
import { IShimmerGapProps } from './ShimmerGap.types';
/**
 * {@docCategory Shimmer}
 */
export declare class ShimmerGapBase extends BaseComponent<IShimmerGapProps, {}> {
    private _classNames;
    constructor(props: IShimmerGapProps);
    render(): JSX.Element;
}
