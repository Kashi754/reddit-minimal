export function Video({post}) {
    const videoUrl = post.media?.reddit_video?.fallback_url?.split('?')[0];
    if(videoUrl) {
        return (
            <div className="container">
                <video src={videoUrl} controls={true} type='video/mp4' />
            </div>
        ) 
    }
}