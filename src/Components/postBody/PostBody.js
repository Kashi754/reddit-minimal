import { Gallery } from '../gallery/Gallery';
import './PostBody.css';

function decodeHtml(html) {
    let textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
}

export function PostBody({ post }) {

    function setImage(post) {
        const image = post.preview?.images?.[0];
        if(image && !post.is_gallery) {
            const imageUrl = image.source.url.split('?')[0].replace('preview', 'i');
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
        const text = post.selftext_html || post.body_html;
        if(text) {
            return <div dangerouslySetInnerHTML={{__html: decodeHtml(post.selftext_html || post.body_html)}} />
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