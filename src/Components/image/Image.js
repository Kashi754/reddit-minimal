export function Image({ post }) {
    if(post.is_gallery) {
        const imageIds = Object.keys(post.media_metadata);
        let url = post.media_metadata[imageIds[0]]['s']['u'];
        let urlTarget = url.split('/');
        urlTarget = urlTarget.map(element => element !== 'preview.redd.it'? element : 'i.redd.it');
        url = urlTarget.join('/')
        return <img className='preview' src={url} alt={post.title} />
    }

    if(post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' && post.thumbnail !== 'nsfw') {
        if(post.url.includes('i.redd.it')) {
            return <img className='preview' src={post.url} alt={post.title} />
        }
        return <img className='preview thumbnail' src={post.thumbnail} alt={post.title} />
    }

    if(/* post.thumbnail === 'default' &&  */post.preview) {
        const image = post.preview.images[0];
        if(image && image.source.url.split('/')[2].split('.')[0] === 'external-preview') {
            return;
        }
        return <img className='preview' src={image.source.url} alt={image.source.url} />
    }
}