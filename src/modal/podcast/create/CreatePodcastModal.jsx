import React, { useState } from 'react'
import './CreatePodcastModal.css'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, position, useToast } from '@chakra-ui/react'
import { apiPath } from '../../../api/endpoint'
import axios from 'axios'
import { use } from 'i18next'
import { useNavigate } from 'react-router-dom'
const CreatePodcastModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const inputImageChange = (e) => {
    const img = document.getElementById('img');
    img.src = URL.createObjectURL(e.target.files[0]);
  }
  const audioChange = (e) => {
    const audio = document.getElementById('audio');
    audio.src = URL.createObjectURL(e.target.files[0]);
    console.log(audio.src);
  }
  const audioControls = () => {
    const audio = document.getElementById('audio');
    if (audio.paused) {
      audio.play();
    }else{
      audio.pause();
    }
    // audio.play();
  }

  const handleCreatePodcast = () => {
    console.log("Handle");
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageFile = document.getElementById('imageFile').files[0];
    const audioFile = document.getElementById('audioFile').files[0];
    if(!title || !content || !imageFile || !audioFile){
      toast({
        title: 'Thiếu thông tin',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('imageFile', imageFile);
    formData.append('audioFile', audioFile);
    const token = localStorage.getItem('access_token');
    const sendButton = document.getElementById('sendButton');
    sendButton.disabled = true;
    try {
      const response = axios.post(apiPath + 'podcast/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        console.log(response.data);
        sendButton.disabled = false;
        onClose();
        navigate("/podcast/" + response.data.body.id);
      })
      toast.promise(response, {
        success: { title: 'Thành công!', description: 'Đã tạo Podcast thành công, xem ở trang cá nhân' },
        error: { title: 'Lỗi', description: 'Something wrong' },
        loading: { title: 'Đang upload', description: 'Vui lòng chờ trong giây lát, bài viết của bạn đang được xử lý!' }
      })
    } catch (error) {
      console.error('Error:', error);
      sendButton.disabled = false;
    }

    console.log(title, content, imageFile, audioFile);
  }


  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size='full'>
        <ModalOverlay />
        <ModalContent style={{ 'text-align': 'center' }}>
          <ModalHeader>THÊM PODCAST MỚI</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='createPodcastModal'>
              <div className="content">
                <p>Tiêu đề Podcast</p>
                <input id='title' type="text" placeholder="Nhập tiêu đề" />
                {/* <input id='content' type="text" placeholder="Nhập mô tả" /> */}
                {/* Multiple row input không dùng texeare*/}
                <p>Mô tả Podcast</p>
                <textarea id='content' placeholder="Nhập mô tả" />
                <p>Chọn loại định dạng tệp</p>
                <select id='type'>
                  <option value="0">Hoà trộn ảnh và âm thanh</option>
                  <option value="1">Video</option>
                </select>
                <p>Chọn Ảnh</p>
                <input onChange={inputImageChange} id='imageFile' accept="image/*" type="file" placeholder="Nhập link ảnh" />
                <p>Chọn Âm Thanh</p>
                <input onChange={audioChange} id='audioFile' type="file" accept="audio/*" placeholder="Nhập link podcast" />
                <button id='sendButton' onClick={handleCreatePodcast} variant='solid'>Gửi</button>
              </div>
              <div className="test">
                <p>Podcast của bạn sẽ được hiển thị ở đây</p>
                <div className="imageAndAudio" onClick={audioControls}>
                  <img id='img' src="https://cdn.tgdd.vn/hoi-dap/1314184/podcast-la-gi-co-gi-thu-vi-nghe-podcast-o-dau-2-1.jpg" alt="" />
                  <audio id='audio' controls className='audioInput'>
                    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CreatePodcastModal