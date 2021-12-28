import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  doc,setDoc,
  addDoc,
} from "firebase/firestore";
import { firebase,auth } from "../../config";
import {Order ,OrderConverter,OrderStatus} from '../../dbObjects/Order'


const db = getFirestore(firebase);

async function changeOrderStatus(order) {
    const ref = doc(collection(db, "order"),order.id);
    await setDoc(ref,order);  
  }
  async function changeOrderItemStatus(orderId,orderItem) {
    const ref = doc(collection(db, "order/"+orderId+"/items/"),orderItem.id);
    await setDoc(ref,orderItem);  
  }
 async function getAllOrdersBySearchValue(search) {
   let ref = query(
     collection(db, "order"),
     where("status", "==", statusOption),
     where("id", "==", search)
   );
   let querySnapshot = await getDocs(ref);
   let data = new Set();
   querySnapshot.docs.map((doc) => {
     data.add({ id: doc.id, ...doc.data() });
   });
   ref = query(
     collection(db, "order"),
     where("status", "==", statusOption),
     where("user", "==", search)
   );
   querySnapshot = await getDocs(ref);
   querySnapshot.docs.map((doc) => {
     data.add({ id: doc.id, ...doc.data() });
   });
   return Array.from(data);
 }
async function getAllOrdersByDate(statusOption,search) {
  const ref = query(
    collection(db, "order"),
    where("status", "==", statusOption),
    where("timestamp", "==", new Date(Date.parse(search)))
  );
  let querySnapshot = await getDocs(ref);
  let data = querySnapshot.docs.map((doc) => {
    return ({ id: doc.id, ...doc.data() });
  });
  return data;
}

export {
  changeOrderStatus,
  changeOrderItemStatus,
  getAllOrdersBySearchValue,
  getAllOrdersByDate,
};