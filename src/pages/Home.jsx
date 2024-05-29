import { useEffect } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import PostDetails from '../components/PostDetails'
import PostForm from "../components/PostForm";

const Home = () => {
  const { posts, dispatch } = usePostsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch entries');
        }
        const json = await response.json();

        dispatch({type: 'SET_POSTS', payload: json});

      } catch (error) {
          console.error(error)
      }
    }

    if (user) {
      fetchPosts();
    } 
  }, [dispatch, user])

  return (
    <div className="home">
        <div className="posts">
          {posts && posts.map((post) => (
            <PostDetails key={post._id} post={ post } />
          ))}
        </div>
        <PostForm />
    </div>
  )
}

export default Home;
