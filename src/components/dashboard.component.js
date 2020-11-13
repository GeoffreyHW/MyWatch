import React, { useState } from 'react';
import './dashboard.css';
import movieIcon from '../assets/video-camera.png';
import tvIcon from '../assets/television.png';
import futureIcon from '../assets/future.png';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default (props) => {
    const today = new Date();
    const curHour = today.getHours();
    const period = (curHour > 6 && curHour < 12) ? 'Morning' : (curHour > 12 && curHour < 18) ? 'Afternoon ': 'Evening';  
    const dayNight = curHour > 6 && curHour < 18 ? 'today' : 'tonight';
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [genre, setGenre] = useState('');
    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');
    const [date, setDate] = useState(new Date());
    const [movieStep, setMovieStep] = useState('stepOne');
    const [showStep, setShowStep] = useState('chooseShow');
    
    const showTitles = props.shows.map(show => show.title)

    const onSubmitFuture = () => {
        const futureWatch = {
            title: title,
            content: content
        }
        
        if(title && content) {
            console.log(futureWatch);
            axios.post('http://localhost:5000/future/add', futureWatch)
                .then(res => console.log(res.data));
        }
    };

    const onSubmitMovie = () => {
        const newMovie = {
            title: title,
            date: date,
            rating: rating,
            genre: genre,
            comments: comments
        }

        if(title && date && rating && genre) {
            console.log(newMovie)
            axios.post('http://localhost:5000/movies/add', newMovie)
                .then(res => console.log(res.data));
        }
    };

    const onSubmitNewShow = () => {
        const newShow = {
            title: title,
            genre: genre,
            season: season,
            episode: episode,
            date: date
        }
        
        if(title && genre && season && episode && date) {
            console.log(newShow);
            axios.post('http://localhost:5000/current-show/add', newShow)
                .then(res => console.log(res.data));
        }
    };

    const onUpdateShow = () => {
        const updateShow = {
            title: title,
            genre: genre,
            season: season,
            episode: episode,
            date: date
        }

        const currentShow = props.shows.find(show => {
            return show.title === title;
        });

        axios.post(`http://localhost:5000/current-show/update/${currentShow._id}`, updateShow)
            .then(res => console.log(res.data));
    };

    const onCompleteShow = () => {
        const completedShow = {
            title: title,
            genre: genre,
            rating: rating,
            numSeasons: season,
            comments: comments,
            date: date
        }

        const currentShow = props.shows.find(show => {
            return show.title === title;
        });

        axios.delete(`http://localhost:5000/current-show/${currentShow._id}`)
            .then(res => console.log(res.data));
        
        axios.post('http://localhost:5000/completed-show/add', completedShow)
            .then(res => console.log(res.data));
    };

    const selectShowTitle = (e) => {
        e.persist();
        const showTitle = e.target.value;
        const selectedShow = props.shows.find(show => {
            return show.title === showTitle;
        });

        setTitle(showTitle);
        setSeason(selectedShow.season);
        setEpisode(selectedShow.episode);
        setGenre(selectedShow.genre);
        document.getElementById("showSeason").value = selectedShow.season;
        document.getElementById("showEpisode").value = selectedShow.episode;
    }

    return (
        <div className="dashboard">
            <div className = "welcome-text">
                <p>Good {period}, Geoffrey</p>
                <p>What are you watching {dayNight}?</p>
            </div>
            <div className="container">
                <div className="card">
                    <div className="face face1">
                        <div className="content">
                            <img src={tvIcon} alt="show"/>
                            <h2>Show</h2>
                        </div>
                    </div>
                    {showStep === 'chooseShow' ? 
                        <div id="chooseShow" className="face face2">
                            <div className="content">
                                <div className="stepOneShow">
                                    <button className="showButton" onClick={() => setShowStep('newShow')}>New</button>
                                    <button className="showButton" onClick={() => setShowStep('currentShow')}>Current</button>
                                
                                </div>
                                <div className="form-group date-picker showDate">
                                    <label>Date </label>
                                    <div>
                                        <DatePicker
                                            showPopperArrow={false}
                                            popperPlacement={"left"}
                                            selected={date}
                                            onChange={date => setDate(date)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    : showStep === 'newShow' ?
                        <div id="newShow" className="face face2">
                            <div className="content">
                                <form onSubmit={onSubmitNewShow}>
                                    <div className="form-group">
                                        <input type="text" id="showTitle" placeholder="Title" autoComplete="off" onChange={(e) => setTitle(e.target.value)}/>
                                    </div>
                                    <div className="showPosition"> 
                                        <div className="showSeason">
                                            <label htmlFor="season">Season</label>
                                            <input type="number" id="season" name="season" autoComplete="off" min="1" max="20" onChange={(e) => setSeason(e.target.value)}/>
                                        </div>
                                        <div className="showEpisode">
                                            <label htmlFor="episode">Episode</label>
                                            <input type="number" id="episode" name="episode" autoComplete="off" min="1" max="50" onChange={(e) => setEpisode(e.target.value)}/>
                                        </div>
                                    </div>
                                    <select className="showGenre" name="genre" id="genre" onChange={(e) => setGenre(e.target.value)}>
                                        <option selected disabled hidden>Genre</option> 
                                        <option value="Action">Action</option>
                                        <option value="Animation">Animation</option>
                                        <option value="Comedy">Comedy</option>
                                        <option value="Crime">Crime</option>
                                        <option value="Documentary">Documentary</option>
                                        <option value="Drama">Drama</option>
                                        <option value="Horror">Horror</option>
                                        <option value="Mystery">Mystery</option>
                                        <option value="Romance">Romance</option>
                                        <option value="Sci-fi">Sci-fi</option>
                                        <option value="Thriller">Thriller</option>
                                    </select>
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    : showStep === 'currentShow' ?
                        <div id="currentShow" className="face face2">
                            <div className="content">
                                <form onSubmit={onUpdateShow}>
                                    <select
                                        required
                                        className="form-control currentShowSelect"
                                        value={title}
                                        onChange={e => selectShowTitle(e)}>
                                            {
                                                showTitles.map(function(show) {
                                                    return <option
                                                        key={show}
                                                        value={show}>{show}
                                                    </option>;
                                                })
                                            }
                                    </select>
                                    <div className="showPosition"> 
                                        <div className="showSeason">
                                            <label htmlFor="season">Season</label>
                                            <input type="number" id="showSeason" name="season" autoComplete="off" min="1" onChange={(season) => setSeason(season.target.value)}/>
                                        </div>
                                        <div className="showEpisode">
                                            <label htmlFor="episode">Episode</label>
                                            <input type="number" id="showEpisode" name="episode" autoComplete="off" min="1" onChange={(episode) => setEpisode(episode.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="showUpdateComplete">
                                        <button type="submit">Update</button>
                                        <button onClick={() => setShowStep('completeShow')}>Complete</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    :
                        <div className="face face2">
                            <div className="content">
                                <form onSubmit={onCompleteShow}>
                                    <div className="form-group">
                                        <textarea id="showComments" cols="30" rows="3" placeholder="Comments" autoComplete="off" onChange={(e) => setComments(e.target.value)}/>
                                    </div>
                                    <div className="showLastStep">
                                        <div className="mediaRating">
                                            <label htmlFor="rating">Rating</label>
                                            <input type="number" id="rating" name="rating" autoComplete="off" min="0" max="10" step="0.5" onChange={(e) => setRating(e.target.value)}/>
                                        </div>
                                        <button type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>     
                    }
                </div>
                <div className="card">
                    <div className="face face1">
                        <div className="content">
                            <img src={movieIcon} alt="movie"/>
                            <h2>Movie</h2>
                        </div>
                    </div>
                    {movieStep === 'stepOne' ? 
                        <div id="stepOne" className="face face2">
                            <div className="content">
                                <div className="form-group">
                                    <input type="text" id="movieTitle" placeholder="Title" autoComplete="off" onChange={(e) => setTitle(e.target.value)}/>
                                </div>
                                <div className="form-group date-picker">
                                    <label>Date </label>
                                    <div>
                                        <DatePicker
                                            showPopperArrow={false}
                                            popperPlacement={"right"}
                                            selected={date}
                                            onChange={date => setDate(date)}
                                        />
                                    </div>
                                </div>
                                <div className="mediaRating">
                                    <label htmlFor="rating">Rating</label>
                                    <input type="number" id="rating" name="rating" autoComplete="off" min="0" max="10" step="0.5" onChange={(e) => setRating(e.target.value)}/>
                                </div>
                                <select className="movieGenre" name="genre" id="genre" onChange={(e) => setGenre(e.target.value)}>
                                    <option selected disabled hidden>Genre</option> 
                                    <option value="Action">Action</option>
                                    <option value="Animation">Animation</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Crime">Crime</option>
                                    <option value="Documentary">Documentary</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Horror">Horror</option>
                                    <option value="Mystery">Mystery</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Sci-fi">Sci-fi</option>
                                    <option value="Thriller">Thriller</option>
                                </select>
                                <button onClick={() => setMovieStep('stepTwo')}>Next</button>
                            </div>
                        </div>
                    :
                        <div id="step2" className="face face2">
                            <div className="content">
                                <form onSubmit={onSubmitMovie}>
                                    <div className="form-group">
                                        <textarea id="movieComments" cols="30" rows="3" placeholder="Comments" autoComplete="off" onChange={(e) => setComments(e.target.value)}/>
                                    </div>
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    }
                </div>
                <div className="card">
                    <div className="face face1">
                        <div className="content">
                            <img src={futureIcon} alt="future"/>
                            <h2>Future</h2>
                        </div>
                    </div>
                    <div className="face face2">
                        <div className="content">
                                <div className="form-group">
                                    <input type="text" id="futureTitle" placeholder="Title" autoComplete="off" onChange={(e) => setTitle(e.target.value)}/>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="movieRadio" value="movie" onClick={() => setContent("movie")}/>
                                    <label className="form-check-label" htmlFor="movieRadio">Movie</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="showRadio" value="show" onClick={() => setContent("show")}/>
                                    <label className="form-check-label" htmlFor="showRadio">Show</label>
                                </div>
                                <button onClick={onSubmitFuture}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};