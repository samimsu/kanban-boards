import { Image } from '../../interface/Image';
import { FetchOptions } from '../../interface/FetchOptions';

const uploadImage = async (filename: string): Promise<Image> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename }),
    credentials: 'include',
  };
  return await fetch(`/image/upload`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default uploadImage;
