import ImageKit from 'imagekit';
import dotenv from 'dotenv';

var imagekit  = new ImageKit({
    publicKey : process.env.IMAGEKT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKT_URL
})

export default imagekit;