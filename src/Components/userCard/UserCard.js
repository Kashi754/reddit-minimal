import { Link } from 'react-router-dom';
import './UserCard.css';
import { PostBody } from '../postBody/PostBody';

export function UserCard({ user }) {
    const imageUrl = user.icon_img?.split('?')[0];

    return (
        <div className='user-card'>
            <div className="img-container">
                <img className='user-icon' src={imageUrl} />
            </div>
            <div className='user-card-header card-header'>
                <h3 className='main'>
                    <Link to={`${user.display_name_prefixed.split('/')[1]}`}>
                        {user.display_name_prefixed}
                    </Link>
                </h3>
            </div>
            <PostBody className='body' post={user} />
        </div>
    )
}