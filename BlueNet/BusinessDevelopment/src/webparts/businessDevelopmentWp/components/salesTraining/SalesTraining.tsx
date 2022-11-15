// import { Paper } from "@material-ui/core";
// import * as React from "react";
// import { useState, useEffect } from "react";
// import { IFolder, IFile } from "./IRootComponent";
// import styles from "./RootComponent.module.scss";
// import { sp } from "@pnp/sp";
// import "@pnp/sp/webs";
// import "@pnp/sp/items";
// import "@pnp/sp/folders";
// import "@pnp/sp/files";
// import "@pnp/sp/lists";
// import {
//   ApplicationType,
//   FileTypeIcon,
//   IconType,
//   ImageSize,
// } from "@pnp/spfx-controls-react/lib/FileTypeIcon";
// import * as strings from "BusinessDevelopmentWpWebPartStrings";

// const RootComponent = ({ documentLibraryName }) => {
//   const [folders, setFolders] = useState<IFolder[]>([]);
//   const [files, setFiles] = useState<IFile[]>([]);
//   const [openFolders, setOpenFolders] = useState<any>([]);

//   useEffect(() => {
//     _getFolders();
//     _getFiles();
//   }, []);

//   const _getFolders = async () => {
//     const foldersRes = await sp.web
//       .getFolderByServerRelativePath(`Shared Documents/${documentLibraryName}`)
//       .folders();
//     const folders = foldersRes.map((folderRes) => ({
//       ...folderRes,
//       Name: folderRes.Name,
//       isOpen: false,
//       ServerRelativeUrl: folderRes.ServerRelativeUrl,
//       TimeCreated: folderRes.TimeCreated,
//     }));
//     setFolders(folders);
//   };

//   const _getFiles = async () => {
//     const filesRes = await sp.web
//       .getFolderByServerRelativePath(`Shared Documents/${documentLibraryName}`)
//       .files();
//     setFiles(filesRes);
//   };

//   const _openFolderFiles = async (folder: IFolder) => {
//     if (folder.isOpen) {
//       const filesRes = await sp.web
//         .getFolderByServerRelativePath(`${folder.ServerRelativeUrl}`)
//         .files();
//       setOpenFolders([...openFolders, { folderName: folder.Name, files: filesRes }]);
//     }
//     if (!folder.isOpen) {
//       const result = openFolders.filter((openFolder) => openFolder.folderName !== folder.Name);
//       setOpenFolders(result);
//     }
//   };

//   const _closeFolderFiles = (folder: IFolder) => {};

//   const _updateIsOpen = (folder: IFolder) => {
//     const result = [
//       ...folders.map((folderElement) => {
//         if (folderElement.Name === folder.Name) {
//           folderElement.isOpen = !folder.isOpen;
//         }
//         return folderElement;
//       }),
//     ];
//     setFolders(result);
//     _openFolderFiles(folder);
//   };

//   return (
//     <Paper variant="outlined" square={false} className={styles.rootComponent}>
//       <div className={styles.heading}>{documentLibraryName}</div>
//       <div className={styles.container}>
//         {folders.length > 0 &&
//           folders.map((folder) => (
//             <div
//               className={styles.subContainer}
//               onClick={() => {
//                 _updateIsOpen(folder);
//               }}>
//               {folder.isOpen ? (
//                 <div>
//                   <div className={styles.folderContainer}>
//                     <i
//                       className="fa fa-folder-open"
//                       aria-hidden="true"
//                       style={{ color: "orange", fontSize: "2.75em" }}></i>
//                     <div className={styles.folderName}>{folder.Name}</div>
//                   </div>

