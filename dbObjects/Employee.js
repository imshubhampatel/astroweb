class Employee {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.firstName;
    this.secondName = data.secondName;
    this.dob = data.dob;
    this.address = data.address;
    this.gender = data.gender;
    this.profilePic = data.profilePic;   
      
    this.phoneNumber = data.phoneNumber;
    this.verificationId = data.verificationId;
    this.pancardNumber = data.pancardNumber;
    this.pancardLink = data.pancardLink;
    this.accountInfo = data.accountInfo
        ? data.accountInfo
        : { accountNo: "", bank: "", branch: "", ISFC: "", holderName: "" };

    // Enabled / Disabled
      this.verified = data.verified ? data.verified : false;
      
      // Permissions
  }
  toString() {
    return this.firstName + ", " + this.secondName + ", " + this.email;
  }
}

// Firestore data converter
const employeeConverter = {
  toFirestore: (data) => {
    return {
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      secondName: data.secondName,
      dob: data.dob,
      address: data.address,
      gender: data.gender,
      experience: data.experience,
      profilePic: data.profilePic,

      // verification
      verified: data.verified,

      pancardLink: data.pancardLink,
      phoneNumber: data.phoneNumber,
      verificationId: data.verificationId,
      pancardNumber: data.pancardNumber,
      accountInfo: data.accountInfo,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Employee(data);
  },
};

export { employeeConverter, Employee };
