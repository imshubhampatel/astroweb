import { firebase } from '../config'
import { getStorage, ref, uploadBytes , getDownloadURL } from "firebase/storage";

const storage = getStorage(firebase, "gs://testastrochrcha.appspot.com");

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
    alert("error");
  }

  return url;
  };

export {uploadDocToStorage , getFile};