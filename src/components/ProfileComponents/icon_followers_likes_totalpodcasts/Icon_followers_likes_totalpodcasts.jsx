import React from "react";
import './Icon_followers_likes_totalpodcasts.css';
import { FaUserPlus } from "react-icons/fa6";
import { SiApplepodcasts } from "react-icons/si";
import { AiFillLike } from "react-icons/ai";


const Icon_followers_likes_totalpodcasts = () =>{
    return(
        <div className="icons">
            <div className="followers">
                <FaUserPlus/>
                <span>123K</span>
            </div>

            <div className="totalPodcasts">
                <SiApplepodcasts/>
                <span>52 podcasts</span>
            </div> 

            <div className="likes">
                <AiFillLike/>
                <span>100K Likes</span>
            </div>
        </div>
    )
}

export default Icon_followers_likes_totalpodcasts


