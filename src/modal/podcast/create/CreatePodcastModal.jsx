import React, { useState } from 'react'
import './CreatePodcastModal.css'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, position, useToast } from '@chakra-ui/react'
import { apiPath } from '../../../api/endpoint'
import axios from 'axios'
import { use } from 'i18next'
const CreatePodcastModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const inputImageChange = (e) => {
    // const img = document.getElementById('img');
    // img.src = URL.createObjectURL(e.target.files[0]);
  }
  const handleCreatePodcast = () => {
    console.log("Handle");
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageFile = document.getElementById('imageFile').files[0];
    const audioFile = document.getElementById('audioFile').files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('imageFile', imageFile);
    formData.append('audioFile', audioFile);

    // // Create a promise that rejects after a specified timeout
    // const timeoutPromise = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         reject(new Error('Request timed out'));
    //     }, 3600 * 5); // Timeout in milliseconds
    // });

    //   // Fetch request
    //   const fetchPromise = fetch('http://localhost:9090/api/v1/podcast/create', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aHVhbm5nbzkxMTJAZ21haWwuY29tIiwiaWF0IjoxNzE1MTkzNTYyLCJleHAiOjE3MTUyNzk5NjJ9.E2RvZoZ7ugoKQGhUVSw_CBh5kcTZjvMVjyXc5qF6nLA' ,
    //         'Content-Type': 'multipart/form-data',
    //     },
    //     body: formData
    // });

    // fetchPromise
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });

    // console.log(title, content, imageFile, audioFile);
    //   }  
    const token = localStorage.getItem('access_token');
    const sendButton = document.getElementById('sendButton');
    sendButton.disabled = true;
    // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aHVhbm5nbzkxMTJAZ21haWwuY29tIiwiaWF0IjoxNzE1MjA0NDEwLCJleHAiOjE3MTUyOTA4MTB9.JpwlZ0UF-kPvrn3kSomQ0DxWVQzIVYNAGn3W6tksUAQ';
    try {


      const response = axios.post(apiPath+'podcast/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        console.log(response.data);
        sendButton.disabled = false;
      })
      toast.promise(response, {
        success: { title: 'Thành công!', description: 'Đã tạo Podcast thành công, xem ở trang cá nhân' },
        error: { title: 'Lỗi', description: 'Something wrong' },
        loading: { title: 'Đang upload', description: 'Vui lòng chờ trong giây lát, bài viết của bạn đang được xử lý!' }
      })
      // console.log('Response:', response.data);
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
              <p>Tiêu đề Podcast</p>
              {/* <img id='img' src="https://cdn.tgdd.vn/hoi-dap/1314184/podcast-la-gi-co-gi-thu-vi-nghe-podcast-o-dau-2-1.jpg" alt="" /> */}
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
              <input id='audioFile' type="file" accept="audio/*" placeholder="Nhập link podcast" />

              <Button id='sendButton' onClick={handleCreatePodcast} variant='solid'>Gửi</Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CreatePodcastModal