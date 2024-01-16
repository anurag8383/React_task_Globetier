// import React from 'react';
import NewsCard from './Components/HotTopics';
import NewsList from './Components/MultipleNews';
import Navbar from './Components/Navbar';
import "../src/Components/index.css"
import Weather from './Components/Weather';



function App() {
  return (
    <>
      <Navbar />
      <div className='middleSection'>
        <div className="hotTopcis">
          <NewsCard />
        </div>
        <div className="weather">
        <Weather/>
        </div>


      </div>

      <div className='newslist'>
        <NewsList />
      </div>

    </>
  )
}


export default App;
