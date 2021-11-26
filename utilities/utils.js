import { firebase } from '../config'
import { getStorage, ref, uploadBytes , getDownloadURL } from "firebase/storage";
let id = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
const storage = getStorage(firebase,id);

async function uploadDocToStorage({ path, file }) {
    const storageRef = ref(storage, path);
    uploadBytes(storageRef, file).then((snapshot) => {
    }).catch(e => console.log(e));
  }

async function getFile(path) {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    return url;
  };

export {uploadDocToStorage , getFile};