import { firebase } from '../config'
import { getStorage, ref, uploadBytes , getDownloadURL } from "firebase/storage";
let id = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
const storage = getStorage(firebase,id);

async function uploadDocToStorage({ path, file }) {
    const storageRef = ref(storage, path);
    uploadBytes(storageRef, file).then((snapshot) => {
    }).catch(e => {});
  }

async function getFile(path) {
  const storageRef = ref(storage, path);
  let url = "";
  try {
   url = await getDownloadURL(storageRef);
  }
  catch {
  }

  return url;
  };

async function deleteDataFromStorage(path) {
  const storageRef = ref(storage, path);
  const response = await deleteObject(storageRef);
  return response;

}

export {uploadDocToStorage , getFile, deleteDataFromStorage};