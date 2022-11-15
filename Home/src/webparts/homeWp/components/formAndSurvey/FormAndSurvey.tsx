import * as React from 'react'
import { useEffect, useState } from 'react'
import { sp } from '@pnp/sp'
import { IFormAndSurvey } from './IStates'
import styles from './FormAndSurvey.module.scss'
import Chip from '@material-ui/core/Chip';
import LinkIcon from '@material-ui/icons/Link';
import Popover from '@material-ui/core/Popover';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
      color: 'white'
    },
    paper: {
      padding: theme.spacing(0),
    },
  }),
);
const FormAndSurvey = ({context}) => {
    const [formsAndSurveys, setFormsAndSurveys] = useState<IFormAndSurvey[]>([])

    useEffect(() => {
        sp.setup({ spfxContext: context})
        _formAndSurvey()
    }, [])
    const _formAndSurvey = async () => {
        const formAndSurveyRes: IFormAndSurvey[] = await sp.web.lists.getByTitle('Forms and Surveys').items.get()
        const modifiedFormAndSurveyRes = formAndSurveyRes.map(formAndSurvey => ({
            ...formAndSurvey,
            Date: formAndSurvey.Date ? new Date(formAndSurvey.Date).toLocaleDateString("en-US") : null
        }))
        setFormsAndSurveys(modifiedFormAndSurveyRes)
    }
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

  const open = Boolean(anchorEl);
    return(
        <div className={ styles.formAndSurvey }>
            <div className={ styles.heading }><i className="fa fa-wpforms" aria-hidden="true"></i> FORMS AND SURVEYS</div>
            <div className={ styles.container }>
            { formsAndSurveys.map(formAndSurvey => (
                <div className={ styles.item }>
                { formAndSurvey.DocumentLink ? 
                <div>
                    { formAndSurvey.Date ?
                        <div>
                        <Chip className={ styles.chip } 
                            icon={<LinkIcon />}
                            component="a" href={ formAndSurvey.DocumentLink.Url } clickable
                            target="_blank"
                            label={ formAndSurvey.Title }
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                        />
                        <Popover
                            id="mouse-over-popover"
                            className={classes.popover}
                            classes={{
                                paper: classes.paper,
                            }}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                        >
                            <Box p={1} bgcolor="secondary.main" style={{ color: 'white', fontSize: 'medium', fontWeight: 'bold' }}>
                                <div className={ styles.date }>{ `Ends by ${formAndSurvey.Date}` }</div>
                            </Box>
                        </Popover>
                        </div> :
                            <Chip className={ styles.chip } 
                                icon={<LinkIcon />}
                                component="a" href={ formAndSurvey.DocumentLink.Url } clickable
                                target="_blank"
                                label={ formAndSurvey.Title }
                            />
                    }
                </div>
                : <Chip className={ styles.chip } label={ formAndSurvey.Title } />
                }
                </div>
            )) }
            </div>

        </div>
    )
}
export default FormAndSurvey

