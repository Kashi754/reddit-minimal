import { Link } from 'react-router-dom';
import { Image } from '../image/Image';
import { Video } from '../video/Video';
import { useEffect } from 'react';
import './CardBody.css';

function decodeHtml(html) {
    let textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
}

function isThumbnail(post) {
    if(post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' && post.thumbnail !== 'nsfw' && !post.is_gallery && !post.url.includes('i.redd.it') && !post.is_video) {
        return true;
    }
}

export function CardBody({ post }) {

    useEffect(() => {
        const containers = document.getElementsByClassName('container');
        for(let container of containers) {
            if (container.childNodes.length === 0) {
                container.style.display = 'none';
            }
        }
    }, []);

    if(post.public_description !== undefined) {
        if(post.public_description) {
            return (
                <div className='card-body'>
                    <p dangerouslySetInnerHTML={{__html: decodeHtml(post.public_description)}} />
                </div>
            )
        } else {
            const description = post.description.split('\n');
            return (
                <div className='card-body'>
                    <p dangerouslySetInnerHTML={{__html: decodeHtml(description[0])}} />
                </div>
            )
        }
    }
    const thumbnail = isThumbnail(post);

    return(
        <div className={`card-body ${!post.selftext && thumbnail && 'thumbnail'}`}>
            <Link to={`subreddits/${post.subreddit}/${post.id}`}>
                <div className="gradient-shadow" />
            </Link>
            <h2>{post.title}</h2>
            <div className="content">
                <div className={`container ${thumbnail && 'thumbnail-container'}`}>
                    { post.is_video? <Video post={post} /> : <Image post={post} /> }
                </div>
                <div dangerouslySetInnerHTML={{__html: decodeHtml(post.selftext_html || post.body_html || '')}} />
            </div>
        </div>
    );
}