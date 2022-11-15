import { BasePackage } from './base/BasePackage';
export declare class PackageLookup {
    private _packageMap;
    constructor();
    loadTree(root: BasePackage): void;
    getPackage(nameAndVersion: string): BasePackage | undefined;
}
//# sourceMappingURL=PackageLookup.d.ts.map