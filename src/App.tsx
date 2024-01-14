// import React from 'react';
import NewsCard from './Components/HotTopics';
import NewsList from './Components/MultipleNews';



function App() {
  return (
    <>
      <div className='newscard'>
        <NewsCard/>
        
      </div>

      <div className='newslist'>
      <NewsList/>
      </div>
      
    </>
  )
}


export default App;
