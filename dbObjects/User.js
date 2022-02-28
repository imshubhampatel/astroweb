class User {
    constructor(data) {
      this.uid = data.uid
      this.email = data.email
      this.field = data.field ? data.field : 0
      this.counter = data.counter ? data.counter : 0
      this.firstName = data.firstName
      this.lastName = data.lastName? data.lastName : ""
      this.dob = data.dob
      this.placeOfBirth = data.placeOfBirth 
      this.profilePhotoLink = data.profilePhotoLink ? data.profilePhotoLink : "" 
      this.walletBalance = data.walletBalance ? data.walletBalance : 0
      this.profilePic = data.profilePic? data.profilePic : "" 
      this.phoneNumber = data.phoneNumber 
      this.enabled = data.enabled ? data.enabled : true  
    }
    toString() {
      return this.firstName + ", " + this.lastName + ", " + this.email;
    }
  }
  
  // Firestore data converter
  const UserConverter = {
    toFirestore: (data) => {
      return {
        uid: data.uid,
        email: data.email,
        counter: data.counter,
        field: data.field,
        firstName: data.firstName,
        lastName: data.lastName ,
        dob: data.dob,
        placeOfBirth: data.placeOfBirth,
        walletBalance: data.walletBalance,
        profilePic: data.profilePic,
        profilePhotoLink : data.profilePhotoLink,
        phoneNumber : data.phoneNumber,
      
  
        // Meeting History
        // chatSeconds: data.chatSeconds,
        // videoSeconds: data.videoSeconds,
        // voiceSeconds: data.voiceSeconds,     
        enabled: data.enabled,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new User(data);
    },
  };

  export { UserConverter, User };
  