//                   {openFolders.find((openFolder) => openFolder.folderName === folder.Name) &&
//                     openFolders
//                       .find((openFolder) => openFolder.folderName === folder.Name)
//                       .files.map((file) => (
//                         <a
//                           href={`https://usdtl.sharepoint.com${file.ServerRelativeUrl}`}
//                           target="_blank"
//                           className={styles.subContainer}>
//                           {_getIcons(file)}
//                           <div>
//                             <div className={styles.fileName}>{file.Name}</div>
//                             <div className={styles.createdDate}>
//                               {new Date(file.TimeCreated).toLocaleDateString("en-US")}
//                             </div>
//                           </div>
//                         </a>
//                       ))}
//                 </div>
//               ) : (
//                 <div className={styles.folderContainer}>
//                   <i
//                     className="fa fa-folder"
//                     aria-hidden="true"
//                     style={{ color: "orange", fontSize: "2.75em" }}></i>
//                   <div className={styles.folderName}>{folder.Name}</div>
//                 </div>
//               )}
//             </div>
//           ))}
//         {files.length > 0 &&
//           files.map((file) => (
//             <a
//               href={`https://usdtl.sharepoint.com${file.ServerRelativeUrl}`}
//               target="_blank"
//               className={styles.subContainer}>
//               {_getIcons(file)}
//               <div>
//                 <div className={styles.fileName}>{file.Name}</div>
//                 <div className={styles.createdDate}>
//                   {new Date(file.TimeCreated).toLocaleDateString("en-US")}
//                 </div>
//               </div>
//             </a>
//           ))}
//       </div>
//     </Paper>
//   );
// };

// const _getIcons = (file) => {
//   const fileType = file.Name.split(".")[file.Name.split(".").length - 1];
//   if (fileType === "pdf") {
//     return (
//       <FileTypeIcon
//         type={IconType.image}
//         application={ApplicationType.PDF}
//         size={ImageSize.medium}
//       />
//     );
//   } else if (fileType === "docx" || fileType === "doc") {
//     return (
//       <FileTypeIcon
//         type={IconType.image}
//         application={ApplicationType.Word}
//         size={ImageSize.medium}
//       />
//     );
//   } else if (fileType === "xlsx" || fileType === "xls") {
//     return (
//       <FileTypeIcon
//         type={IconType.image}
//         application={ApplicationType.Excel}
//         size={ImageSize.medium}
//       />
//     );
//   } else if (fileType === "aspx") {
//     return (
//       <FileTypeIcon
//         type={IconType.image}
//         application={ApplicationType.ASPX}
//         size={ImageSize.medium}
//       />
//     );
//   } else if (fileType === "url") {
//     return (
//       <i
//         className="fa fa-link"
//         aria-hidden="true"
//         style={{ color: "#1347a4", fontSize: "2.25em" }}></i>
//     );
//   } else if (fileType === "mp4") {
//     return (
//       <i
//         className="fa fa-file-video-o"
//         aria-hidden="true"
//         style={{ color: "#1347a4", fontSize: "2.25em" }}></i>
//     );
//   } else {
//     return (
//       <i
//         className="fa fa-file"
//         aria-hidden="true"
//         style={{ color: "#1347a4", fontSize: "2.25em" }}></i>
//     );
//   }
// };

// export default RootComponent;




// import { Grid, Paper } from "@material-ui/core";
// import { sp } from "@pnp/sp";
// import "@pnp/sp/webs";
// import "@pnp/sp/items";
// import "@pnp/sp/folders";
// import "@pnp/sp/files";
// import "@pnp/sp/lists";
// import * as React from "react";
// import { useEffect, useState } from "react";
// import styles from "./SalesTraining.module.scss";
// import { IFile, IVideo } from "./IUSDTLSalesModel";
// import {
//   ApplicationType,
//   FileTypeIcon,
//   IconType,
//   ImageSize,
// } from "@pnp/spfx-controls-react/lib/FileTypeIcon";
// import YouTubeIcon from "@material-ui/icons/YouTube";

