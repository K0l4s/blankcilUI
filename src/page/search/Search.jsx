import React, { useEffect, useState } from 'react'
import './Search.css'
import { LiaSearchengin } from 'react-icons/lia'
import SearchUser from '../../components/search/user/SearchUser'
import { apiPath } from '../../api/endpoint'
import axios from 'axios'
import PodcastPost from '../../components/post/podcastPost/PodcastPost'
import {  useToast } from '@chakra-ui/react'
const Search = () => {
  const toast = useToast();
  const [searchUsersResult, setSearchUsersResult] = useState([]);
  const [searchPodcastsResult, setSearchPodcastsResult] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const changeKeyWord = (e) => {
    setSearchKey(e.target.value);
  }
  const search = () => {
    // setSearchKey(document.getElementById('searchInput').value);
    console.log(searchKey);
    axios.get(apiPath + `users/search?keyword=${searchKey}`, {
      headers: {
        'ngrok-skip-browser-warning': 'any_value'
      }
    })
      .then((response) => {
        if(response.status !== 200) {
          console.log('No result');
          toast({
            title: 'Kết quả tìm kiếm không tồn tại.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          return;
        }
        console.log(response.data);
        // Xoá data cũ
        // setSearchUsersResult([]);
        // setSearchPodcastsResult([]);
        setSearchUsersResult(response.data.body.users);
        setSearchPodcastsResult(response.data.body.podcasts);
      })
      .catch((error) => {
        console.error('Error:', error);
        toast({
          title: 'No result',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });

     
  }
  useEffect(() => {
    search();
  }, []);
  return (
    <div>
      <div className="searchBox">
        <input onChange={changeKeyWord} id='searchInput' placeholder="Tìm kiếm" type="text" className="searchInput" />
        <LiaSearchengin className='searchButton' onClick={search}/>
      </div>
      <p style={{ padding: '10px' }}>Kết quả tìm kiếm</p>
      {/* Kết quả tìm kiếm */}
      <p>Người dùng</p>
      {searchUsersResult.length > 0 ? searchUsersResult.map((user, index) => { 
          return(
          <SearchUser key={index} user={user} />)
      }
      ) : <p>Không có kết quả tìm kiếm</p>}
      <p>Podcast</p>
      <div>
        {/* {searchPodcastsResult.map((podcast, index) => (
          // <PodcastPost
          //   key={index}
          //   // index={index}
          //   podcast={podcast}
          // />
          return(
            <SearchUser key={index} user={user} />) */}
        {/* ))} */}
        {/* {searchPodcastsResult.length > 0 ? searchPodcastsResult.map((podcast, index) => { 
          return(
          <PodcastPost key={index} podcast={podcast} />)
      }
      ) : <p>Không có kết quả tìm kiếm</p>} */}
      {/* Tự động cập nhật tất cả podcast */}
      {/* Return về data mới khi search */}
      {searchPodcastsResult.length > 0 ? searchPodcastsResult.map((podcast, index) => { 
          return(
          <PodcastPost key={index} index={index} podcast={podcast} />)
      }
      ) : <p>Không có kết quả tìm kiếm</p>}
      </div>


    </div>
  )
}

export default Search