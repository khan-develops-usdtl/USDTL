import * as React from "react";
import { useState, useEffect } from "react";
import { IFolder, IFile } from "./IFolders";
import styles from "./Layer1.module.scss";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import {
  ApplicationType,
  FileTypeIcon,
  IconType,
  ImageSize,
} from "@pnp/spfx-controls-react/lib/FileTypeIcon";

const Folders = ({ path }) => {
  const [folders, setFolders] = useState<IFolder[]>([]);

  useEffect(() => {
    _getFolders();
  }, []);

  const _getFolders = async () => {
    const foldersRes = await sp.web
      .getFolderByServerRelativePath(path)
      .folders();
    const folders = foldersRes
      .map((folderRes) => ({
        ...folderRes,
        Name: folderRes.Name,
        isOpen: false,
        ServerRelativeUrl: folderRes.ServerRelativeUrl,
        TimeCreated: folderRes.TimeCreated,
      }))
      .sort((a, b) => a.Name.localeCompare(b.Name));
    setFolders(folders);
  };

  const _updateIsOpen = (folder: IFolder) => {
    const result = [
      ...folders.map((folderElement) => {
        if (folderElement.Name === folder.Name) {
          folderElement.isOpen = !folder.isOpen;
        }
        return folderElement;
      }),
    ];
    setFolders(result);
  };

  return (
    <div className={styles.layer1}>
        {folders.length > 0 &&
          folders.map((folder) => (
            <div className={styles.subContainer}>
              {folder.isOpen ? (
                <div>
                  <div className={styles.folderContainer} onClick={() => {
                    _updateIsOpen(folder);
                  }}>
                    <i
                      className="fa fa-folder-open"
                      aria-hidden="true"
                      style={{ color: "orange", fontSize: "2.75em" }}></i>
                    <div className={styles.folderName}>{folder.Name}</div>
                  </div>
                </div>
              ) : (
                <div
                  className={styles.folderContainer}
                  onClick={() => {
                    _updateIsOpen(folder);
                  }}>
                  <i
                    className="fa fa-folder"
                    aria-hidden="true"
                    style={{ color: "orange", fontSize: "2.75em" }}></i>
                  <div className={styles.folderName}>{folder.Name}</div>
                </div>
              )}
            </div>
          ))}
      </div>
  );
};

export default Folders;
