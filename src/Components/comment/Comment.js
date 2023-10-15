import { useState } from "react";
import './Comment.css';
import { Link } from "react-router-dom";
import { htmlDecode } from "../../utilities/htmlDecode";

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
                <div className="nested-comment" data-testid="nested-comment" key={index}>
                    <Comment comment={replyData.data} key={index} />
                </div>
            )
        })

        return replyComponents;
    }

    function handleClick() {
        setExpanded(prev => !prev)
    }
    
    function setCommentBody(comment) {

        const text = comment.body_html || null;
        if(text) {
            return <div className='body-text' data-testid="comment-body" dangerouslySetInnerHTML={{__html: htmlDecode(comment.body_html)}} />;
        }
        return;
    }

    return (
        <div className="comment" data-testid='comment'>
            <h3><Link to={`/users/${comment.author}`}>{`u/${comment.author}`}</Link></h3>
            <div className="comment-body">
                {setCommentBody(comment)}
            </div>
            <div className='replies'>
                {!expanded && comment.replies?.data?.children.length > 1 && <button role='button' type='button' className='toggle-replies' onClick={handleClick}>+ show replies</button>}
                {expanded && <button role='button' type='button' className='toggle-replies' onClick={handleClick}>- hide replies</button>}
                {renderNestedComments(comment)}
            </div>
        </div>
    )
}