class Astrologer {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.firstName = data.firstName
    this.secondName = data.secondName
    this.dob = data.dob
    this.address = data.address 
    this.gender = data.gender
    this.experience = data.experience ? data.experience : 0;
    this.profilePic = data.profilePic
    
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
     this.vedicAstrology = data.vedicAstrology ? data.vedicAstrology : false;
     this.tarotCardReading = data.tarotCardReading ? data.tarotCardReading:false;
     this.numerlogy = data.numerlogy ? data.numerlogy: false;
     this.matchMaking = data.matchMaking ? data.matchMaking: false
     this.tnc = data.tnc 
    
    // //Rating & Reviews
    this.rating = data.rating ? data.rating : 0
    this.ratingCount = data.ratingCount ? data.ratingCount : 0

    // Enabled / Disabled 
    this.verified = data.verified || false

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
      profilePic: data.profilePic,

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
      vedicAstrology: data.vedicAstrology,
      tarotCardReading: data.tarotCardReading,
      numerlogy: data.numerlogy,
      matchMaking: data.matchMaking,
      tnc: data.tnc,

      //Rating & Reviews
      rating: data.rating,
      ratingCount: data.ratingCount,

      // verification
      verified: data.verified,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Astrologer(data);
  },
};

export { astrologerConverter, Astrologer };
