import { PostCard } from "../postCard/PostCard";
import './Listing.css';

export function Listing({ feed }) {
    if(!feed) {
        return;
    }

    return (
        <div className="listing">{
            feed.map((post, index) => {
                if(!post.body) {
                    return <PostCard key={index} post={post} />
                }
            })
        }</div>
    );
}