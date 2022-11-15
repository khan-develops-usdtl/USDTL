import { IChangeInfoHash } from './PublishUtilities';
import { IChangeInfo } from '../api/ChangeManagement';
import { IChangelog } from '../api/Changelog';
import { RushConfigurationProject } from '../api/RushConfigurationProject';
import { RushConfiguration } from '../api/RushConfiguration';
export declare class ChangelogGenerator {
    /**
     * Updates the appropriate changelogs with the given changes.
     */
    static updateChangelogs(allChanges: IChangeInfoHash, allProjects: Map<string, RushConfigurationProject>, rushConfiguration: RushConfiguration, shouldCommit: boolean): IChangelog[];
    /**
     * Fully regenerate the markdown files based on the current json files.
     */
    static regenerateChangelogs(allProjects: Map<string, RushConfigurationProject>, rushConfiguration: RushConfiguration): void;
    /**
     * Updates an individual changelog for a single project.
     */
    static updateIndividualChangelog(change: IChangeInfo, projectFolder: string, shouldCommit: boolean, rushConfiguration: RushConfiguration, isLockstepped?: boolean, isMain?: boolean): IChangelog | undefined;
    /**
     * Loads the changelog json from disk, or creates a new one if there isn't one.
     */
    private static _getChangelog;
    /**
     * Translates the given changelog json object into a markdown string.
     */
    private static _translateToMarkdown;
    /**
     * Helper to return the comments string to be appends to the markdown content.
     */
    private static _getChangeComments;
    /**
     * Changelogs should only be generated for publishable projects.
     * Do not update changelog or delete the change files for prerelease. Save them for the official release.
     * Unless the package is a hotfix, in which case do delete the change files.
     *
     * @param project
     * @param allChanges
     */
    private static _shouldUpdateChangeLog;
}
//# sourceMappingURL=ChangelogGenerator.d.ts.map