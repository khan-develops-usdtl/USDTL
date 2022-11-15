import { Grid } from '@material-ui/core';
import * as jquery from 'jquery';
import * as React from 'react'
import { IStatisticsProps } from './IStatisticsProps'
import styles from './Statistics.module.scss'

export interface IStatisticsStates {
    selectedYear: string;
    years: string[]
    statisticsLists: [
        {
            title: '',
            year: '',
            url: ''
        }
    ]
}

export default class Statistics extends React.Component<IStatisticsProps, IStatisticsStates  > {
    static siteUrl: string;
    public constructor(props: IStatisticsProps, states: IStatisticsStates) {
        super(props)
        this.state = {
            selectedYear: '',
            years: [],
            statisticsLists: [
                {
                    title: '',
                    year: '',
                    url: ''
                }
            ] 
        }
        Statistics.siteUrl = this.props.siteUrl
    }

    private getStatistics() {
        const reactContextHandler = this
        jquery.ajax({
            url: `${Statistics.siteUrl}/_api/web/lists/getbytitle('Statistics')/items`,
            type: 'GET',
            headers: { 'Accept': 'application/json; odata=verbose' },
            success: function(resultData) {
                const modifiedResult = resultData.d.results.map(result => ({
                    ...result,
                    title: result.Title.toUpperCase(),
                    year: result.Year,
                    url: result.DocumentLink ? result.DocumentLink.Url : null
                    })
                )
                const years = []
                resultData.d.results.map(result => {
                    years.push(result.Year)
                    }
                )
                const uniqueYears = years.filter((e, i, self) => { return i === self.indexOf(e)})
                reactContextHandler.setState({
                    statisticsLists: modifiedResult,
                    years: uniqueYears,
                    selectedYear: uniqueYears[0]
                })
                   
            },
            error: function (jqXHR, textStatus, errorThrown) { } 
        })
    }

    public componentDidMount() {
        this.getStatistics()
    }

    private handleChange = (e) => {
        this.setState({
            selectedYear: e.target.value
        })
    }

    public render() {
        return(
            <div>
                <div className={ styles.mainHeading }>
                    <i className="fa fa-bar-chart fa-lg" aria-hidden="true"></i> HOW ABOUT THOSE NUMBERS
                </div>
                <div className={ styles.searchDiv }>
                    <select id="statistics" name="statistics" className={ styles.field } onChange={ this.handleChange }>
                        { this.state.years.map(year => (
                            <option value={ year }>{ year }</option>
                        ))
                        }
                    </select>
                </div>
                <Grid container spacing={1} style={{height: 385, overflowY: 'auto' }}>
                    { this.state.statisticsLists.filter(statistics => statistics.year === this.state.selectedYear).map(statisticsList => (
                        statisticsList.url ?
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>                            
                            <div className={ styles.content }>                            
                                <a href={ statisticsList.url } target="_blank">
                                    <i className="fa fa-file-pdf-o fa-4x" aria-hidden="true"></i>
                                    <p className={ styles.text }>{ statisticsList.title }</p>
                                </a>
                            </div>
                        </Grid> : 
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>                            
                            <div className={ styles.contentWithoutLink }>                            
                                <p className={ styles.textWithoutLink }>{ statisticsList.title }</p>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    }
}


{/* <div className={ styles.container }>
{ this.state.statisticsLists.filter(statistics => statistics.year === this.state.selectedYear).map(statisticsList => (
    statisticsList.url ?
    <div className={ styles.content }>                            
        <a href={ statisticsList.url } target="_blank">
            <i className="fa fa-file-pdf-o fa-4x" aria-hidden="true"></i>
            <p className={ styles.text }>{ statisticsList.title }</p>
        </a>
    </div> : 
    <div className={ styles.contentWithoutLink }>                            
        <p className={ styles.textWithoutLink }>{ statisticsList.title }</p>
    </div>
))}
</div> */}