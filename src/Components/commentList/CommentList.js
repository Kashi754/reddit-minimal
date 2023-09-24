import { Comment } from "../comment/Comment"
import './CommentList.css';

export function CommentList({ comments }) {
    return (
        <div className='comments'>
            <h2>Comments</h2>
            {comments.map((comment, index) => {
                if(index >= comments.length - 1) {
                    return null;
                }
                return <Comment comment={comment} key={index} />
            })}
        </div>
    )
}