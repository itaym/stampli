import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid'
import DataSource from "./components/DataSource";
import Header from "./components/Header";

function App() {
    const [showEmpty, setShowEmpty] = useState(false)
    return (
        <div className="App">
            <Header />
            <div className='main-container show-empty'>
                <input
                    id='showEmpty'
                    type='checkbox'
                    checked={showEmpty}
                    onChange={()=>{setShowEmpty(!showEmpty)}} />
                <label htmlFor='showEmpty'>Show empty rows and columns</label>
            </div>
            <div className='main-container data-area'>
                <div className='section-holder'>
                    <h2>Grid Result</h2>
                    <Grid showEmpty={showEmpty}/>
                </div>
                <div className='section-holder'>
                    <h2>Textual Result</h2>
                    <DataSource />
                </div>
            </div>
        </div>
    )
}

export default App
