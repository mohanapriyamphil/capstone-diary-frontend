import PropTypes from "prop-types";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { format } from "date-fns";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const PostDetails = ({ post }) => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "https://capstone-diary-backend.onrender.com/api/posts/" + post._id,
      // "http://localhost:3000/api/posts/" + post._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };

  return (
    <div className="post-details">
        
      <h4>{post.title}</h4>
     
      <p style={{"opacity": "0.8"}}>
        <strong>Date: </strong>
        {format(new Date(post.date), "MMMM d, y")}
      </p><br/>
      <p style={{"fontSize":"20px", "fontWeight": "600"}}>{post.content}</p>
      <br />
      <p style={{"opacity": "0.5"}}>
        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      </p>
      <span 
        className="material-symbols-outlined" 
        onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostDetails;
