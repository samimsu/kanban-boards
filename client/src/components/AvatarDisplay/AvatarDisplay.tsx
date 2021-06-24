import Avatar from '@material-ui/core/Avatar';
import { User } from '../../interface/User';
import { MouseEvent } from 'react';

interface Props {
  user: User;
  className?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

const AvatarDisplay = ({ user, className, onClick }: Props): JSX.Element => {
  return <Avatar className={className} onClick={onClick} alt={user.email} src={user.profilePicture} />;
};

export default AvatarDisplay;