// const SalesTraining = ({ context }) => {
//   const [siteUrl, setSiteUrl] = useState<string>("");
//   const [salesModelTrainingYear1, setSalesModelTrainingYear1] = useState<IFile[]>([]);
//   const [salesModelTrainingYear2, setSalesModelTrainingYear2] = useState<IFile[]>([]);
//   const [salesforceTrainingResources, setSalesforceTrainingResources] = useState<IFile[]>([]);
//   const [burdenOfProofResources, setBurdenOfProofResources] = useState<IFile[]>([]);
//   const [worksheedAndToolsOpenFolderName, setWorksheedAndToolsOpenFolderName] =
//     useState<string>("");
//   const [worksheetAndToolsOpenFiles, setWorksheetAndToolsOpenFiles] = useState<IFile[]>([]);
//   const [cadencesOpenFolderName, setCadencesOpenFolderName] = useState<string>("");
//   const [cadencesOpenFiles, setCadencesOpenFiles] = useState<IFile[]>([]);
//   const [videos, setVideos] = useState<IVideo[]>([]);

//   useEffect(() => {
//     sp.setup({ spfxContext: context });
//     _getSalesModel();
//   }, []);
//   const _getSalesModel = async () => {
//     const siteUrlRes = await sp.site.getContextInfo();
//     const salesModelTrainingYear1 = await sp.web
//       .getFolderByServerRelativePath("Shared Documents/Sales Model Training Year 1")
//       .files();
//     const salesModelTrainingYear2 = await sp.web
//       .getFolderByServerRelativePath("Shared Documents/Sales Model Training Year 2")
//       .files();
//     const salesforceTrainingResources = await sp.web
//       .getFolderByServerRelativePath("Shared Documents/Salesforce Training Resources")
//       .folders();
//     const burdenOfProofResources = await sp.web
//       .getFolderByServerRelativePath("Shared Documents/Burden of Proof Resources")
//       .folders();
//     const definitiveHealthcareTraining = await sp.web
//       .getFolderByServerRelativePath("Shared Documents/Definitive Healthcare Training")
//       .folders();
//     const otherTrainingResources = await sp.web
//       .getFolderByServerRelativePath("Shared Documents/Other Training Resources")
//       .folders();

//     // const videosRes = await sp.web.lists.getByTitle("Session Videos-AB").items.get();

//     // setVideos(videosRes);
//     setSiteUrl(siteUrlRes.SiteFullUrl);
//     setSalesModelTrainingYear1(salesModelTrainingYear1);
//     setSalesModelTrainingYear2(salesModelTrainingYear2);
//     setSalesforceTrainingResources(salesforceTrainingResources);
//     setBurdenOfProofResources(burdenOfProofResources);
//     setDefinitiveHealthcareTraining(definitiveHealthcareTraining);
//     setOtherTrainingResources(otherTrainingResources);
//   };

//   const _handleOpenWorksheetAndToolsFolder = async (e, folder) => {
//     setWorksheedAndToolsOpenFolderName(folder.Name);
//     const files = await sp.web.getFolderByServerRelativePath(folder.ServerRelativeUrl).files();
//     setWorksheetAndToolsOpenFiles(files);
//   };

//   const _handleOpenCadencesFolder = async (e, folder) => {
//     setCadencesOpenFolderName(folder.Name);
//     const files = await sp.web.getFolderByServerRelativePath(folder.ServerRelativeUrl).files();
//     setCadencesOpenFiles(files);
//   };

//   const _handleCloseWorksheetAndToolsFolder = () => {
//     setWorksheedAndToolsOpenFolderName("");
//     setWorksheetAndToolsOpenFiles([]);
//   };

//   const _handleCloseCadencesFolder = () => {
//     setCadencesOpenFolderName("");
//     setCadencesOpenFiles([]);
//   };

