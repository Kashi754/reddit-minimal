export function Image({post}) {
    if(post.url?.includes('imgur')) {
        return (
            <div className="container">
                <img src={post.url} alt={post.url}/>
            </div>
        ) 
    }
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