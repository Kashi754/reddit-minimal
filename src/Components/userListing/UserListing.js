import { UserCard } from "../userCard/UserCard";

export function UserListing({ feed }) {
    if(!feed) {
        return;
    }

    return (
        <div className="listing">{
            feed.map((user, index) => {
                return <UserCard key={index} user={user} />
            })
        }</div>
    );
}