import React from 'react'
import Header from './Header'
import MovieRecord from './MovieRecord'
import Pagination from './Pagination'

type Props = {
    movies: any[]
}

function MovieList({ movies }: Props) {
    return (
        <section className="bg-gray-50 w-full min-h-screen flex items-center dark:bg-gray-900 p-3 sm:p-5 relative">
            <div className="mx-auto w-[80%]">
                {/* <!-- Start coding here --> */}
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <Header />
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Movie name</th>
                                    <th scope="col" className="px-4 py-3">Duration</th>
                                    <th scope="col" className="px-4 py-3">Rating</th>
                                    <th scope="col" className="px-4 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map((movie) => (
                                    <MovieRecord key={movie.id} movie={movie} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination />
                </div>
            </div>
        </section>
    )
}

export default MovieList