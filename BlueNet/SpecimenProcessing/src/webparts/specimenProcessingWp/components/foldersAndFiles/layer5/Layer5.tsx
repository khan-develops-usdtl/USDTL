import * as React from "react";
import { useState, useEffect } from "react";
import { IFolder } from "./ILayer5";
import styles from "./Layer5.module.scss";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import FilesComponent from "../filesComponent/FilesComponent";
import Layer6 from "../layer6/Layer6";
import { updateIsOpen } from "../utils/updateIsOpen";
import { getFolders } from "../utils/getFolders";

const Layer5 = ({
  layer1FolderName,
  layer2FolderName,
  layer3FolderName,
  layer4FolderName,
  layer5FolderName,
}) => {
  const [folders, setFolders] = useState<IFolder[]>([]);

  useEffect(() => {
    getFolders(`${layer1FolderName}/${layer2FolderName}/${layer3FolderName}/${layer4FolderName}/${layer5FolderName}`, sp).then(res => setFolders(res));
  }, []);

  return (
    <div className={styles.layer5}>
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
                <Layer6
                  layer6FolderName={folder.Name}
                  layer5FolderName={layer5FolderName}
                  layer4FolderName={layer4FolderName}
                  layer3FolderName={layer3FolderName}
                  layer2FolderName={layer2FolderName}
                  layer1FolderName={layer1FolderName}
                />
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
        folderName={`${layer1FolderName}/${layer2FolderName}/${layer3FolderName}/${layer4FolderName}/${layer5FolderName}`}
      />
    </div>
  );
};


export default Layer5;
