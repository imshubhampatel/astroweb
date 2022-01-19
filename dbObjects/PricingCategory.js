import { Timestamp } from "firebase/firestore";

class pricingCategory {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.priceChat = data.priceChat;
    this.priceVoice = data.priceVoice;
    this.priceVideo = data.priceVideo;
    this.lastUpdateTimestamp = data.lastUpdateTimestamp;
    
  }
  toString() {
    return this.priceChat + ", " + this.priceVoice + ", " + this.name;
  }
}

// Firestore data converter
const pricingCategoryConverter = {
  toFirestore: (data) => {
    return {
      id: data.id,
      name: data.name,
      priceChat: data.priceChat,
      priceVoice: data.priceVoice,
      priceVideo: data.priceVideo,
      lastUpdateTimestamp: data.lastUpdateTimestamp,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new pricingCategory(data);
  },
};

export { pricingCategoryConverter, pricingCategory };
