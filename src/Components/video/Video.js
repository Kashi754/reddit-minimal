export function Video({ post }) {
    return <video className='preview' src={post.media.reddit_video.fallback_url} controls={true} type='video/mp4'></video>
}