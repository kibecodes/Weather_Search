import React, { useState, ChangeEvent } from 'react'

interface SearchTabProps {
    query: string;
    setQuery: (query: string) => void
    handleSearch: () => void;
    handleSubmit: React.FormEventHandler<HTMLFormElement>
    setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>    
}

const SearchTab = ({ query, handleSearch, setQuery, handleSubmit, setSearchHistory }: SearchTabProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }


    return(
        <>
          <form onSubmit={handleSubmit} >
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search for city/ timezone
                </label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                </div>
                <input type="search"
                        id="default-search" 
                        className="block w-full p-4 pl-10 text-sm text-gray-900" 
                        placeholder="Search..."
                        value={query}
                        onChange={handleChange}
                        required 
                />
                <button 
                    type="submit"
                    id="default-search"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Search
                </button>
            </form>
        </>
    )
}

export default SearchTab