//   const _getIcons = (file) => {
//     const fileType = file.Name.split(".")[file.Name.split(".").length - 1];
//     if (fileType === "pdf") {
//       return (
//         <FileTypeIcon
//           type={IconType.image}
//           application={ApplicationType.PDF}
//           size={ImageSize.medium}
//         />
//       );
//     } else if (fileType === "docx" || fileType === "doc") {
//       return (
//         <FileTypeIcon
//           type={IconType.image}
//           application={ApplicationType.Word}
//           size={ImageSize.medium}
//         />
//       );
//     } else if (fileType === "xlsx" || fileType === "xls") {
//       return (
//         <FileTypeIcon
//           type={IconType.image}
//           application={ApplicationType.Excel}
//           size={ImageSize.medium}
//         />
//       );
//     } else if (fileType === "aspx") {
//       return (
//         <FileTypeIcon
//           type={IconType.image}
//           application={ApplicationType.ASPX}
//           size={ImageSize.medium}
//         />
//       );
//     } else if (fileType === "url") {
//       return (
//         <i
//           className="fa fa-link"
//           aria-hidden="true"
//           style={{ color: "#1347a4", fontSize: "2em" }}></i>
//       );
//     } else if (fileType === "mp4") {
//       return (
//         <i
//           className="fa fa-file-video-o"
//           aria-hidden="true"
//           style={{ color: "#1347a4", fontSize: "2em" }}></i>
//       );
//     } else {
//       return (
//         <i
//           className="fa fa-file"
//           aria-hidden="true"
//           style={{ color: "#1347a4", fontSize: "2em" }}></i>
//       );
//     }
//   };
//   return (
//     <div className={styles.SalesTraining}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
//           <Paper variant="outlined" square={false} className={styles.paper}>
//             <div className={styles.subHeading}>USDTL Sales Model</div>
//             <div className={styles.container}>
//               {salesModelTrainingYear1.map((file) => (
//                 <div className={styles.subContainer}>
                  // <a href={`${siteUrl}${file.ServerRelativeUrl}`} target="_blank">
                  //   {_getIcons(file)}
                  // </a>
//                   <div>
//                     <a
//                       href={`${siteUrl}${file.ServerRelativeUrl}`}
//                       target="_blank"
//                       className={styles.fileName}>
//                       {file.Name}
//                     </a>
//                     <div className={styles.createdDate}>
//                       {new Date(file.TimeCreated).toLocaleDateString("en-US")}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
//           <Paper variant="outlined" square={false} className={styles.paper}>
//             <div className={styles.subHeading}>Impact Sales Manual</div>
//             <div className={styles.container}>
//               {salesModelTrainingYear2.map((file) => (
//                 <div className={styles.subContainer}>
//                   <a href={`${siteUrl}${file.ServerRelativeUrl}`} target="_blank">
//                     {_getIcons(file)}
//                   </a>
//                   <div>
//                     <a
//                       href={`${siteUrl}${file.ServerRelativeUrl}`}
//                       target="_blank"
//                       className={styles.fileName}>
//                       {file.Name}
//                     </a>
//                     <div className={styles.createdDate}>
//                       {new Date(file.TimeCreated).toLocaleDateString("en-US")}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
//           <Paper variant="outlined" square={false} className={styles.paper}>
//             <div className={styles.subHeading}>Cadences</div>
//             <div className={styles.container}>
//               {salesforceTrainingResources.map((folder) => (
//                 <div>
//                   {folder.Name === cadencesOpenFolderName ? (
//                     <div className={styles.subFilesContainer}>
//                       <i
//                         onClick={_handleCloseCadencesFolder}
//                         className="fa fa-folder-open"
//                         aria-hidden="true"
//                         style={{ color: "orange", fontSize: "2.75em", cursor: "pointer" }}></i>
//                       <div className={styles.fileName}>{folder.Name}</div>
//                     </div>
//                   ) : (
//                     <div className={styles.subFilesContainer}>
//                       <i
//                         onClick={(e) => _handleOpenCadencesFolder(e, folder)}
//                         className="fa fa-folder"
//                         aria-hidden="true"
//                         style={{ color: "orange", fontSize: "2.75em", cursor: "pointer" }}></i>
//                       <div className={styles.fileName}>{folder.Name}</div>
//                     </div>
//                   )}

