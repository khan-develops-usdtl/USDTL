import { CircularProgress, Paper } from "@material-ui/core";
import * as React from "react";
import { useState, useEffect } from "react";
import { IFolder, IFile } from "./IRootComponent";
import styles from "./RootComponent.module.scss";
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
import FilesComponent from "../filesComponent/FilesComponent";

const RootComponent = ({ documentLibraryName }) => {
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [files, setFiles] = useState<IFile[]>([]);

  useEffect(() => {
    _getFolders();
    _getFiles();
  }, []);

  const _getFolders = async () => {
    const foldersRes = await sp.web
      .getFolderByServerRelativePath(`Shared Documents/${documentLibraryName}`)
      .folders();
    const folders = foldersRes.map((folderRes) => ({
      ...folderRes,
      Name: folderRes.Name,
      isOpen: false,
      ServerRelativeUrl: folderRes.ServerRelativeUrl,
      TimeCreated: folderRes.TimeCreated,
    })).sort((a,b) => a.Name.localeCompare(b.Name));
    setFolders(folders);
  };

  const _getFiles = async () => {
    const filesRes = await sp.web
      .getFolderByServerRelativePath(`Shared Documents/${documentLibraryName}`)
      .files();
    const files = filesRes.sort((a,b) => a.Name.localeCompare(b.Name))
    setFiles(filesRes);
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
    <Paper variant="outlined" square={false} className={styles.rootComponent}>
      <div className={styles.heading}>{documentLibraryName}</div>
      <div className={styles.container}>
        {folders.length > 0 &&
          folders.map((folder) => (
            <div
              className={styles.subContainer}
              onClick={() => {
                _updateIsOpen(folder);
              }}>
              {folder.isOpen ? (
                <div>
                  <div className={styles.folderContainer}>
                    <i
                      className="fa fa-folder-open"
                      aria-hidden="true"
                      style={{ color: "orange", fontSize: "2.75em" }}></i>
                    <div className={styles.folderName}>{folder.Name}</div>
                  </div>
                  <FilesComponent folder={folder}/>
                </div>
              ) : (
                <div className={styles.folderContainer}>
                  <i
                    className="fa fa-folder"
                    aria-hidden="true"
                    style={{ color: "orange", fontSize: "2.75em" }}></i>
                  <div className={styles.folderName}>{folder.Name}</div>
                </div>
              )}
            </div>
          ))}
        {files.length > 0 &&
          files.map((file) => (
            <a
              href={`https://usdtl.sharepoint.com${file.ServerRelativeUrl}`}
              target="_blank"
              className={styles.subContainer}>
              {_getIcons(file)}
              <div>
                <div className={styles.fileName}>{file.Name}</div>
                <div className={styles.createdDate}>
                  {new Date(file.TimeCreated).toLocaleDateString("en-US")}
                </div>
              </div>
            </a>
          ))}
      </div>
    </Paper>
  );
};

const _getIcons = (file) => {
  const fileType = file.Name.split(".")[file.Name.split(".").length - 1];
  if (fileType === "pdf") {
    return (
      <FileTypeIcon
        type={IconType.image}
        application={ApplicationType.PDF}
        size={ImageSize.medium}
      />
    );
  } else if (fileType === "docx" || fileType === "doc") {
    return (
      <FileTypeIcon
        type={IconType.image}
        application={ApplicationType.Word}
        size={ImageSize.medium}
      />
    );
  } else if (fileType === "xlsx" || fileType === "xls") {
    return (
      <FileTypeIcon
        type={IconType.image}
        application={ApplicationType.Excel}
        size={ImageSize.medium}
      />
    );
  } else if (fileType === "aspx") {
    return (
      <FileTypeIcon
        type={IconType.image}
        application={ApplicationType.ASPX}
        size={ImageSize.medium}
      />
    );
  } else if (fileType === "url") {
    return (
      <i
        className="fa fa-link"
        aria-hidden="true"
        style={{ color: "#1347a4", fontSize: "2.25em" }}></i>
    );
  } else if (fileType === "mp4") {
    return (
      <i
        className="fa fa-file-video-o"
        aria-hidden="true"
        style={{ color: "#1347a4", fontSize: "2.25em" }}></i>
    );
  } else {
    return (
      <i
        className="fa fa-file"
        aria-hidden="true"
        style={{ color: "#1347a4", fontSize: "2.25em" }}></i>
    );
  }
};

export default RootComponent;
