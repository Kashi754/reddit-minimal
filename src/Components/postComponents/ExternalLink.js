import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export function ExternalLink({post}) {
    if(!post.url) {
        return;
    }
    if(post.url.includes('r/')) {

    }
    if(!post.url.includes('redd') && !post.url.includes('imgur') && !post.url.includes('r/')) {
        const url = post.url;
        function isImgUrl(url) {
            return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url)
        }

        if (isImgUrl(url)) {
            return;
        }

        const linkText = post.url.split('/').slice(2, -1).join('/');
        return (
            
            <a href={post.url} className="link-container">
                {!!post.thumbnail && !post.thumbnail === 'default' && <img className="link-image" src={post.thumbnail} style={{width: post.thumbnail_width + 'px', height: post.thumbnail_height + 'px'}} alt={post.thumbnail}/>}
                <div className="link-text">
                    <h3>{`${linkText.match(/.{1,20}/g)[0]}... `}</h3> 
                    <FontAwesomeIcon icon={faLink} />
                </div>
            </a>
        )
    }
}