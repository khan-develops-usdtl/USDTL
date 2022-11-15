import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./JobPosts.module.scss";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/folders/list";
import "@pnp/sp/folders/item";
import { IFile } from "./IJobPosts";
import {
  FileTypeIcon,
  ApplicationType,
  IconType,
  ImageSize,
} from "@pnp/spfx-controls-react/lib/FileTypeIcon";
import { Grid } from "@material-ui/core";

const JobPosts = ({ context }) => {
  const [files, setFiles] = useState<IFile[]>([]);
  useEffect(() => {
    sp.setup({ spfxContext: context });
    _getFiles();
  }, []);
  const _getFiles = async () => {
    const filesRes = await sp.web
      .getFolderByServerRelativePath("/Shared Documents/Job Posts")
      .files();
    setFiles(filesRes);
  };
  const _getName = (file: IFile) => {
    return file.Name.split(".")
      .slice(0, file.Name.split(".").length - 1)
      .join(".");
  };
  const _typeChecker = (file) => {
    const fileType = file.Name.split(".")[file.Name.split(".").length - 1];
    if (fileType === "pdf") {
      return ApplicationType.PDF;
    } else if (fileType === "docx") {
      return ApplicationType.Word;
    } else if (fileType === "xlsx") {
      return ApplicationType.Excel;
    } else if (fileType === "aspx") {
      return ApplicationType.ASPX;
    }
  };
  return (
    <div className={styles.jobPostsWp}>
      <div className={styles.heading}>
        <i className="fa fa-hacker-news fa-lg" aria-hidden="true"></i> JOB POSTINGS
      </div>
      <div className={styles.container}>
        {files.map((file) => (
          <div className={styles.content}>
            <a className={styles.link} href={file.LinkingUri} target="_blank">
              <FileTypeIcon
                type={IconType.image}
                application={_typeChecker(file)}
                size={ImageSize.medium}
              />
            </a>
            <div>
              <a
                className={styles.link}
                href={
                  file.LinkingUri
                    ? file.LinkingUri
                    : `${context.pageContext.site.absoluteUrl}/${file.ServerRelativeUrl}`
                }
                target="_blank">
                <div className={styles.title}>{_getName(file)}</div>
              </a>
              <div className={styles.date}>
                Updated on {new Date(file.TimeLastModified).toLocaleDateString("en-US")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPosts;
