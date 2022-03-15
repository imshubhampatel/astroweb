import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  doc,
    setDoc,
  updateDoc,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { firebase, auth } from "../../config";
import { pricingCategory} from '../../dbObjects/PricingCategory'


const db = getFirestore(firebase);

 async function getAllMeeting(uuid) {
   const astros = collection(db, "meetings");
   const querySnapshot = await getDocs(
     query(astros, where("astrologerUid", "==", uuid),orderBy("scheduledTime","desc"))
   );
   let data = querySnapshot.docs.map((doc) => {
     return { id: doc.id, data: doc.data() };
   });
 
   return data;
 }
 async function getAllWalletTransactions(uuid) {
   const astros = query(
     collection(db, "astrologer", uuid, "astologer_wallet_transaction"),orderBy("date","desc")
   );
   const querySnapshot = await getDocs(astros);
   let data = querySnapshot.docs.map((doc) => {
     return { id: doc.id, data: doc.data() };
   });
   return data;
 }
  async function getAllReviews(uuid) {
    const astros = query(
      collection(db, "astrologer", uuid, "astrologer_reviews")
      ,orderBy("date","desc"));
    const querySnapshot = await getDocs(astros);
    let data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, data: doc.data() };
    });

    return data;
  }
  async function getAppDetails() {
    const astros = collection(db, "app_details");
    var querySnapshot = await getDocs(
      collection(astros, "astrologerDetails/pricing_categories")
    );
    let data = querySnapshot.docs.map((doc) => {
      return new pricingCategory({ id: doc.id, ...doc.data() });
    });

    return data;
  }
async function changePricingCategory(uid, PricingCategory) {
    const ref = doc(db, "astrologer", String(uid));
    await updateDoc(ref, { pricingCategory: PricingCategory });
}
export {
  getAllMeeting,
  getAllWalletTransactions,
  getAllReviews,
  getAppDetails,
  changePricingCategory,
};
