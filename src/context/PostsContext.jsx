import { createContext, useReducer } from "react";
import PropTypes from 'prop-types'

export const PostsContext = createContext();

const postsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                posts: action.payload
            }
        case 'CREATE_POST':
            return {
                posts: [action.payload, ...state.posts]
            }
        case 'DELETE_POST':
            return {
                posts: state.posts.filter((p) => p._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const PostsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postsReducer, {
        posts: null
    })

    return (
        <PostsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </PostsContext.Provider>
    )
}


PostsContextProvider.propTypes = {
    children: PropTypes.object.isRequired
}