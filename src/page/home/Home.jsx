import React, { useState, useRef, useEffect } from 'react';
import PodcastPost from '../../components/post/podcastPost/PodcastPost';
import './Home.css';
import podcastListSample from '../../testjson/podcastListSample.json';
import { apiPath } from '../../api/endpoint';
import axios from 'axios';
const Home = () => {
  // const podcasts = podcastListSample.body;
  const [podcasts, setPodcasts] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    // fetch(apiPath + 'podcast/view/page?pageNumber=0&trending=false',
    //   {
    //     // mode: 'cors',
    //     method: 'GET',
    //     headers: {
    //       // 'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': '*', // Block cors
    //       // 'Authorization': `Bearer ${token}`
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setPodcasts(data.body);
    //   });
    // Gọi axios
    // axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
    // Nếu có token thì gọi auth còn không thì xoá token và gọi không auth
    if(localStorage.getItem('access_token')){
      axios.get(apiPath + 'podcast/auth/view/page?pageNumber=0&trending=true',{
        headers: {
          'ngrok-skip-browser-warning': 'any_value',
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        setPodcasts(response.data.body);
      }
      ).catch((error) => {
        console.error('Error:', error);
      });
    }
    else{
      axios.get(apiPath + 'podcast/view/page?pageNumber=0&trending=true'
      ,{
        headers: {
          'ngrok-skip-browser-warning': 'any_value'
        }
      }
    ).then((response) => {
        setPodcasts(response.data.body);
      }
      ).catch((error) => {
        console.error('Error:', error);
      });
    }
  }
  , []);
   
  useEffect(() => {
    document.title = 'Home - Blankcil';
  }, []); 
  if (!podcasts) {
    return <div>Loading...</div>;
  }
  return (
    <div className="home">
      <p style={{ color: 'white' }}>@Blankcil Team</p>
      <div>
        {podcasts.map((podcast, index) => (
          <PodcastPost
            key={index}
            index={index}
            podcast={podcast}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
