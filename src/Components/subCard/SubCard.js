import { Link } from 'react-router-dom';
import './SubCard.css';
import { PostBody } from '../postBody/PostBody';

export function SubCard({ subreddit }) {
    const imageUrl = subreddit.community_icon?.split('?')[0];

    return (
        <div className='sub-card'>
            <div className="sub-img-container">
                <img className='user-icon' src={imageUrl} alt={subreddit.display_name}/>
            </div>
            <div className='sub-card-header'>
                <h3 className='sub-main'>
                    <Link to={`/subreddits/${subreddit.display_name}`}>
                        {subreddit.display_name_prefixed}
                    </Link>
                </h3>
            </div>
            <PostBody post={subreddit} />
            <div className='sub-card-footer'>
                <h4>{subreddit.subscribers} subscribers</h4>
            </div>
        </div>
    )
}