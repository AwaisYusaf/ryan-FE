import React from 'react'
import SearchBar from './SearchBar'
import Filters from './Filters'
type Props = {}

function Header({ }: Props) {

  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
      <SearchBar />
      <Filters />
    </div>
  )
}

export default Header