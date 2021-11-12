import { firebase } from '../config'
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(firebase, "gs://testastrochrcha.appspot.com");

async function uploadDocToStorage({ path, file }) {
    const storageRef = ref(storage, path);
    uploadBytes(storageRef, file).then((snapshot) => {
    }).catch(e=>console.log(e));
  }

export {uploadDocToStorage};