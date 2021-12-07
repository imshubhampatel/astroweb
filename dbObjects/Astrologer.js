class Astrologer {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.firstName = data.firstName
    this.secondName = data.secondName
    this.dob = data.dob
    this.address = data.address 
    this.gender = data.gender
    this.experience = data.experience ? Number(data.experience) : 0;
    this.dailyHours = data.dailyHours ? Number(data.dailyHours):0;
    this.profilePic = data.profilePic
    this.about = data.about ? data.about : "Please add some line about you" 

    this.workingwithother = data.workingwithother ? data.workingwithother : "No"
    
    this.profileComplete = data.profileComplete ? data.profileComplete : false;
    // // Meeting Pricing
    this.priceChat = data.priceChat ?  data.priceChat : null
    this.priceVideo = data.priceVideo ?data.priceVideo:null
    this.priceVoice = data.priceVoice? data.priceVoice: null
    
    // // Meeting History
    this.chatSeconds = data.chatSeconds ? data.chatSeconds :0
    this.videoSeconds = data.videoSeconds ?data.videoSeconds:0
    this.voiceSeconds = data.voiceSeconds  ?data.voiceSeconds : 0
    
    // // Expertise 
    this.expertise = data.expertise ? data.expertise : {}
    this.reviews = data.reviews ?{
      ...data.reviews
    } : {}
    
    this.languages = data.languages ? {
      ...data.languages
    } : {}
    this.tnc = data.tnc ? data.tnc : true
    
    // //Rating & Reviews
    this.rating = data.rating ? data.rating : 0
    this.ratingCount = data.ratingCount ? data.ratingCount : 0

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
      secondName: data.secondName,
      dob: data.dob,
      address: data.address,
      gender: data.gender,
      experience: data.experience,
      dailyHours : data.dailyHours,
      profilePic: data.profilePic,
      about : data.about,
      workingwithother : data.workingwithother,

      profileComplete: data.profileComplete,
      // Meeting Pricing
      priceChat: data.priceChat,
      priceVideo: data.priceVideo,
      priceVoice: data.priceVoice,

      // Meeting History
      chatSeconds: data.chatSeconds,
      videoSeconds: data.videoSeconds,
      voiceSeconds: data.voiceSeconds,

      // Expertise
      expertise: data.expertise,

      //Rating & Reviews
      rating: data.rating,
      ratingCount: data.ratingCount,

      // verification
      status: data.status,
      

      // Reviews 
      reviews: data.reviews,
      languages: data.languages,    
      tnc : data.tnc,
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
