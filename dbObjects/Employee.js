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
    this.permissions = data.permissions
      ? data.permissions
      : {
          "astro_management": false,
          "emp_management": false,
          "wallet_management": false,
          "user_management": false,
          "broadcast_management": false,
          "store" : false,
        };
    
    this.phoneNumber = data.phoneNumber;
    this.verificationId = data.verificationId;
    this.pancardNumber = data.pancardNumber;
    this.pancardLink = data.pancardLink;

    // Enabled / Disabled
      this.enabled = data.enabled ? data.enabled : false;
      
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
      profilePic: data.profilePic,

      // verification
      enabled: data.enabled,
      permissions : data.permissions,

      pancardLink: data.pancardLink,
      phoneNumber: data.phoneNumber,
      verificationId: data.verificationId,
      pancardNumber: data.pancardNumber,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Employee(data);
  },
};

const EmployeePermissions = {
 ASTRO_MANAGEMENT :"astro_management",
 EMP_MANAGEMENT :"emp_management",
 WALLET_MANAGEMENT :"wallet_management",
 USER_MANAGEMENT :"user_management",
 BROADCAST_MANAGEMENT :"broadcast_management",
 STORE_MANAGEMENT :"store" ,
 NONE : null,
}
export { employeeConverter, Employee ,EmployeePermissions };
