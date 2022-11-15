import * as React from "react";
import { useEffect, useState } from "react";
import { sp } from "@pnp/sp";
import { IFormAndSurvey } from "./IStates";
import styles from "./FormAndSurvey.module.scss";
import Chip from "@material-ui/core/Chip";
import LinkIcon from "@material-ui/icons/Link";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: "none",
      color: "white",
    },
    paper: {
      padding: theme.spacing(0),
    },
  })
);
const FormAndSurvey = ({ context }) => {
  const [formsAndSurveys, setFormsAndSurveys] = useState<IFormAndSurvey[]>([]);

  useEffect(() => {
    sp.setup({ spfxContext: context });
    _formAndSurvey();
  }, []);
  const _formAndSurvey = async () => {
    const formAndSurveyRes: IFormAndSurvey[] = await sp.web.lists
      .getByTitle("Forms and Surveys")
      .items.get();
    const modifiedFormAndSurveyRes = formAndSurveyRes.map((formAndSurvey) => ({
      ...formAndSurvey,
      Date: formAndSurvey.Date ? new Date(formAndSurvey.Date).toLocaleDateString("en-US") : null,
    }));
    console.log(modifiedFormAndSurveyRes)
    setFormsAndSurveys(modifiedFormAndSurveyRes);
  };
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [popoverId, setPopoverId] = useState<string | null>(null);

  const handlePopoverOpen = (e, id) => {
    setPopoverId(id);
    setAnchorEl(e.target);
  };

  const handlePopoverClose = () => {
    setPopoverId(null);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className={styles.formAndSurvey}>
      <div className={styles.heading}>
        <i className="fa fa-wpforms" aria-hidden="true"></i> FORMS AND SURVEYS
      </div>
      <div className={styles.container}>
        {formsAndSurveys.map((formAndSurvey) => (
          <div className={styles.item}>
            {formAndSurvey.DocumentLink && formAndSurvey.Active ? (
              <Grid>
                <Chip
                  className={styles.chip}
                  icon={<LinkIcon />}
                  component="a"
                  href={formAndSurvey.DocumentLink.Url}
                  clickable
                  target="_blank"
                  label={formAndSurvey.Date ? `${formAndSurvey.Title} | Due: ${formAndSurvey.Date}` : formAndSurvey.Title}
                />
              </Grid>
            ) : (
              <Chip className={styles.chip} label={formAndSurvey.Title} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default FormAndSurvey;
