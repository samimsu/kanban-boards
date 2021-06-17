/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function UploadImageWidget(id: string, callback: (url: string) => void): void {
  // create the Cloudinary upload widget
  window.cloudinary
    .createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
      },
      (error: any, { event, info }: any) => {
        if (event === 'success') {
          callback(info.secure_url);
        }
      },
    )
    .open(); // opens upload dialog after widget creation
}
