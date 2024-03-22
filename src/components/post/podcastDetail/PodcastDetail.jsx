import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react'
import PodcastPost from '../podcastPost/PodcastPost'
const podcastDetail = ({isOpen,onClose}) => {
    const podcast = {
      id: 'S1',
      name: 'Code4life',
      author: 'John Doe',
      theme_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      voice_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      background_url: null,
      like: 10000,
      comment: 1000
    }
    const comment = [
      {
        id: 'C1',
        content: 'I love this podcast',
        user
        : 'John Doe',
        like: 1000,
        reply: [
          {
            id: 'R1',
            content: 'I love this podcast too',
            user
            : 'John Doe',
            like: 1000,
          }
        ]
      }
    ]
    return (
      <div>
        <Modal isOpen={isOpen} onClose={onClose} size='full'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{podcast.name} - Tác giả: {podcast.author} - Ngôi sao đang lên</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="detailBody">
                <PodcastPost className='podcast' podcast={podcast} active={true} />
                <div className="commentSection">
                  <h3>Bình luận</h3>
                  <div className="commentList">
                    {comment.map((c) => (
                      <div className="comment">
                        <p>{c.content}</p>
                        <p>{c.user}</p>
                        <div className="likeAndReply">
                          <div className="like">
                            <p>{c.like}</p>
                          </div>
                          <div className="reply">
                            <p>{c.reply.length} phản hồi</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    )
  }

export default podcastDetail