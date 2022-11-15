import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/folders/list";
import "@pnp/sp/folders/item";
import "@pnp/sp/files/folder";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Grid, Paper } from "@material-ui/core";
import styles from "./Document.module.scss";
import { IPolicies, ITerms } from "./IStates";
import {
  ApplicationType,
  FileTypeIcon,
  IconType,
  ImageSize,
} from "@pnp/spfx-controls-react/lib/FileTypeIcon";

const Documents = ({ context }) => {
  const siteUrl = "https://usdtl.sharepoint.com";
  const [title, setTitle] = useState<string>("");
  const [terms, setTerms] = useState<ITerms[]>([]);
  const [policies, setPolicies] = useState<IPolicies[]>([]);
  useEffect(() => {
    sp.setup({ spfxContext: context });
    _getPolicies();
    _getSecurityTerms();
  }, []);
  const _getPolicies = async () => {
    const policiesRes = await sp.web
      .getFolderByServerRelativePath("Policies")
      .files();
    console.log(policiesRes);
    setPolicies(policiesRes);
  };
  const _getSecurityTerms = async () => {
    const termsRes = await sp.web.lists
      .getByTitle("Security Terms")
      .items.get();
    setTerms(termsRes);
  };
  const _handleTermsClick = (term) => {
    setTitle(term.Title);
  };
  const _filterTerms = (terms) => {
    return terms.filter((term) => {
      if (title !== "") {
        return term.Title === title;
      }
      return term;
    });
  };
  const _typeChecker = (file) => {
    const fileType = file.Name.split(".")[file.Name.split(".").length - 1];
    if (fileType === "pdf") {
      return ApplicationType.PDF;
    } else if (fileType === "docx") {
      return ApplicationType.Word;
    } else if (fileType === "xlsx") {
      return ApplicationType.Excel;
    }
  };
  return (
    <div className={styles.documentsWp}>
      <div className={styles.heading}>SECURITY</div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div className={styles.subHeading}>TERMS</div>
          <Paper variant="outlined" square={false}>
            <div className={styles.gridSubItem}>
              <Grid container>
                <Grid
                  item
                  xs={1}
                  sm={1}
                  md={1}
                  lg={1}
                  xl={1}
                  className={styles.leftGridItem}
                >
                  <ButtonGroup
                    variant="contained"
                    color="secondary"
                    orientation="vertical"
                  >
                    {terms.map((term) => (
                      <Button onClick={() => _handleTermsClick(term)}>
                        {term.Title}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Grid>
                <Grid
                  item
                  xs={11}
                  sm={11}
                  md={11}
                  lg={11}
                  xl={11}
                  className={styles.rightGridItem}
                >
                  {_filterTerms(terms).map((term) => (
                    <div dangerouslySetInnerHTML={{ __html: term.About }}></div>
                  ))}
                </Grid>
              </Grid>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div className={styles.subHeading}>POLICIES</div>
          <Paper variant="outlined" square={false} className={styles.paper}>
            <div className={styles.gridSubItem}>
              {policies.map((policy) => (
                <Grid container className={styles.gridSubContainer}>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    md={1}
                    lg={1}
                    xl={1}
                    style={{ display: "grid", placeSelf: "center" }}
                  >
                    <a
                      href={`${siteUrl}/${policy.ServerRelativeUrl}`}
                      target="_blank"
                    >
                      <FileTypeIcon
                        type={IconType.image}
                        application={_typeChecker(policy)}
                        size={ImageSize.medium}
                      />
                    </a>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={11}
                    md={11}
                    lg={11}
                    xl={11}
                    style={{ display: "grid", alignItems: "center" }}
                  >
                    <div style={{ padding: "0 10px" }}>
                      <a
                        href={`${siteUrl}${policy.ServerRelativeUrl}`}
                        target="_blank"
                        className={styles.fileName}
                      >
                        {policy.Name}
                      </a>
                      <div className={styles.createdDate}>
                        {new Date(policy.TimeCreated).toLocaleDateString(
                          "en-US"
                        )}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              ))}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div className={styles.subHeading}>USER GUIDES</div>
          <Paper variant="outlined" square={false} className={styles.paper}>
            <div className={styles.gridSubItem}>
              {policies.map((policy) => (
                <Grid container className={styles.gridSubContainer}>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    md={1}
                    lg={1}
                    xl={1}
                    style={{ display: "grid", placeSelf: "center" }}
                  >
                    <a
                      href={`${siteUrl}/${policy.ServerRelativeUrl}`}
                      target="_blank"
                    >
                      <FileTypeIcon
                        type={IconType.image}
                        application={_typeChecker(policy)}
                        size={ImageSize.medium}
                      />
                    </a>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={11}
                    md={11}
                    lg={11}
                    xl={11}
                    style={{ display: "grid", alignItems: "center" }}
                  >
                    <div style={{ padding: "0 10px" }}>
                      <a
                        href={`${siteUrl}${policy.ServerRelativeUrl}`}
                        target="_blank"
                        className={styles.fileName}
                      >
                        {policy.Name}
                      </a>
                      <div className={styles.createdDate}>
                        {new Date(policy.TimeCreated).toLocaleDateString(
                          "en-US"
                        )}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              ))}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Documents;
