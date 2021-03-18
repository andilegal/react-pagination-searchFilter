import {Component} from 'react'
import PostCard from '../PostCard'

class Posts extends Component {
  render() {
    const { posts } = this.props
    return (
      <div className="posts">
        {posts.map(post =>
          <PostCard post={post} key={post.id} />
        )}
    </div>
    )
  }
}

export default Posts
