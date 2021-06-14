import { User, UpdateUserApiData } from '../../interface/User';
import { FetchOptions } from '../../interface/FetchOptions';

const updateUser = async (user: User): Promise<UpdateUserApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user }),
    credentials: 'include',
  };
  return await fetch(`/users/update`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateUser;
