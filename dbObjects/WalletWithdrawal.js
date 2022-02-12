class WalletWithdrawal {
  constructor(data) {
    this.id = data.id;
    this.astrologer = data.astrologer;
    this.status = data.status;
    this.amount = data.amount;
    this.time = data.time;
    this.approvedBy = data.approvedBy ? data.approvedBy : "";
    this.remark = data.remark;
     this.approvedAmount= data.approvedAmount ?  data.approvedAmount : 0;
      this.type = data.type;
      this.transactionId = data.transactionId;
   
  }
  toString() {
    return this.status + ", " + this.amount + ", " + this.astrologer;
  }
}

// Firestore data converter
const walletWithdrawalConverter = {
  toFirestore: (data) => {
    return {
      astrologer: data.astrologer,
      status: data.status,
      amount: data.amount,
      approvedAmount: data.approvedAmount,
      type: data.type,
      transactionId : data.transactionId,
      approvedBy: data.approvedBy,
      time: data.time,
      remark : data.remark,

    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new WalletWithdrawal(data);
  },
};

const WalletWithdrawalStatus = {
  INITIATED: "initiated",
  APPROVED: "approved",
  REJECTED: "rejected",
  COMPLETED: "completed",
  FAILED : "failed",
};
const WalletWithdrawalType = {
  manual: "manual",
  automated: "automated",
 };
export { walletWithdrawalConverter, WalletWithdrawal, WalletWithdrawalStatus ,WalletWithdrawalType};
