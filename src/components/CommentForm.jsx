import { useReducer, useContext} from "react"
import { commentReducer } from "../reducers/comment"
import blogService from '../services/blogs' 
import { useMutation, useQueryClient } from "@tanstack/react-query"
const CommentForm = ({blog}) => {

    const blogId = blog ? blog.id : null
    const [comment, commentDispatch] = useReducer(commentReducer,"")

    const queryClient=useQueryClient()
    const newCommentMutation = useMutation({
        mutationFn: blogService.addComment,
        onSuccess: () => {
            console.log("invalidating blogs")
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        },
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const newComment = comment
            newCommentMutation.mutate({id: blogId, comment: newComment})
            commentDispatch({type:"SET_COMMENT",comment:""})

        }
        catch(exception){
            console.log(exception)
        }

    }

    return (
<>
<form onSubmit={handleSubmit}>
<input
                    data-testid="comment"
                    type="text"
                    value={comment}
                    name="Comment"
                    onChange={({ target }) => commentDispatch({type:"SET_COMMENT",comment:target.value})}
                />


<button type="submit">add comment</button>
</form>

</>

    )
}

export default CommentForm