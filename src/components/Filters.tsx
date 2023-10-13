"use client";
import React, { useState } from 'react'
import AddMovieModal from './AddMovieModal'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Props = {}

function Filters({ }: Props) {
    const [showAddMovieModal, setShowAddMovieModal] = useState(false);
    const [showFilterDropDown, setShowFilterDropDown] = useState(false);
    const [showDownloadDropDown, setShowDownloadDropDown] = useState(false);
    const searchParams = useSearchParams();


    const query = searchParams.get("query");
    const page = searchParams.get("page");
    // This is a custom hook that I wrote to handle the search query

    let queryString = query ? `/?query=${query}` : "";
    if (queryString.length > 0) {
        queryString = queryString + `&page=${page ? page : "1"}`;
    }
    else {
        queryString = `/?page=${page ? page : "1"}`;
    }

    function handleFilterClose() {
        setShowFilterDropDown(false);
    }



    const downloadCSV = () => {
        setShowDownloadDropDown(false);
        fetch('http://localhost:5000/api/movies/download-csv')
            .then((response) => {
                return response.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const a = document.createElement('a');
                a.href = url;
                a.download = 'output.csv';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            });
    };



    function downloadTXT() {
        setShowDownloadDropDown(false);
        fetch('http://localhost:5000/api/movies/download-txt')
            .then((response) => {
                return response.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const a = document.createElement('a');
                a.href = url;
                a.download = 'output.txt';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            });

    }

    return (
        <>
            <AddMovieModal open={showAddMovieModal} setOpen={setShowAddMovieModal} />

            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                    onClick={() => setShowAddMovieModal(true)}
                    type="button"
                    className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                    </svg>
                    Add movie
                </button>
                <div className='relative'>
                    <button
                        onClick={() => setShowDownloadDropDown(!showDownloadDropDown)}
                        type="button"
                        className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-3.5 w-3.5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Download List
                    </button>
                    <div id="actionsDropdown" className={`${showDownloadDropDown ? "absolute" : "hidden"} z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
                        <div className="py-1 text-sm text-gray-700 hover:bg-gray-100" aria-labelledby="actionsDropdownButton">
                            <button onClick={downloadTXT}
                                className="block py-2 px-4  ">Generate TXT</button>
                        </div>
                        <div className="py-1 hover:bg-gray-100">
                            <button onClick={downloadCSV}
                                className="block py-2 px-4 text-sm text-gray-700  ">Generate CSV</button>
                        </div>
                    </div>
                </div>

                <div className="items-center w-full md:w-auto relative">

                    <button

                        onClick={() => setShowFilterDropDown(!showFilterDropDown)}
                        id="filterDropdownButton" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                        </svg>
                        Sort
                        <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </button>

                    <div id="filtersDropdown" className={`${showFilterDropDown ? "absolute" : "hidden"} -ml-6 top-12 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
                        <div className="py-1">
                            <Link onClick={handleFilterClose} href={`${queryString}&sort=rating_asc`} className="block py-2 px-4 w-full text-start text-sm text-gray-700 hover:bg-gray-100">Rating Ascending</Link>
                        </div>
                        <div className="py-1">
                            <Link onClick={handleFilterClose} href={`${queryString}&sort=rating_desc`} className="block py-2 px-4 w-full text-start text-sm text-gray-700 hover:bg-gray-100">Rating Descending</Link>
                        </div>
                        <div className="py-1">
                            <Link onClick={handleFilterClose} href={`${queryString}&sort=name_asc`} className="block py-2 px-4 w-full text-start text-sm text-gray-700 hover:bg-gray-100">Name Ascending</Link>
                        </div>
                        <div className="py-1">
                            <Link onClick={handleFilterClose} href={`${queryString}&sort=name_desc`} className="block py-2 px-4 w-full text-start text-sm text-gray-700 hover:bg-gray-100">Name Descending</Link>
                        </div>

                    </div>
                </div>
            </div>
        </>)
}

export default Filters