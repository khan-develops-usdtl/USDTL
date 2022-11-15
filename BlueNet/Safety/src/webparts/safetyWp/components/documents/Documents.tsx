import { Grid } from '@material-ui/core';
import * as React from 'react';
import Layer1 from '../foldersAndFiles/layer1/Layer1';


const Documents = () => {
  return <div>
      <Grid container spacing={2}>
            <Layer1 layer1FolderName={ 'Safety' } />
      </Grid>
  </div>;
};

export default Documents;
