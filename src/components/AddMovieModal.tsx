import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { createRequest } from '@/lib/createRequest';
import { useRouter } from 'next/navigation';

type Props = {
    open: boolean
    setOpen: (open: boolean) => void
}

type FormType = {
    name: string;
    rating: number;
}

function AddMovieModal({ open, setOpen }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, watch, formState: { errors: formErrors } } = useForm<FormType>();
    const [duration, setDuration] = useState("");
    const [durationError, setDurationError] = useState({ status: false, message: "" });
    const router = useRouter();

    async function handleAddNewMovie(data: FormType) {
        const movieDuration = validateDuration(duration);
        if (!movieDuration) {
            return;
        }
        setIsLoading(true);

        const movie = {
            name: data.name,
            duration: movieDuration,
            rating: data.rating
        }


        const res = await createRequest("/api/movies", {
            method: "POST",
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status === "success") {
            setIsLoading(false);
            setOpen(false);
            router.refresh();
        }

    }

    function validateDuration(e: any): null | string {
        let movieDuration = null;

        if (e.length < 2) {
            setDurationError({ status: true, message: "Duration must be valid" });
            return movieDuration;
        }

        const endChar = e.charAt(e.length - 1);
        if (endChar !== "h" && endChar !== "m") {
            setDurationError({ status: true, message: "Duration must include [m/h] postfix" });
            return movieDuration;
        }

        if (endChar === "h") {
            //Check if the duration is in the correct format
            const hours = parseFloat(e.slice(0, e.length - 1));
            if (hours < 0.1 || hours > 12) {
                setDurationError({ status: true, message: "Duration must be between 0.1 and 12 hours" });
            }
            else {
                movieDuration = hours.toString();
            }
        }

        else if (endChar === "m") {
            //Check if the duration is in the correct format
            const minutes = parseInt(e.slice(0, e.length - 1));
            if (minutes < 1 || minutes > 720) {
                setDurationError({ status: true, message: "Duration must be between 1 and 720 minutes" });
            }
            else {
                movieDuration = minutesToHours(minutes).toString();
            }
        }
        else {
            setDurationError({ status: true, message: "Duration must include [m/h] postfix" });
        }
        return movieDuration;
    }
    function minutesToHours(minutes: number) {
        if (typeof minutes !== 'number' || minutes < 0) {
            return "Invalid input";
        }

        const hours = minutes / 60;
        return hours.toFixed(1);
    }



    return (
        <div id="defaultModal" aria-hidden="true" className={`${open ? "flex" : "hidden"} backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}>
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                {/* <!-- Modal content --> */}
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    {/* <!-- Modal header --> */}
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Add Movie
                        </h3>
                        <button onClick={() => setOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <form onSubmit={handleSubmit(handleAddNewMovie)}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text"
                                    {...register("name", { required: true, minLength: 2, maxLength: 100 })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    placeholder="Type movie name" />
                                {/* {errors.name.status && <span className="text-red-500 text-xs">{errors.name.message}</span>} */}
                                {formErrors.name && formErrors.name.type === "required" && <span className="text-red-500 text-xs">Name is required</span>}
                                {formErrors.name && (formErrors.name.type === "minLength" || formErrors.name?.type === "maxLength") && <span className="text-red-500 text-xs">Name must be between 2-100 characters</span>}
                            </div>
                            <div>
                                <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 ">Duration</label>
                                <input
                                    onChange={(e) => {
                                        setDuration(e.target.value);
                                        setDurationError({ status: false, message: "" });
                                    }}
                                    value={duration}
                                    type="text" name="duration" id="duration" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type movie duration e.g., 1.5h/120m" />
                                {durationError.status && <span className="text-red-500 text-xs">{durationError.message}</span>}
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating (out of 10)</label>
                                <input
                                    {...register("rating", { required: true, min: 0, max: 10 })}
                                    type="number" name="rating" id="rating" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type movie duration e.g., 1.5h/120m" />
                                {formErrors.rating && formErrors.rating.type === "required" && <span className="text-red-500 text-xs">Rating is required</span>}
                                {formErrors.rating && (formErrors.rating.type === "min" || formErrors.rating?.type === "max") && <span className="text-red-500 text-xs">Rating must be between 0-10</span>}
                            </div>
                        </div>
                        <button
                            type='submit'
                            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">

                            {
                                isLoading ?
                                    <svg aria-hidden="true" className="mr-2 -ml-1 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg> :
                                    <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            }

                            {isLoading ? "Saving..." : "Add movie"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddMovieModal