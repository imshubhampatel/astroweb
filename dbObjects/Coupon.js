import { Timestamp } from "firebase/firestore";

class Coupon {
  constructor(data) {
    this.id = data.id;
    this.code = data.code;
    this.createdAt = data.createdAt;
    this.maxDiscount = data.maxDiscount;
    this.minPurchase = data.minPurchase;
    // this.time = new Timestamp(data.time).toDate();
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.limit = data.limit ;
    this.discount = data.discount ;
    this.discountType = data.discountType ;
    this.totalUses = data.totalUses ;
    this.title = data.title ;
    this.status = data.status ;
    this.subType = data.subType ;
    this.categoryType = data.categoryType ;
    this.updatedAt = data.updatedAt;
  }
  toString() {
    return this.createAt + ", " + this.maxDiscount + ", " + this.code;
  }
}

// Firestore data converter
const couponConverter = {
  toFirestore: (data) => {
    return {
      id: data.id,
      code: data.code,
      createdAt: data.createdAt,
      maxDiscount: data.maxDiscount,
      minPurchase: data.minPurchase,
      // time: data.time,
      endDate: data.endDate,
      startDate: data.startDate,
      status: data.status,
      title: data.title,
      totalUses: data.totalUses,
      discountType: data.discountType,
      discount: data.discount,
      limit: data.limit,
      categoryType: data.categoryType,
      subType: data.subType,
      updatedAt : data.updatedAt,
      
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Coupon(data);
  },
};

const couponStatus = {
  CREATED: "created",
  EXPIRED: "expired",
  LIVE : "live"
};
const couponSubtype = {
  MEETING : "meeting",
  ITEM : "item"
};

const discountType = {
  AMOUNT : "amount",
  PERCENTAGE :"percentage"
};
export { couponConverter, Coupon ,couponSubtype ,discountType  , couponStatus};