import * as React from 'react'
import { useEffect, useState } from 'react'
import styles from './Statistics.module.scss'
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/folders/list";
import "@pnp/sp/folders/item";
import { Grid } from '@material-ui/core';
import { IStatistics } from './IStatistics';

const Statistics = ({context}) => {
    const [statistics, setStatistics] = useState<IStatistics[]>([])
    const [years, setYears] = useState<string[]>([])
    const [selectedYear, setSelectedYear] = useState<string>('')
    useEffect(() => {
        sp.setup({ spfxContext: context })
        _getStatistics()
    }, [])
    const _getStatistics = async () => {
        const statisticsRes = await sp.web.lists.getByTitle("Statistics").items.get()
        const years = []
        statisticsRes.map(statistic => years.push(statistic.Year))
        const uniqueYears = years.filter((e, i, self) => { return i === self.indexOf(e)}).sort((a,b) => b - a)
        setYears(uniqueYears)
        setStatistics(statisticsRes)
        setSelectedYear(uniqueYears[0])
    }
    const _handleYearChange = (e) => {
        setSelectedYear(e.target.value)
    }
    return(
        <div className={ styles.statisticsWp }>
            <div className={ styles.mainHeading }>
                <i className="fa fa-bar-chart fa-lg" aria-hidden="true"></i> HOW ABOUT THOSE NUMBERS
            </div>
            <div className={ styles.searchDiv }>
                <select id="statistics" name="statistics" className={ styles.field } onChange={ _handleYearChange }>
                    { years.map(year => (
                        <option value={ year }>{ year }</option>
                    ))
                    }
                </select>
            </div>
            <Grid container spacing={1} className={ styles.container }>
                { statistics.filter(statistic => statistic.Year === selectedYear).map(statistic => (
                    statistic.DocumentLink ?
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>                            
                        <div className={ styles.content }>                            
                            <a href={ statistic.DocumentLink.Url} target="_blank">
                                <i className="fa fa-file-pdf-o fa-4x" aria-hidden="true"></i>
                                <p className={ styles.text }>{ statistic.Title }</p>
                            </a>
                        </div>
                    </Grid> : 
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>                            
                        <div className={ styles.contentWithoutLink }>                            
                            <p className={ styles.textWithoutLink }>{ statistic.Title }</p>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Statistics