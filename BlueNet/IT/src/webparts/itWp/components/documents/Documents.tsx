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
import { IPolicies, ITerms, IUserGuides } from "./IStates";
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
  const [userGuides, setUserGuides] = useState<IUserGuides[]>([]);
  useEffect(() => {
    sp.setup({ spfxContext: context });
    _getPolicies();
    _getSecurityTerms();
  }, []);
  const _getPolicies = async () => {
    const policiesRes = await sp.web.getFolderByServerRelativePath("Policies").files();
    const userGuidesRes = await sp.web.getFolderByServerRelativePath("User Guides").files();
    setPolicies(policiesRes);
    setUserGuides(userGuidesRes);
  };
  const _getSecurityTerms = async () => {
    const termsRes = await sp.web.lists.getByTitle("Security Terms").items.get();
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div className={styles.subHeading}>TERMS</div>
          <Paper variant="outlined" square={false} style={{ padding: "0.5em", height: "32em" }}>
            <div style={{ height: "7em", overflowY: "auto", marginBottom: "0.5em" }}>
              {terms.map((term) => (
                <Button onClick={() => _handleTermsClick(term)}>{term.Title}</Button>
              ))}
            </div>

            <div style={{ height: "23em", overflowY: "auto", padding: "0 1em" }}>
              {_filterTerms(terms).map((term) => (
                <div dangerouslySetInnerHTML={{ __html: term.About }}></div>
              ))}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div className={styles.subHeading}>POLICIES</div>
          <Paper
            variant="outlined"
            square={false}
            className={styles.paper}
            style={{ padding: "0.5em", height: "32em", overflowY: "auto" }}>
            {policies.map((policy) => (
              <div className={styles.subContainer}>
                <div>
                  <a href={`${siteUrl}/${policy.ServerRelativeUrl}`} target="_blank">
                    <FileTypeIcon
                      type={IconType.image}
                      application={_typeChecker(policy)}
                      size={ImageSize.medium}
                    />
                  </a>
                </div>
                <div>
                  <div style={{ padding: "0 10px" }}>
                    <a
                      href={`${siteUrl}${policy.ServerRelativeUrl}`}
                      target="_blank"
                      className={styles.fileName}>
                      {policy.Name}
                    </a>
                    <div className={styles.createdDate}>
                      {new Date(policy.TimeCreated).toLocaleDateString("en-US")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div className={styles.subHeading}>USER GUIDES</div>
          <Paper
            variant="outlined"
            square={false}
            className={styles.paper}
            style={{ padding: "0.5em", height: "32em", overflowY: "auto" }}>
              {userGuides.map((userGuide) => (
                <div className={styles.subContainer}>
                  <div>
                    <a href={`${siteUrl}/${userGuide.ServerRelativeUrl}`} target="_blank">
                      <FileTypeIcon
                        type={IconType.image}
                        application={_typeChecker(userGuide)}
                        size={ImageSize.medium}
                      />
                    </a>
                  </div>
                  <div>
                    <div style={{ padding: "0 10px" }}>
                      <a
                        href={`${siteUrl}${userGuide.ServerRelativeUrl}`}
                        target="_blank"
                        className={styles.fileName}>
                        {userGuide.Name}
                      </a>
                      <div className={styles.createdDate}>
                        {new Date(userGuide.TimeCreated).toLocaleDateString("en-US")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Documents;
