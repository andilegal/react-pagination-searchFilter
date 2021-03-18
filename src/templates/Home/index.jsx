import {useState, useEffect, useCallback} from 'react'
import Posts from '../../components/Posts'
import { fetchData } from '../../service/service'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'

export const Home = () => {

  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerPage] = useState(2)
  const [searchValue, setSearchValue] = useState('')

  const init = useCallback(async (page, postsPerPage) => {
    const posts = await fetchData('https://jsonplaceholder.typicode.com/posts')
    const photos = await fetchData('https://jsonplaceholder.typicode.com/photos')

    const dataPosts = includePhotosOnPosts(photos, posts)

    setPosts(dataPosts.slice(page, postsPerPage))
    setAllPosts(dataPosts)
  },[])

  useEffect(() => {
    init(0, postsPerPage)
  }, [init, postsPerPage])


  const includePhotosOnPosts = (photos, posts) => {
    return posts.map((post, index) => {
      return { ...post, img: photos[index].url }
    })
  }

  const handleLoadMorePosts = () => {
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    setPosts(posts)
    setPage(nextPage)
  }

  const handleChange = (event) => {
    const { value } = event.target
    setSearchValue(value)
  }

  const noMorePosts = page + postsPerPage >= allPosts.length

  const filteredPosts = Boolean(searchValue) ?
  allPosts.filter(post => {
  return post.title.toLowerCase()
    .includes(searchValue.toLowerCase())
  })
  : posts

  return (
    <section className="container">
      <div className="search-container">
        {Boolean(searchValue) && (
          <h1>Search: {searchValue}</h1>
        )}
        <TextInput handleChange={handleChange} searchValue={searchValue}/>
      </div>

      {filteredPosts.length > 0 ?
        <Posts posts={filteredPosts}/> :
        <p>Não encontrado</p>
      }
      
      {!searchValue && (
        <Button 
          disabled={noMorePosts} 
          actionFn={handleLoadMorePosts} 
          text="Load More" 
        />
      )}
    </section>
  )
}

export default Home;
