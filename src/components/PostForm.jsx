import { useState } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const PostForm = () => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in')
      return
    }

    const post = { date, title, content };

    const response = await fetch("http://localhost:3000/api/posts", {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }            
    });
    try {
      const json = await response.json();
      console.log("Response JSON:", json);

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }

      if (response.ok) {
        setDate("");
        setTitle("");
        setContent("");
        setError(null);
        setEmptyFields([])
        console.log("New diary entry added", json)
        dispatch({type: 'CREATE_POST', payload: json});
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Create an Entry</h3>

      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        className={emptyFields.includes('date') ? 'error' : ''}
      />

      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className={emptyFields.includes('content') ? 'error' : ''}
      />

      <button>Add Entry</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default PostForm;
