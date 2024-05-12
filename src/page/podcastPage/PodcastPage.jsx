import React, { useEffect, useState } from 'react'
import PodcastPost from '../../components/post/podcastPost/PodcastPost'

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiPath } from '../../api/endpoint';

const PodcastPage = () => {
    const id = useParams().id;
    
    const getPodcast = () => {
        axios.get(apiPath+`podcast/view/${id}`
        , {
            headers: {
                'ngrok-skip-browser-warning': 'any_value'
            }
        }
        ).then((response) => {
            console.log(response.data);
            setPodcast(response.data.body);
        }
        ).catch((error) => {
            console.error('Error:', error);
            return null;
        });
    }
    const [podcast,setPodcast] = useState(null);
    useEffect(() => {
        getPodcast();
    }, []);
  return (
    <div>
        {podcast ?(<>
         <PodcastPost podcast={podcast}/> 
         </>)
        
        : <div>Loading...</div>}
        
    </div>
  )
}

export default PodcastPage