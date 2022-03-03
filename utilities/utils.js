import { firebase } from '../config'
import { getStorage, ref, uploadBytes , getDownloadURL } from "firebase/storage";
let id = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
const storage = getStorage(firebase,id);

async function uploadDocToStorage({ path, file }) {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file).then(e=>{

    }).catch(e=>{

    });

  }
  async function uploadDocToStorageWithUrl({ path, file }) {
    const storageRef = ref(storage, path);
    let url = ""
    await uploadBytes(storageRef, file);
    url = await getDownloadURL(storageRef)
    return url;
  }

async function getFile(path) {
  const storageRef = ref(storage, path);
  let url = "/images/loading.svg";
  try {
   url = await getDownloadURL(storageRef);
  }
  catch (e){
    console.log(e)
  }
  return url;
  };

async function deleteDataFromStorage(path) {
  const storageRef = ref(storage, path);
  const response = await deleteObject(storageRef);
  return response;

}

export {uploadDocToStorage , getFile, deleteDataFromStorage,uploadDocToStorageWithUrl};