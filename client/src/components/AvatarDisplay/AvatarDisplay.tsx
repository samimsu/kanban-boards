import Avatar from '@material-ui/core/Avatar';
import { User } from '../../interface/User';

interface Props {
  loggedIn: boolean;
  user: User;
}

const AvatarDisplay = ({ user }: Props): JSX.Element => {
  return <Avatar alt={user.username} src={user.profilePicture} />;
};

export default AvatarDisplay;
