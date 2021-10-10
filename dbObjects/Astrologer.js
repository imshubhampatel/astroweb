class Astrologer {
  constructor(data) {
    this.id = data.id
     this.email = data.email
    this.phoneNumber = data.phoneNumber
    this.firstName = data.firstName
     this.secondName = data.secondName ? data.secondName : null
    //  this.address = data.address 
    // this.gender = data.gender
    // this.experience = data.experience
    
    // this.profileComplete = data.profileComplete
    // // Meeting Pricing
    //  this.priceChat = data.priceChat
    //  this.priceVideo = data.priceVideo
    // this.priceVoice = data.priceVoice
    
    // // Meeting History
    // this.chatSeconds = data.chatSeconds 
    // this.videoSeconds  = data.videoSeconds 
    // this.voiceSeconds = data.voiceSeconds 
    
    // // Expertise 
    //  this.vedic = data.vedicAstrology
    //  this.tarotCardReading = data.tarotCardReading
    //  this.numerlogy = data.numerlogy
    //  this.matchMaking = data.matchMaking
    // this.tnc = data.tnc
    
    // //Rating & Reviews
    // this.rating = data.rating 
    // this.ratingCount = data.ratingCount

    // Enabled / Disabled 

  }
  toString() {
    return this.firstName + ", " + this.secondName + ", " + this.country;
  }
}

// Firestore data converter
const astrologerConverter = {
  toFirestore: (data) => {
    return {
      id: data.id,
      email: data.email,
      phoneNumber: data.phoneNumber,
      firstName: data.firstName,
      secondName: data.secondName,
      // address: data.address,
      // gender: data.gender,
      // experience: data.experience,

      // profileComplete: data.profileComplete ,
      // // Meeting Pricing
      // priceChat: data.priceChat ? data.priceChat :100 ,
      // priceVideo: data.priceVideo,
      // priceVoice: data.priceVoice,

      // // Meeting History
      // chatSeconds: data.chatSeconds,
      // videoSeconds: data.videoSeconds,
      // voiceSeconds: data.voiceSeconds,

      // // Expertise
      // vedic: data.vedicAstrology,
      // tarotCardReading: data.tarotCardReading,
      // numerlogy: data.numerlogy,
      // matchMaking: data.matchMaking,
      // tnc: data.tnc,

      // //Rating & Reviews
      // rating: data.rating,
      // ratingCount: data.ratingCount,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Astrologer(data);
  },
};

export { astrologerConverter, Astrologer };