//                   {folder.Name === cadencesOpenFolderName &&
//                     cadencesOpenFiles.map((file) => (
//                       <div className={styles.subFilesContainer}>
//                         <a href={`${siteUrl}${file.ServerRelativeUrl}`} target="_blank">
//                           {_getIcons(file)}{" "}
//                         </a>
//                         <div>
//                           <a
//                             href={`${siteUrl}${file.ServerRelativeUrl}`}
//                             target="_blank"
//                             className={styles.fileName}>
//                             {file.Name}
//                           </a>
//                           <div className={styles.createdDate}>
//                             {new Date(file.TimeCreated).toLocaleDateString("en-US")}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               ))}
//             </div>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
//           <Paper variant="outlined" square={false} className={styles.paper}>
//             <div className={styles.subHeading}>Sales Training Videos</div>
//             <div className={styles.container}>
//               {videos.map((video) => (
//                 <div className={styles.subContainer}>
//                   <a
//                     href={video.VideoLink.Url}
//                     target="_blank"
//                     style={{ position: "relative", width: "8em" }}>
//                     <YouTubeIcon className={styles.playButton} fontSize="small"></YouTubeIcon>
//                     <img className={styles.thumbnail} src={video.ThumbnailImage.Url} />
//                   </a>
//                   <div>
//                     <a href={video.VideoLink.Url} target="_blank" className={styles.fileName}>
//                       {video.Title}
//                     </a>
//                     <div className={styles.createdDate}>
//                       {new Date(video.Created).toLocaleDateString("en-US")}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
//           <Paper variant="outlined" square={false} className={styles.paper}>
//             <div className={styles.subHeading}>Worksheets and Tools</div>
//             <div className={styles.container}>
//               {burdenOfProofResources.map((folder) => (
//                 <div>
//                   {folder.Name === worksheedAndToolsOpenFolderName ? (
//                     <div className={styles.subContainer}>
//                       <i
//                         onClick={_handleCloseWorksheetAndToolsFolder}
//                         className="fa fa-folder-open"
//                         aria-hidden="true"
//                         style={{ color: "orange", fontSize: "2.75em", cursor: "pointer" }}></i>
//                       <div className={styles.folderName}>{folder.Name}</div>
//                     </div>
//                   ) : (
//                     <div className={styles.subContainer}>
//                       <i
//                         onClick={(e) => _handleOpenWorksheetAndToolsFolder(e, folder)}
//                         className="fa fa-folder"
//                         aria-hidden="true"
//                         style={{ color: "orange", fontSize: "2.75em", cursor: "pointer" }}></i>
//                       <div className={styles.folderName}>{folder.Name}</div>
//                     </div>
//                   )}

//                   <div>
//                     {folder.Name === worksheedAndToolsOpenFolderName &&
//                       worksheetAndToolsOpenFiles.map((file) => (
//                         <div className={styles.subFilesContainer}>
//                           <a href={`${siteUrl}${file.ServerRelativeUrl}`} target="_blank">
//                             {_getIcons(file)}
//                           </a>
//                           <div>
//                             <a
//                               href={`${siteUrl}${file.ServerRelativeUrl}`}
//                               target="_blank"
//                               className={styles.fileName}>
//                               {file.Name}
//                             </a>
//                             <div className={styles.createdDate}>
//                               {new Date(file.TimeCreated).toLocaleDateString("en-US")}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
//           <Paper variant="outlined" square={false} className={styles.paper}>
//             <div className={styles.subHeading}>Add Item</div>
//             <div className={styles.container}>
//               {videos.map((video) => (
//                 <div className={styles.subContainer}></div>
//               ))}
//             </div>
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default SalesTraining;
