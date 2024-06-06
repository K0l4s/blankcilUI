import React, { useState, useRef, useEffect } from 'react';
import PodcastPost from '../../components/post/podcastPost/PodcastPost';
import './Home.css';
import { apiPath } from '../../api/endpoint';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import listPostCastTest from '../../access/listPodcastTest.json';
import SuggestUser from '../../components/user/suggestUser/SuggestUser';
const Home = () => {
  const toast = useToast();
  const [index, setIndex] = useState(-1);
  const [loading, setLoading] = useState(false); // Thêm state để kiểm tra xem đang tải dữ liệu hay không
  const [podcasts, setPodcasts] = useState(listPostCastTest);

  const [isEnd, setIsEnd] = useState(false);
  function scrollHandler() {
    if (!loading) { // Kiểm tra xem có đang tải dữ liệu không
      const pageHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
      const nearBottom = pageHeight - scrollPosition - windowHeight < 10;

      if (nearBottom) {
        setIndex(index + 1);
        setLoading(true); // Bắt đầu tải dữ liệu
      }
    }
  }

  useEffect(() => {
    console.log('index:', index);
    if (index < 0) {
      setIndex(0);
      return;
    }
    const token = localStorage.getItem('access_token');
    const fetchData = () => {
      if (isEnd) {
        return;
      }
      setLoading(true);
      const endpoint = token ? `podcast/auth/view/page?pageNumber=${index}&trending=true` : `podcast/view/page?pageNumber=${index}&trending=true`;
      let headers = {
        'ngrok-skip-browser-warning': 'any_value'
      };
      if (token) {
        headers = {
          'ngrok-skip-browser-warning': 'any_value',
          'Authorization': `Bearer ${token}`
        };
      }
      axios.get(apiPath + endpoint, {
        headers: headers,
      }

      )
        .then((response) => {
          if(response.status==200){
          console.log(response)
          setPodcasts(prevPodcasts => [...prevPodcasts, ...response.data.body.content]);
          setLoading(false); // Dừng tải dữ liệu 
          if (response.data.body.totalPage===response.data.body.currentPage) {
            setIsEnd(true);
          }
        }else{
          console.log(response.data);
          toast({
              title: "Lỗi",
              description: response.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom-right"
          })
      }
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false); // Dừng tải dữ liệu nếu có lỗi
          toast({
            title: "Lỗi",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-right"
        })
        });
    };

    fetchData();


  }, [index]);

  useEffect(() => {
    document.title = 'Home - Blankcil';

  }, []);
  window.addEventListener('scroll', scrollHandler);

  if (!podcasts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <SuggestUser />
      <div className="toggleGroup">
      <button className='active'>Xu hướng</button>
      <button>Đang theo dõi</button>
      </div>
      {/* <h1 style={{ color: 'white', fontFamily:'Awesome South Korea' }}>Trending Podcasts</h1> */}
      <p style={{ color: 'white', fontFamily:'Awesome South Korea' }}>@Blankcil Team</p>
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
