import { Grid } from "@material-ui/core";
import * as React from "react";
import { useState, useEffect } from "react";
import RootComponent from "./rootComponent/RootComponent";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import { IFolder } from "./IFoldersAndFIles";

const FoldersAndFiles = ({ context }) => {
  const [folders, setFolders] = useState<IFolder[]>([]);

  useEffect(() => {
    _getFolders();
  }, []);

  const _getFolders = async () => {
    const foldersRes = await sp.web.getFolderByServerRelativePath(`Shared Documents`).folders();
    const folders = foldersRes
      .map((folderRes) => ({
        ...folderRes,
        Name: folderRes.Name,
        isOpen: false,
        ServerRelativeUrl: folderRes.ServerRelativeUrl,
        TimeCreated: folderRes.TimeCreated,
      }))
      .sort((a, b) => a.Name.localeCompare(b.Name))
      .filter(folder => folder.Name !== "Forms");
    setFolders(folders);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {folders.map((folder) => (
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <RootComponent documentLibraryName={ folder.Name } />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FoldersAndFiles;
