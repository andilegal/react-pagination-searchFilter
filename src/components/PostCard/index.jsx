import {Component} from 'react';

class PostCard extends Component {

  render() {
    const { post } = this.props
    return (
      <div key={post.key} className="post"> 
        <img className="post__image" src={post.img} alt={post.title}/>
        <div className="post__content">
          <h1>{post.id}) {post.title}</h1>
          <h2>{post.body}</h2>
        </div>
      </div>
      ) 
    }
}

export default PostCard
