import MovieList from "@/components/MovieList";
import { createRequest } from "@/lib/createRequest";


async function fetchAllMovies(queryString: string) {
  const { movies } = await createRequest("/api/movies" + queryString, { cache: "no-store" });
  return movies;
}

export default async function Home({ searchParams }: { searchParams: any }) {
  const { query, page, sort } = searchParams;
  let movies: any[] = [];

  let queryString = query ? `?q=${query}` : "";
  if (queryString.length > 0) {
    queryString = queryString + `&page=${page ? page : "1"}`;
  }
  else {
    queryString = `?page=${page ? page : "1"}`;
  }

  if (sort) {
    queryString = queryString + `&sort=${sort}`;
  }

  movies = await fetchAllMovies(queryString);

  return (
    <main>
      <MovieList movies={movies} />
    </main>
  )
}
