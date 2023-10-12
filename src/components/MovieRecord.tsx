import Link from 'next/link'
import React from 'react'
type Props = { movie: any }

function MovieRecord({ movie }: Props) {


    return (

        <tr className="relative border-b dark:border-gray-700">
            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{movie.name}</th>
            <td className="px-4 py-3">{movie.duration}</td>
            <td className="px-4 py-3">{movie.rating}</td>
            <td className="px-4 py-3 flex items-center justify-end" >
                <Link
                    href={`/edit-movie/${movie.id}`}
                    className="p-0.5 text-sm font-medium text-center underline  text-blue-500 hover:text-blue-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                    Edit
                </Link>
            </td>
        </tr>)
}

export default MovieRecord