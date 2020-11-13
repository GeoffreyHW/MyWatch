import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import axios from 'axios';
import Navbar from "./components/navbar.component";
import Dashboard from "./components/dashboard.component";
import Statistics from "./components/statistics.component";
import FutureWatches from "./components/future-watches.component";
import WatchList from "./components/watch-list.component";


function App() {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/current-show/')
        .then(response => {
            if(response.data.length > 0) {
                setShows(response.data);
            }
        });
    }, []);
    
    return (
        <div className="App">
            <Router>
                <Navbar />
                <br/>
                <Route path="/" exact render={(props) => (
                    <Dashboard {...props} shows={shows}/>
                )} />
                <Route path="/stats" component={Statistics}/>
                <Route path="/futurewatches" component={FutureWatches} />
                <Route path="/watchlist" component={WatchList} />
            </Router>
        </div>
  );
}

export default App;
