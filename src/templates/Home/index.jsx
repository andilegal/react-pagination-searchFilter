import {Component} from 'react'
import Posts from '../../components/Posts'
import { fetchData } from '../../service/service'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'

class App extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: '',
  }

  init = async () => {
    const posts = await fetchData('https://jsonplaceholder.typicode.com/posts')
    const photos = await fetchData('https://jsonplaceholder.typicode.com/photos')
    const { postsPerPage, page } = this.state

    const dataPosts = this.includePhotosOnPosts(photos, posts)

    this.setState({
      posts: dataPosts.slice(page, postsPerPage),
      allPosts: dataPosts
    })

  }

  componentDidMount() {
    this.init()
  }
  
  includePhotosOnPosts = (photos, posts) => {
    return posts.map((post, index) => {
      return { ...post, img: photos[index].url }
    })
  }

  handleLoadMorePosts = () => {
    const {page, postsPerPage, allPosts, posts} = this.state
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    this.setState({posts, page: nextPage})
  }

  handleChange = (event) => {
    const { value } = event.target
    this.setState({ searchValue: value })
  }

  render() {
    const { posts, postsPerPage , page, allPosts, searchValue } = this.state
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
          <TextInput handleChange={this.handleChange} searchValue={searchValue}/>
        </div>

        {filteredPosts.length > 0 ?
          <Posts posts={filteredPosts}/> :
          <p>Não encontrado</p>
        }
        
        {!searchValue && (
          <Button 
            disabled={noMorePosts} 
            actionFn={this.handleLoadMorePosts} 
            text="Load More" 
          />
        )}
      </section>
    )  
  }
}

export default App;
