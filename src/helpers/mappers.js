import { format } from 'date-fns'

const apiPosters = 'https://image.tmdb.org/t/p/original'

const sliceText = (text) => {
  const maxSymbolsLength = 145
  if (text.length < maxSymbolsLength) {
    return text
  }

  let newText = text.slice(0, maxSymbolsLength)
  newText = newText.slice(0, newText.lastIndexOf(' '))
  return newText + '...'
}

export const transformData = (data) => {
  return {
    title: data.title,
    id: data.id,
    releaseDate: data.release_date ? format(new Date(data.release_date), "MMMM d',' y") : null,
    description: sliceText(data.overview),
    voteAverage: data.vote_average,
    tagIds: data.genre_ids,
    posterPath: data.poster_path ? `${apiPosters}${data.poster_path}` : null,
  }
}

export const transformRatedData = (data) => {
  return {
    title: data.title,
    id: data.id,
    releaseDate: data.release_date ? format(new Date(data.release_date), "MMMM d',' y") : null,
    description: sliceText(data.overview),
    voteAverage: data.vote_average,
    tagIds: data.genre_ids,
    posterPath: data.poster_path ? `${apiPosters}${data.poster_path}` : null,
    rating: data.rating,
  }
}
