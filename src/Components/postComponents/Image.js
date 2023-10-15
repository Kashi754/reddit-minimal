export function Image({post}) {
    const url = post.url;
    function isImgUrl(url) {
        return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|svg|gif|webp|jpeg)/.test(url)
    }

    if (isImgUrl(url)) {
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