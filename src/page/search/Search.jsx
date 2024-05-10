import React from 'react'
import './Search.css'
import { LiaSearchengin } from 'react-icons/lia'
const Search = () => {
  return (
    <div>
        <div className="searchBox">
            <input placeholder="Tìm kiếm" type="text" className="searchInput" />
            <LiaSearchengin className='searchButton' />

        </div>
    </div>
  )
}

export default Search