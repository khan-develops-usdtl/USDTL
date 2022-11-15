import * as React from "react";
import { useState, useEffect } from "react";
import { IFolder } from "./ILayer6";
import styles from "./Layer6.module.scss";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import FilesComponent from "../filesComponent/FilesComponent";
import { updateIsOpen } from "../utils/updateIsOpen";
import { getFolders } from "../utils/getFolders";

const Layer6 = ({
  layer1FolderName,
  layer2FolderName,
  layer3FolderName,
  layer4FolderName,
  layer5FolderName,
  layer6FolderName,
}) => {
  const [folders, setFolders] = useState<IFolder[]>([]);

  useEffect(() => {
    getFolders(
      `Shared Documents/${layer1FolderName}/${layer2FolderName}/${layer3FolderName}/${layer4FolderName}/${layer5FolderName}/${layer6FolderName}`, sp
    ).then((res) => setFolders(res));
  }, []);

  return (
    <div className={styles.layer6}>
      This is layer 5
      {folders.length > 0 &&
        folders.map((folder) => (
          <div className={styles.subContainer}>
            {folder.isOpen ? (
              <div>
                <div
                  className={styles.folderContainer}
                  onClick={() => {
                    setFolders(updateIsOpen(folder, folders));
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
                  setFolders(updateIsOpen(folder, folders));
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
      <FilesComponent
        folderName={`Shared Documents/${layer1FolderName}/${layer2FolderName}/${layer3FolderName}/${layer4FolderName}/${layer5FolderName}/${layer6FolderName}`}
      />
    </div>
  );
};

export default Layer6;
