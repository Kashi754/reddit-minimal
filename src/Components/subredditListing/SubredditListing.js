import { SubCard } from "../subCard/SubCard";

export function SubredditListing({ feed }) {
    if(!feed) {
        return;
    }

    return (
        <div className="listing">{
            feed.map((subreddit, index) => {
                return <SubCard key={index} subreddit={subreddit} />
            })
        }</div>
    );
}