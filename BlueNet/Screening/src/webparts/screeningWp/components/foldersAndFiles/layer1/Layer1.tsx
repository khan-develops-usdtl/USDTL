import * as React from "react";
import { useState, useEffect } from "react";
import { IFolder, IFile } from "./ILayer1";
import styles from "./Layer1.module.scss";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import FilesComponent from "../filesComponent/FilesComponent";
import LayerTwo from "../layer2/Layer2";
import { getFolders } from "../utils/getFolders"
import { updateIsOpen } from "../utils/updateIsOpen";
import { Paper } from "@material-ui/core";


const Layer1 = ({ layer1FolderName }) => {
  const [folders, setFolders] = useState<IFolder[]>([]);

  useEffect(() => {
    getFolders(`${layer1FolderName}`, sp).then(res => setFolders(res))
  }, []);

  return (
    <Paper variant="outlined" square={false} className={styles.layer1}>
      <div className={styles.heading}>Documents</div>
      <div className={styles.container}>
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
                  <LayerTwo
                    layer2FolderName={folder.Name}
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
        <FilesComponent folderName={`${layer1FolderName}`} />
      </div>
    </Paper>
  );
};


export default Layer1;
