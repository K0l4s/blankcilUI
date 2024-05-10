import React, { useState } from 'react'
import './Search.css'
import { LiaSearchengin } from 'react-icons/lia'
import SearchUser from '../../components/search/user/SearchUser'
import { apiPath } from '../../api/endpoint'
import axios from 'axios'
const Search = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const search = () => {
    
    setSearchKey(document.getElementById('searchInput').value);
    console.log(searchKey);
    axios.get(apiPath + `users/search?name=${searchKey}`, {
      headers: {
        'ngrok-skip-browser-warning': 'any_value'
      }
    })
      .then((response) => {
        console.log(response.data);
        setSearchResult(response.data.body);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <div>
      <div className="searchBox">
        <input id='searchInput' placeholder="Tìm kiếm" type="text" className="searchInput" />
        <LiaSearchengin className='searchButton' onClick={search}/>
      </div>
      <p style={{ padding: '10px' }}>Kết quả tìm kiếm</p>
      {/* Kết quả tìm kiếm */}
      {searchResult.length > 0 ? searchResult.map((user, index) => {
        return (
          <SearchUser key={index} user={user} />
        )
      }
      ) : <p>Không có kết quả tìm kiếm</p>}


    </div>
  )
}

export default Search