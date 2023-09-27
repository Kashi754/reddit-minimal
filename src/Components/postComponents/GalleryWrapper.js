import { Gallery } from "./Gallery";

export function GalleryWrapper({post}) {
    if(post.is_gallery) {
        const keys = Object.keys(post.media_metadata);
        return <Gallery keys={keys} images={post.media_metadata} />
    }
}