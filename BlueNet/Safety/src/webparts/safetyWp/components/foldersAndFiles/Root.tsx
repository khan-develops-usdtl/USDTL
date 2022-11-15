import * as React from "react";
import { useState, useEffect } from "react";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import { IFolder } from "./IRoot";
import LayerOne from "./layer1/Layer1";
import { getFolders } from "./utils/getFolders";
import { Grid } from "@material-ui/core";


const Root = ({ context }) => {
  const [folders, setFolders] = useState<IFolder[]>([]);

  useEffect(() => {
    getFolders(`Shared Documents`, sp).then(res => setFolders(res));
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        {folders.map((folder) => (
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <LayerOne layer1FolderName={ folder.Name } />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Root;
