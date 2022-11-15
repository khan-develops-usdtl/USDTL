import * as React from "react";
import { IImages } from "./ISite";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Grid } from "@material-ui/core";
import styles from "./Site.module.scss";

const Site = ({ context }) => {
  const [siteLinks, setSiteLinks] = React.useState<IImages[]>([]);
  React.useEffect(() => {
    sp.setup({ spfxContext: context });
    _getImages();
  }, []);
  const _getImages = async () => {
    const siteLinksRes = await sp.web.lists.getByTitle("Site Links").items.get();
    console.log(siteLinksRes);
    setSiteLinks(siteLinksRes);
  };
  return (
    <div className={ styles.site }>
    <Grid container spacing={3}>
      {siteLinks.map((siteLink) => (
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <Card>
          <CardActionArea href={siteLink.Link.Url}>
            <CardMedia
              component="img"
              alt={siteLink.Title}
              image={siteLink.ImageLink.Url}
              title="Paella dish"
            />
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" href={siteLink.Link.Url}>
                Learn More
              </Button>
            </CardActions>
            
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>

  );
};

export default Site;
