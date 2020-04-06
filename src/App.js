import React, { Component } from 'react';
import './App.css';


const profileId = '17386970082';
const numberOfPosts = '24';

class App extends Component {

  state = {
    data: []
  }

  componentDidMount() {
    fetch(`https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables={"id":"${profileId}","first":${numberOfPosts}}`)
      .then(res => res.json())
      .then(data => this.setState({ data: data.data.user.edge_owner_to_timeline_media.edges }))
  }

  render() {
    return (
      <div className="app">
        {this.state.data.map((post, i) =>
          <div className="insta-container" key={i}>
            <div className="image-container">
              <img src={post['node'].display_resources[0].src} alt="instagram post" />
            </div>
            <div className="text-container">
              <h3>Post text: <span className="text">{post['node'].edge_media_to_caption.edges[0]['node'].text}</span></h3>
              <h3>Number of comments: <span className="text">{post['node'].edge_media_to_comment.count} and I can also know who commented and what they commented</span></h3>
              <h3>Number of likes: <span className="text">{post['node'].edge_media_preview_like.count}</span></h3>
              <h3>Location: <span className="text">{!!post['node'].location}</span></h3>
              <h3>You don't have access to hashtags or tagged people directly but you can do some javascript magic</h3>
              <h3><span className="text">
                {
                  post['node'].edge_media_to_caption.edges[0]['node'].text.match(/(^|\s)#(\w+)/g) ?
                    post['node'].edge_media_to_caption.edges[0]['node'].text.match(/(^|\s)#(\w+)/g).map(text => `#${text.trim().substring(1)} `)
                    : 'No hastags used'
                }
              </span></h3>
              <h3><span className="text">
                {
                  post['node'].edge_media_to_caption.edges[0]['node'].text.match(/(^|\s)@(\w+)/g) ?
                    post['node'].edge_media_to_caption.edges[0]['node'].text.match(/(^|\s)@(\w+)/g).map(text => `@${text.trim().substring(1)} `)
                    : 'No tagged people'
                }
              </span></h3>
            </div>
          </div>

        )}
      </div>
    );
  }
}


export default App;
