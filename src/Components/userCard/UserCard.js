import { Link } from 'react-router-dom';
import { CardBody } from '../cardBody/CardBody';
import './UserCard.css';

export function UserCard({ user }) {
    console.log(user);
    const imageUrl = user.icon_img?.split('?')[0];

    return (
        <div className='user-card'>
            <div className="img-container">
                <img className='user-icon' src={imageUrl} />
            </div>
            <div className='card-header'>
                <h3 className='main'>
                    <Link to={`${user.display_name_prefixed.split('/')[1]}`}>
                        {user.display_name_prefixed}
                    </Link>
                </h3>
            </div>
            <CardBody className='body' post={user} />
        </div>
    )
}