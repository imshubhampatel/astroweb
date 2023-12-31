class Astrologer {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.firstName = data.firstName
    this.secondName = data.secondName
    this.dob = data.dob
    this.address = data.address 
    this.currentStatus = data.currentStatus ? data.currentStatus : "Offline" 
    this.gender = data.gender
    this.experience = data.experience ? Number(data.experience) : 0;
    this.dailyHours = data.dailyHours ? Number(data.dailyHours):0;
    this.profilePic = data.profilePic
    this.profilePicLink = data.profilePicLink ? data.profilePicLink: ""
    this.about = data.about ? data.about : "Please add some line about you" 
    this.phoneNumber = data.phoneNumber 

    this.workingwithother = data.workingwithother ? data.workingwithother : false
    
    this.profileComplete = data.profileComplete ? data.profileComplete : false;
    // // Meeting Pricing
    this.pricingCategory = data.pricingCategory ? data.pricingCategory : "base";
    this.priceChat = data.priceChat ?  parseInt(data.priceChat)  : 0
    this.priceVideo = data.priceVideo ?  parseInt(data.priceVideo):0
    this.priceVoice = data.priceVoice?  parseInt(data.priceVoice): 0
    this.liveChatPrice = data.liveChatPrice?  parseInt(data.liveChatPrice): 0
    this.currentDiscount = data.currentDiscount?  parseInt(data.currentDiscount): 0
    
    // // Meeting History
    this.chatSeconds = data.chatSeconds ? data.chatSeconds :0
    this.videoSeconds = data.videoSeconds ?data.videoSeconds:0
    this.voiceSeconds = data.voiceSeconds  ?data.voiceSeconds : 0
   // // accept perm
   this.acceptChat = data.acceptChat ? data.acceptChat :true
   this.acceptVoice = data.acceptVoice ?data.acceptVoice:true
   this.acceptVideo = data.acceptVideo  ?data.acceptVideo : true
   
    // // Expertise 
    this.expertise = data.expertise ? data.expertise : {}
    
    this.languages = data.languages ? {
      ...data.languages
    } : {}
    this.tnc = data.tnc ? data.tnc : true
    this.shareLink = data.shareLink ? data.shareLink : ""
    
    // //Rating & Reviews
    this.rating = data.rating ? data.rating : 0
    this.ratingCount = data.ratingCount ? data.ratingCount : 0
    this.enabled = data.enabled ? data.enabled : false
    this.meetingCount = data.meetingCount ? data.meetingCount : 0

    // Enabled / Disabled 

    this.status = data.status ? data.status : { state : astrologerStatus.UNVERIFIED , remark : "None" }

  }
  toString() {
    return this.firstName + ", " + this.secondName + ", " + this.email;
  }
}

// Firestore data converter
const astrologerConverter = {
  toFirestore: (data) => {
    return {
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      secondName: data.secondName ? data.secondName : "",
      dob: data.dob,
      address: data.address,
      gender: data.gender,
      experience: data.experience,
      dailyHours : data.dailyHours,
      profilePic: data.profilePic,
      profilePicLink: data.profilePicLink,
      about : data.about,
      currentStatus : data.currentStatus,
      workingwithother : data.workingwithother,
      phoneNumber : data.phoneNumber,
      profileComplete: data.profileComplete ? data.profileComplete: false ,
      // Meeting Pricing
      pricingCategory : data.pricingCategory,
      priceChat: data.priceChat,
      priceVideo: data.priceVideo,
      priceVoice: data.priceVoice,
      liveChatPrice: data.liveChatPrice,
      currentDiscount: data.currentDiscount,

      // Meeting History
      chatSeconds: data.chatSeconds,
      videoSeconds: data.videoSeconds,
      voiceSeconds: data.voiceSeconds,

      // Expertise
      expertise: data.expertise,

      //Rating & Reviews
      rating: data.rating,
      enabled: data.enabled,
      ratingCount: data.ratingCount,
      // verification
      status: data.status,
      // Reviews 
      languages: data.languages,    
      tnc : data.tnc,
      shareLink : data.shareLink,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Astrologer(data);
  },
};

const astrologerStatus = {
  UNVERIFIED : 'unverified',
  VERIFIED : 'verified',
  REJECTED : 'rejected',
}
export { astrologerConverter, Astrologer ,astrologerStatus };
