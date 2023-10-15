import { Link } from 'react-router-dom';
import './UserCard.css';
import { PostBody } from '../postBody/PostBody';

export function UserCard({ user }) {
    const imageUrl = user.icon_img?.split('?')[0];
    const name = user.display_name_prefixed?.split('/')[1] || user.name

    return (
        <div className='user-card'>
            <div className="user-img-container">
                <img className='user-icon' src={imageUrl} alt={name}/>
            </div>
            <div className='user-card-header card-header'>
                <h3 className='user-main'>
                    <Link to={`/users/${name}`}>
                        u/{name}
                    </Link>
                </h3>
            </div>
            <PostBody className='user-body' post={user} />
        </div>
    )
}