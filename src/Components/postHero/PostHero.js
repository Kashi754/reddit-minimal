import { Link } from "react-router-dom";
import { PostBody } from "../postBody/PostBody";
import './PostHero.css';

function displayTime(post) {
    const currentTime = Date.now();
    const createdAt = post.created_utc * 1000;
    const timeDifferenceInMillis = currentTime - createdAt;
    const days = Math.floor(timeDifferenceInMillis / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeDifferenceInMillis / (1000 * 60 * 60));
    const minutes = Math.floor(timeDifferenceInMillis / (1000 * 60));
    
    if(days) {
        return `${days} ${days > 1 ? 'days' : 'day'} ago`
    }
    if(hours) {
        return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`
    }
    if(minutes) {
        return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`
    }
}

function intToString(num, precision = 1) {
    const map = [
        { suffix: 'T', threshold: 1e12 },
        { suffix: 'B', threshold: 1e9 },
        { suffix: 'M', threshold: 1e6 },
        { suffix: 'K', threshold: 1e3 },
        { suffix: '', threshold: 1 },
    ];
    
    const found = map.find((x) => Math.abs(num) >= x.threshold);
    if (found) {
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
    }
    
    return num;
};

export function PostHero({ post }) {
    return (
        <div className='post-hero'>
            <div className="post-score">
                <img className='arrow' src='/images/up-arrow.png' alt="up arrow" />
                <h3>{intToString(post.score)}</h3>
                <img className='arrow' src='/images/down-arrow.png' alt="down arrow" />
            </div>
            <div className='card-header'>
                <h3 className='main'>
                    <Link to={`/subreddits/${post.subreddit}`}>
                        {`${post.subreddit_name_prefixed}`}
                    </Link>
                    &nbsp;•&nbsp;
                    <Link to={`/users/${post.author}`}>
                        Posted by u/{post.author}
                    </Link>
                </h3>
                <h3 className='time'>
                    <span className='time'>
                        {displayTime(post)}
                    </span>
                </h3>
            </div>
            <PostBody post={post} isListingCard={false}/>
            <div className='card-footer'>
                <h4>{post.num_comments} comments</h4>
            </div>
        </div>
    )
}