export default class Movies {
  _apiMovies = 'https://api.themoviedb.org/3/'
  _apiKey = 'api_key=671d7d05abab6039164e85a040ed36dd'
  _apiPosters = 'https://image.tmdb.org/t/p/original'

  async getSource(query, page) {
    const request = await fetch(
      `${this._apiMovies}search/movie?${this._apiKey}&query=${query}&page=${page}&language=ru-RU`
    )

    if (!request.ok) {
      throw new Error('Movie getting troubles', request.status)
    }

    return await request.json()
  }

  // async getPoster() {
  //   // const request = await fetch(`${this._apiPosters}${path}`)

  //   const request = await fetch('https://image.tmdb.org/t/p/original/t5CNKKanYVzrcDmute3NWKXdfhC.jpg')

  //   if (!request.ok) {
  //     throw new Error('Poster getting troubles', request.status)
  //   }

  //   const resJson = await request.json()

  //   console.log(resJson)

  //   return resJson
  // }
}
