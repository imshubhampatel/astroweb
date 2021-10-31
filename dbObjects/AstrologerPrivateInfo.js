class AstrologerPrivateData {
  constructor(data) {
    this.id = data.id;
    this.phoneNumber = data.phoneNumber;
    this.verificationIdFront = data.verificationIdFront;
    this.verificationIdBack = data.verificationIdBack;
    this.pancardNumber = data.pancardNumber;
    this.pancardLink = data.pancardLink;
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
      verificationIdFront: data.verificationIdFront,
      verificationIdBack: data.verificationIdBack,
      pancardNumber: data.pancardNumber,
      accountInfo: data.accountInfo,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new AstrologerPrivateData(data);
  },
};

export { astrologerPrivateDataConverter, AstrologerPrivateData };
