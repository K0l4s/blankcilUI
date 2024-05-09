import React from 'react'
import './CreatePodcastModal.css'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { apiPath } from '../../../api/endpoint'
const CreatePodcastModal = ({isOpen,onClose}) => {

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

    // Create a promise that rejects after a specified timeout
    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Request timed out'));
        }, 3600 * 5); // Timeout in milliseconds
    });

    // Fetch request
    const fetchPromise = fetch('http://localhost:9090/api/v1/podcast/upload', {
      mode: 'no-cors',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0cnVuZ2tpZW5AZ21haWwuY29tIiwiaWF0IjoxNzE0OTQ0ODA1LCJleHAiOjE3MTUwMzEyMDV9.IrWtW1vaYLuT_1D7mFTNApzA-C4_k_3mJXeiYU8HcgY',
        },
        body: formData
    });

    // Use Promise.race to race between fetch and timeout promises
    Promise.race([fetchPromise, timeoutPromise])
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    console.log(title, content, imageFile, audioFile);
}




  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size='full'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>THÊM PODCAST MỚI</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className='createPodcastModal'>
                <input id='title' type="text" placeholder="Nhập tiêu đề" />
                <input id='content' type="text" placeholder="Nhập mô tả" />
                <input id='imageFile' type="file" placeholder="Nhập link ảnh" />
                <input id='audioFile' type="file" placeholder="Nhập link podcast" />
                <Button onClick={handleCreatePodcast} variant='solid'>Gửi</Button>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button  variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </div>
  )
}

export default CreatePodcastModal