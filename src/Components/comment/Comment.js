import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { useState } from "react";
import './Comment.css';
import { addSpaceAfterHash } from "../../utilities/addSpaceAfterHash";

export function Comment({ comment }) {
    const [expanded, setExpanded] = useState(false);

    function renderNestedComments(comment) {
        
        if(!comment.replies) {
            return;
        }
        
        const replies = comment.replies.data.children;

        if(replies.length <= 1) {
            return;
        }
        
        const replyComponents = replies.map((replyData, index) => {
            if(index >= replies.length - 1) {
                return null;
            }
            return expanded && (
                <div className="nested-comment" key={index}>
                    <Comment comment={replyData.data} key={index} />
                </div>
            )
        })

        return replyComponents;
    }

    function handleClick() {
        setExpanded(prev => !prev)
    }

    const body = addSpaceAfterHash(comment.body);

    return (
        <div className="comment">
            <h3>{comment.author} </h3>
            <div className="body">
                <ReactMarkdown children={body} remarkPlugins={[remarkGfm]} />
            </div>
            <div className='replies'>
                {!expanded && comment.replies?.data?.children.length > 1 && <h4 className='toggle-replies' onClick={handleClick}>+ show replies</h4>}
                {expanded && <h4 className='toggle-replies' onClick={handleClick}>- hide replies</h4>}
                {renderNestedComments(comment)}
            </div>
        </div>
    )
}