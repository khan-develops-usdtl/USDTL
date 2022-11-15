import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./Layer2.module.scss";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import FilesComponent from "../filesComponent/FilesComponent";
import { getFolders } from "../utils/getFolders"
import { updateIsOpen } from "../utils/updateIsOpen";
import { IFolder } from "../IRoot";
import Layer3 from "../layer3/Layer3";

const Layer2 = ({ layer1FolderName, layer2FolderName }) => {
  const [folders, setFolders] = useState<IFolder[]>([]);

  useEffect(() => {
    getFolders(`Shared Documents/${layer1FolderName}/${layer2FolderName}`, sp).then(res => setFolders(res))
  }, []);

  return (
    <div className={styles.layer2}>
        {folders.length > 0 &&
          folders.map((folder) => (
            <div className={styles.subContainer}>
              {folder.isOpen ? (
                <div>
                  <div className={styles.folderContainer} onClick={() => {
                    setFolders(updateIsOpen(folder, folders));
                  }}>
                    <i
                      className="fa fa-folder-open"
                      aria-hidden="true"
                      style={{ color: "orange", fontSize: "2.75em" }}></i>
                    <div className={styles.folderName}>{folder.Name}</div>
                  </div>
                  <Layer3
                    layer3FolderName={folder.Name}
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
        <FilesComponent folderName={`Shared Documents/${layer1FolderName}/${layer2FolderName}`} />
    </div>
  );
};

export default Layer2;
