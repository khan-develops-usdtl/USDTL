import { RushConfiguration } from '../api/RushConfiguration';
/**
 * Checks whether the common/scripts files are up to date, and recopies them if needed.
 * This is used by the "rush install" and "rush update" commands.
 */
export declare class StandardScriptUpdater {
    private static readonly _scriptNames;
    /**
     * Recopy the scripts if the scripts are out of date.
     * Used by "rush update".
     */
    static update(rushConfiguration: RushConfiguration): boolean;
    /**
     * Throw an exception if the scripts are out of date.
     * Used by "rush install".
     */
    static validate(rushConfiguration: RushConfiguration): void;
    /**
     * Compares a single script in the common/script folder to see if it needs to be updated.
     * If throwInsteadOfCopy=false, then an outdated or missing script will be recopied;
     * otherwise, an exception is thrown.
     */
    private static _updateScriptOrThrow;
    private static _normalize;
}
//# sourceMappingURL=StandardScriptUpdater.d.ts.map