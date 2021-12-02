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


export {changeOrderStatus,changeOrderItemStatus};