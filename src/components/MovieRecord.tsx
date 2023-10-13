"use client";
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
type Props = { movie: any }

function MovieRecord({ movie }: Props) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        const res = await fetch(`https://ryan-be-new.vercel.app/api/movies/${movie.id}`, {
            method: 'DELETE'
        })
        if (res.status === 200) {
            router.refresh();

        }
        else {
            setIsDeleting(false);
        }
    }


    return (
        <tr className="relative border-b dark:border-gray-700">
            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{movie.name}</th>
            <td className="px-4 py-3">{movie.duration}</td>
            <td className="px-4 py-3">{movie.rating}</td>
            <td className="px-4 py-3 flex items-center justify-end space-x-3" >
                <Link
                    href={`/edit-movie/${movie.id}`}
                    className="p-0.5 text-sm font-medium text-center underline  text-blue-500 hover:text-blue-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                    Edit
                </Link>
                <button
                    onClick={handleDelete}
                    className="p-0.5 text-sm w-24 font-medium text-center underline  text-red-500 hover:text-red-600 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </td>
        </tr>)
}

export default MovieRecord