import { GalleryWrapper } from '../postComponents/GalleryWrapper';
import { Image } from '../postComponents/Image';
import { Video } from '../postComponents/Video';
import { Text } from '../postComponents/Text';
import { PreviewGradient } from '../postComponents/PreviewGradient';
import { ExternalLink } from '../postComponents/ExternalLink';
import { useNavigate } from 'react-router-dom';
import './PostBody.css';


export function PostBody({ post, isListingCard }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/subreddits/${post.subreddit}/${post.id}`)
    }

    return(
        <div className={isListingCard ? 'post-body listing-card': 'post-body'}>
            <div className="body-header">
                <h2>{post.title || post.name}</h2>
                <ExternalLink post={post} />
            </div>
            <div className="content">
                <PreviewGradient isListingCard={isListingCard} handleClick={handleClick} />
                <Image post={post} />
                <Video post={post} />
                <GalleryWrapper post={post} />
                <Text post={post} />  
            </div>
        </div>
    );
}