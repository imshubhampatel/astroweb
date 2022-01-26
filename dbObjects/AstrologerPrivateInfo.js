class AstrologerPrivateData {
  constructor(data) {
    this.id = data.id;
    this.phoneNumber = data.phoneNumber;
    this.alternativePhoneNumber = data.alternativePhoneNumber?data.alternativePhoneNumber:"";
    this.verificationIdFront = data.verificationIdFront ? data.verificationIdFront  :"";
    this.verificationIdBack = data.verificationIdBack ? data.verificationIdBack: "";
    this.certificationUrl = data.certificationUrl ? data.certificationUrl:""; 
    this.pancardNumber = data.pancardNumber;
    this.walletBalance = data.walletBalance ?  data.walletBalance:0;
    this.earnings = data.earnings ? data.earnings :0;
    this.pancardLink = data.pancardLink;
    this.razorpayId = data.razorpayId ? data.razorpayId : null;
    this.accountInfo = data.accountInfo ? data.accountInfo : {accountNo : "",bank:"",branch:"",ISFC :"",holderName:""};


  }
  toString() {
      return this.pancardNumber;
  }
}

// Firestore data converter
const astrologerPrivateDataConverter = {
  toFirestore: (data) => {
    return {
      id: data.id,
      pancardLink: data.pancardLink,
      phoneNumber: data.phoneNumber,
      certificationUrl: data.certificationUrl,
      alternativePhoneNumber: data.alternativePhoneNumber,
      verificationIdFront: data.verificationIdFront,
      verificationIdBack: data.verificationIdBack,
      pancardNumber: data.pancardNumber,
      accountInfo: data.accountInfo,
      razorpayId: data.razorpayId,
      walletBalance: data.walletBalance,
      earnings: data.earnings,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new AstrologerPrivateData(data);
  },
};

export { astrologerPrivateDataConverter, AstrologerPrivateData };
