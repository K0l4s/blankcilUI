import React, { useEffect } from "react";
import './List_podcast.css';
import Single_podcast from './Single_podcast';

const List_podcast = ({ podcasts }) => {
  useEffect(() => {
    console.log(podcasts);
    // Lọc podcasts bởi id
    
  }, []);
  return (
    <div className="podcast-list">
      {/* {podcasts.map((podcast, index) => (
        
        <Single_podcast
          key={index}
          podcast={podcast}
        />
      ))} */}

{podcasts.length > 0 ? podcasts.map((podcast, index) => { 
          return(
          <Single_podcast key={index} podcast={podcast} />)
      }
      ) : <p>Chưa có Podcast nào</p>}
    </div>
  );
};

export default List_podcast;
