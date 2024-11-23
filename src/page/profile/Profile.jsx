import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaStarAndCrescent } from 'react-icons/fa'
import { SiPodcastindex, SiGooglepodcasts } from 'react-icons/si'
import { TfiViewGrid } from 'react-icons/tfi'
import { CiGrid2H } from 'react-icons/ci'
import { BiCheckDouble } from 'react-icons/bi'
import PodcastPost from '../../components/post/podcastPost/PodcastPost'
import listPostCastTest from '../../access/listPodcastTest.json'
import axios from 'axios'
import { apiPath } from '../../api/endpoint'
import { toggleFollow, getProfile } from '../../api/user/user'
import PodcastBox from '../../components/profile/podcastBox/PodcastBox'
import { Tooltip, Box, Image, Button, Text, VStack, HStack, Badge, Heading } from '@chakra-ui/react'
import './Profile.css'

const Profile = () => {
  const { nickname } = useParams();
  const [isFollow, setIsFollow] = useState(false);
  const [profile, setProfile] = useState({});
  const [podcasts, setPodcasts] = useState([{}]);

  useEffect(() => {
    document.querySelector('aside').classList.add('minum');
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const fetchData = async () => {
    try {
      const response = await getProfile(nickname);
      const { body } = response.data;
      setProfile(body);
      setPodcasts(body.podcasts || []);
      setIsFollow(body.follow);
      document.title = `${body.fullname} (@${nickname}) - Podcloud`;
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <Box className='profile-page'>
      <Box className="profile-container">
        <VStack className="image-container" spacing={4}>
          <Box className="banner" w="100%">
            <Image
              src={profile.cover_url || "https://kinsta.com/wp-content/uploads/2021/11/what-is-a-podcast.jpg"}
              alt="Profile Banner"
              objectFit="cover"
              borderRadius="15px"
            />
          </Box>
          <Box className="avatar" mt="-100px">
            <Image
              src={profile.avatar_url || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"}
              alt="Profile Avatar"
              borderRadius="full"
              boxSize="200px"
              border="4px solid white"
            />
          </Box>
          <HStack className="actionGroup" spacing={4}>
            <Button
              colorScheme={isFollow ? "green" : "blue"}
              onClick={() => toggleFollow(setIsFollow, profile.id)}
              leftIcon={isFollow ? <BiCheckDouble /> : <SiGooglepodcasts />}
            >
              {isFollow ? 'Đã theo dõi' : 'Theo dõi'}
            </Button>
            <Button colorScheme="gray">Nhắn tin</Button>
          </HStack>
        </VStack>

        <VStack className="infor" spacing={4} align="center" mt={4}>
          <Badge colorScheme="purple" p={2} borderRadius="md">
            <HStack>
              <FaStarAndCrescent />
              <Text>NGÔI SAO ĐANG LÊN</Text>
            </HStack>
          </Badge>
          
          <Heading className='name' display="flex" alignItems="center" gap={2}>
            {profile.fullname} <SiPodcastindex />
          </Heading>
          
          <Text className="nickname" color="gray.500" fontSize="lg">
            @{nickname}
          </Text>

          <HStack className="detail-container" spacing={8}>
            <VStack className="detail-item">
              <Text fontWeight="bold">{profile.podcasts?.length || 0}</Text>
              <Text>Podcast</Text>
            </VStack>
            <VStack className="detail-item">
              <Text fontWeight="bold">{profile.followers}</Text>
              <Text>Follower</Text>
            </VStack>
            <VStack className="detail-item">
              <Text fontWeight="bold">{profile.following}</Text>
              <Text>Following</Text>
            </VStack>
          </HStack>

          <HStack className="detail-container" spacing={4}>
            <Tooltip label="Single">
              <Button variant="ghost" size="lg"><TfiViewGrid /></Button>
            </Tooltip>
            <Tooltip label="Playlist">
              <Button variant="ghost" size="lg"><CiGrid2H /></Button>
            </Tooltip>
          </HStack>
        </VStack>
      </Box>

      <Box className="podcasts-container" mt={8}>
        {podcasts.map((podcast, index) => (
          <PodcastBox
            key={index}
            index={index}
            podcast={podcast}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Profile;