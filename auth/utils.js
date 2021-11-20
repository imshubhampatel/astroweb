import { auth, firebase } from "../config";
import {
  getFirestore,
  collection,
  query,
    where,
  deleteDoc,
    getDoc,
  setDoc,
  doc,
} from "firebase/firestore";
const db = getFirestore(firebase)

async function isAdmin(uid) {
  const docRef = doc(db, "security_groups/admin/admin/", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Admin:", docSnap.data());
    return true;
  } else {
    console.log("You are not admin!");
    return false;
  }
}

async function isSubAdmin(uid) {
  const docRef = doc(db, "security_groups/subadmin/subadmin/", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Sub Admin", docSnap.data());
    return true;
  } else {
    console.log("Not a SubAdmin");
    return false;
  }
}

async function isAstrologer(uid) {
  const docRef = doc(db, "security_groups/astrologer/astrologer/", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
}
async function isUser(uid) {
  const docRef = doc(db, "security_groups/user/user/", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
}

async function setAstrologerPerm(uid) {
    const docRef = doc(db, "security_groups/astrologer/astrologer/", uid);
    const docSnap = await setDoc(docRef, { "role": "astrologer" });
    return docSnap;
}

async function setSubadminPerm(uid) {
  const docRef = doc(db, "security_groups/subadmin/subadmin/", uid);
  const docSnap = await setDoc(docRef, { role: "subadmin" });
  return docSnap;
}
async function setUserPerm(uid) {
  const docRef = doc(db, "security_groups/user/user/", uid);
  const docSnap = await setDoc(docRef, { role: "user" });
  return docSnap;
}
async function  removeUserPerm(uid) {
   const response = await deleteDoc(
     doc(db, "security_groups/user/user/", uid)
   );
   return response;
}
async function removeAstrologerPerm(uid) {
    const response = await deleteDoc(doc(db, "security_groups/astrologer/astrologer/", uid));
    return response;
}
async function removeSubadminPerm(uid) {
  const response = await deleteDoc(
    doc(db, "security_groups/subadmin/subadmin/", uid)
  );
  return response;
}
async function getEmp(uid) {
  const docRef = doc(db, "employee", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return getEmp;
  } else {
    return false;
  }

}
export {
  isAdmin,
  isSubAdmin,
  isAstrologer,
  setAstrologerPerm,
  setSubadminPerm,
  removeAstrologerPerm,
  removeSubadminPerm,
  isUser,
  setUserPerm,
  removeUserPerm,
  getEmp
};
