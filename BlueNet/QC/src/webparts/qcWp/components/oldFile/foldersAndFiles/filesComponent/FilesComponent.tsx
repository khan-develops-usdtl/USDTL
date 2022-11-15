import * as React from "react";
import { useState, useEffect } from "react";
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
import { IFile } from "./IFilesComponent";
import styles from "./FilesComponent.module.scss";
import { CircularProgress } from "@material-ui/core";

const FilesComponent = ({ folder }) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    _getFiles();
  }, []);

  const _getFiles = async () => {
    const filesRes = await sp.web
      .getFolderByServerRelativePath(`${folder.ServerRelativeUrl}`)
      .files()
    const files = filesRes.sort((a, b) => a.Name.localeCompare(b.Name))
    setFiles(files);
    setIsloading(false);
  };
  return (
    <div className={styles.filesComponent}>
      {files.length > 0 &&
        files.map((file) => (
          <div>
            {isLoading ? (
              <CircularProgress />
            ) : (
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
            )}
          </div>
        ))}
    </div>
  );
};

export default FilesComponent;

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
