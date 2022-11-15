import * as React from "react";
import { useState, useEffect } from "react";
import { IFolder, IFile } from "./ILayer3";
import styles from "./Layer3.module.scss";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import FilesComponent from "../filesComponent/FilesComponent";
import Layer4 from "../layer4/Layer4";
import { getFolders } from "../utils/getFolders";
import { updateIsOpen } from "../utils/updateIsOpen";

const Layer3 = ({ layer1FolderName, layer2FolderName, layer3FolderName }) => {
  const [folders, setFolders] = useState<IFolder[]>([]);

  useEffect(() => {
    getFolders(`Shared Documents/${layer1FolderName}/${layer2FolderName}/${layer3FolderName}`, sp).then(res => setFolders(res))
  }, []);


  return (
    <div className={styles.layer3}>
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
                <Layer4
                  layer4FolderName={folder.Name}
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
        folderName={`Shared Documents/${layer1FolderName}/${layer2FolderName}/${layer3FolderName}`}
      />
    </div>
  );
};

export default Layer3;
