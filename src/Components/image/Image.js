export function Image({ post }) {
    if(post.is_gallery) {
        const imageIds = Object.keys(post.media_metadata);
        let url = post.media_metadata[imageIds[0]]['s']['u'];
        let urlTarget = url.split('/');
        urlTarget = urlTarget.map(element => element !== 'preview.redd.it'? element : 'i.redd.it');
        url = urlTarget.join('/')
        console.log(url);
        console.log(urlTarget);
        return <img className='preview' src={url} alt={post.title} />
    }

    if(post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' && post.thumbnail !== 'nsfw') {
        if(post.url.includes('i.redd.it')) {
            return <img className='preview' src={post.url} alt={post.title} />
        }
        return <img className='preview thumbnail' src={post.thumbnail} alt={post.title} />
    }

    if(/* post.thumbnail === 'default' &&  */post.preview) {
        return <img className='preview' src={post.preview.images[0].source.url} alt='I am a preview' />
    }
}