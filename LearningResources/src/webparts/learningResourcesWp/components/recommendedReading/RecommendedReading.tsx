import { Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating'
import styles from './RecommendedReading.module.scss'
import * as React from 'react';
import { useEffect, useState, useRef } from 'react'
import { IReading, IUserProfile, IReview } from './IReading';
import { sp } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/sites";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/profiles";

const RecommendedReading = ({context}) => {
    const [categories, setCategories] = useState<string[]>([])
    const [readings, setReadings] = useState<IReading[]>([])
    const [topReadings, setTopReadings] = useState<number>(3)
    const [readMore, setReadMore] = useState<boolean>(true)
    const [readingDetails, setReadingDetails] = useState<boolean>(false)
    const [selectedReading, setSelectedReading] = useState<IReading | undefined>(undefined)
    const [reviews, setReviews] = useState<IReview[]>([])
    const [rating, setRating] = useState<number>(0)
    const [comment, setComment] = useState<string>('')
    const [userProfile, setUserProfile] = useState<IUserProfile | undefined>(undefined)
    const [activeButton, setActiveButton] = useState<string>('All')
    const button = useRef<HTMLButtonElement>(undefined)

    useEffect(() => {
        sp.setup({ spfxContext: context })
        _getReading()
    },[]);

    const _getReading= async () => {
        const reviewsRes: IReview[] = await sp.web.lists.getByTitle('Book Reviews').items.
            select('ID', 'Rating', 'Comment', 'Created', 'Author/Title', 'ImageUrl', 'Book/Id' ).expand('Author', 'Book').get();
        const readingsRes: IReading[] = await sp.web.lists.getByTitle('Recommended Reading').items.get();
        const currentUserProfileRes: IUserProfile = await sp.profiles.userProfile;
        const temp: string[] = [];
        readingsRes.map(reading=> { temp.push(reading.Category) });
        const categoriesRes = temp.filter((category, index) => { return temp.indexOf(category) === index });
        setCategories(categoriesRes);
        setReadings(readingsRes);
        setUserProfile(currentUserProfileRes);
        setReviews(reviewsRes)
    };
    const _handleReadMore = () => {
        setTopReadings(readings.length)
        setReadMore(false)
    };
    const _handleReadLess = () => {
        setTopReadings(3)
        setReadMore(true)
    };
    const _handleReadingDetails = (selectedReading) => {
        setSelectedReading(selectedReading)
        setReadingDetails(true)
    };
    const _handleGoBack = () => {
        setReadingDetails(false)
    };
    const _handleRatingSubmit = async () => {
        if (rating === 0 || comment === '') {
            alert('Sorry your review not submitted. Please fill in required fields.')
        } else {
            await sp.web.lists.getByTitle('Book Reviews').items.add({
                Rating: rating,
                Comment: comment,
                BookId: selectedReading.ID,
                ImageUrl: {
                    Url: userProfile.PictureUrl
                }
            }).then(async res=> {
                const reviewsRes: IReview[] = await sp.web.lists.getByTitle('Book Reviews').items.
                    select('ID', 'Rating', 'Comment', 'Created', 'Author/Title', 'ImageUrl', 'Book/Id' ).expand('Author', 'Book').get();
                setReviews(reviewsRes)
                const numberOfReviews = reviewsRes.filter(review => review.Book.Id === selectedReading.ID).length
                let numberOfRating = 0
                const temp = reviewsRes.filter(review => review.Book.Id === selectedReading.ID).map(review => numberOfRating += review.Rating )
                const totalRating = (numberOfRating/numberOfReviews).toFixed(1)
                await sp.web.lists.getByTitle('Recommended Reading').items.getById(selectedReading.ID).update({ AverageRating: totalRating }).then(res => console.log('average rating successfully updated')).catch(res => console.log(' average rating creation failure'))
                const readingsRes: IReading[] = await sp.web.lists.getByTitle('Recommended Reading').items.get();
                setReadings(readingsRes)
                setReadingDetails(false)
            }).catch(res => alert('review submission failed'))
        }
    }
    return(
        <Grid container spacing={1} className={ styles.recommendedReadingWp } style={{ padding: '0 5px' }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className={ styles.readingHeading }>
                    <i className="fa fa-file-video-o fa-lg" aria-hidden="true"></i> RECOMMENDED READING
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingBottom: 10, borderBottom: '1px solid #dddddd' }}>
                <button className={ styles.button } onClick={e=>{setActiveButton('All'); e.preventDefault()}}>All</button>
                { categories.map(category => (
                    <button className={ styles.button } onClick={e=>{setActiveButton(category); e.preventDefault()}}>{category}</button>
                ))}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: '10px 20px', borderBottom: '1px solid #dddddd' }}>
                { !readingDetails ? <Grid container spacing={3} style={{ maxHeight: 680, overflowY: 'auto', marginBottom: 10 }}>
                    { readings.filter(reading => { 
                        if(activeButton==='All') {return reading} 
                        else { return activeButton===reading.Category}
                        }).slice(0, topReadings).map(reading => (
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                            <a href='javascript:;' className={ styles.readingLink} onClick={() => _handleReadingDetails(reading)}>
                                <div className={ styles.userReviewTitle }>{ reading.Title.length > 40 ? reading.Title.slice(0, 40) + '...' : reading.Title }</div>
                            </a>
                            <div className={ styles.readingDate }>{new Date(reading.Date).toLocaleDateString("en-US")}</div>
                            <Rating value={ reading.AverageRating } readOnly precision={0.1} style={{ fontSize: '1.75em' }}></Rating>
                            <div className={ styles.readingDescription}>
                                {reading.Description.length > 150 ? reading.Description.slice(0, 150) + '...' : reading.Description }
                            </div>
                        </Grid>))} 
                </Grid> :
                <Grid container spacing={3} style={{ maxHeight: 680, overflowY: 'auto', marginBottom: 10 }}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div className={ styles.userReviewTitle }>{ selectedReading.Title }</div>
                        <div className={ styles.readingDate }>{ new Date(selectedReading.Date).toLocaleDateString("en-US") }</div>
                        <Rating value={ selectedReading.AverageRating } precision={0.1} readOnly style={{ fontSize: '1.75em' }}></Rating>
                        <div className={ styles.readingDescription}>
                            {selectedReading.Description.length > 150 ? 
                            selectedReading.Description.slice(0, 150) + '...' : selectedReading.Description }
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Grid container>
                            <Grid item xs={12} sm={4} md={3} lg={3} xl={3}><span className={ styles.validation }>*</span>Rating:</Grid>
                            <Grid item xs={12} sm={8} md={9} lg={9} xl={9}><Rating value={ rating } onChange={(e, value) => setRating(value)} style={{ fontSize: '1.75em' }}></Rating></Grid>     
                            <Grid item xs={12} sm={4} md={3} lg={3} xl={3}><span className={ styles.validation }>*</span>Comment:</Grid>
                            <Grid item xs={12} sm={8} md={9} lg={9} xl={9}>
                                <textarea rows={5} style={{ width: '100%' }} onChange={(e) => setComment(e.target.value)}></textarea>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ float: 'right', paddingTop: 10 }}>
                                <button className={ styles.submitButton } onClick={_handleRatingSubmit}>Submit Review</button>
                            </Grid>        
                        </Grid>
                    </Grid>
                </Grid>}
                { readingDetails && 
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: '5px 0' }}>
                            <div className={ styles.reviewTitle } >Users Reviews</div>
                        </Grid>
                        { reviews.length < 1 ?                         
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center' }}>
                            <div style={{ padding: '10px 0' }}>Currently, there are no reviews for this book.</div>
                        </Grid> :
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            { reviews.filter(review => review.Book.Id === selectedReading.ID).map(review => (
                                <Grid container spacing={1} style={{ borderBottom: '1px solid #dddddd', padding: '5px 0' }}>
                                    <Grid item xs={12} sm={1} md={1} lg={1} xl={1} alignItems='center' justify='center' style={{ display: 'flex', alignItems: "center" }}>
                                        <div><img className={ styles.userReviewImage } src={review.ImageUrl.Url}/></div>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <div>
                                            <div className={ styles.userReviewTitle }>{review.Author.Title}</div>
                                            <div><Rating value={ review.Rating } precision={0.1} readOnly size ='large'></Rating></div>
                                            <div className={ styles.userReviewComment }>{review.Comment}</div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} style={{ textAlign: 'right' }}>
                                        <div className={ styles.userReviewDate }>{new Date(review.Created).toLocaleDateString("en-US")}</div>
                                    </Grid>
                                </Grid>
                            ))} 
                        </Grid>
                        }
                    </Grid>
                }
                { !readingDetails ?
                    <p style={{ padding: '10px 0'}}>{ readMore ?
                        <a href="javascript:;" onClick={_handleReadMore}><i className="fa fa-plus-circle fa-lg marginRight" aria-hidden="true"></i> View More</a> :
                        <a href="javascript:;" onClick={_handleReadLess}><i className="fa fa-plus-circle fa-lg marginRight" aria-hidden="true"></i> View Less</a> }
                    </p> :
                    <p style={{ padding: '10px 0'}}><a href="javascript:;" onClick={_handleGoBack}>
                        <i className="fa fa-chevron-circle-left marginRight" aria-hidden="true"></i> Go Back</a>
                    </p>
                }
            </Grid>
        </Grid>
    );
};

export default RecommendedReading;
