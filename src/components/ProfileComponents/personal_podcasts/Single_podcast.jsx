import React from "react";
import './Single_podcast.css'
import { FcLike } from "react-icons/fc";
import { MdOutlineComment } from "react-icons/md";
import { FaPlay } from "react-icons/fa";


const Single_podcast = ({image, name, description}) => {
    return(
        <div className="podcast-item">
            <img src={image} alt="ImagePodcast" className="image" />
            <div className="info">
                <p className="name">{name}</p>
                <p className="description">{description}</p>
                {/* <audio controls>
                    <source src="{audioURL}" type="audio/mpeg"/>
                    Your browser does not support the audio element.
                </audio> */}
            </div>

            <div className="icons">
                <div className="love">
                  <FcLike/>
                  <span>123K</span>
                </div>
                
                <div className="comments">
                  <MdOutlineComment/>
                  <span>52</span>
                </div>

                <div className="views">
                  <FaPlay/>
                  <span>52K</span>
                </div>
          </div>

        </div>
    );
};

export default Single_podcast;