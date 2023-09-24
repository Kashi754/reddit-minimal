import { Gallery } from '../gallery/Gallery';
import './PostBody.css';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { addSpaceAfterHash } from '../../utilities/addSpaceAfterHash';

export function PostBody({ post }) {

    function setImage(post) {
        const image = post.preview?.images?.[0];
        if(image && image.source.url.split('/')[2].split('.')[0] === 'external-preview') {
            return;
        }
        
        if(image && !post.is_gallery) {
            const imageUrl = image.source.url.split('?')[0].replace('/preview', '/i');
            return (
                <div className="container">
                    <img src={imageUrl} alt={imageUrl}/>
                </div>
            ) 
        }
    }
    
    function setVideo(post) {
        const videoUrl = post.media?.reddit_video.fallback_url.split('?')[0];
        if(videoUrl) {
            return (
                <div className="container">
                    <video src={videoUrl} controls={true} type='video/mp4' />
                </div>
            ) 
        }
    }
    
    function setText(post) {
        const text = post.selftext || post.body;
        if(text) {
            const newText = addSpaceAfterHash(text);
            return <ReactMarkdown children={newText} remarkPlugins={[remarkGfm]} />
        }
    }
    
    function setGallery(post) {
        if(post.is_gallery) {
            const keys = Object.keys(post.media_metadata);
            return <Gallery keys={keys} images={post.media_metadata} />
        }
    }

    return(
        <div className={`post-body`}>
            <h2>{post.title}</h2>
            <div className="content">
                {setImage(post)}
                {setVideo(post)}
                {setGallery(post)}
                {setText(post)}     
            </div>
        </div>
    );
}