class TestResult {
    constructor(data) {
      this.questionCount = data ?data.questionCount:0 ;
      this.response = data ? data.response : [];
      this.score = data ? data.score : 0;
    }
    toString() {
        return this.questionCount;
    }
  }
  
  // Firestore data converter
  const testResultConverter = {
    toFirestore: (data) => {
      return {
        questionCount: data.questionCount,
        response: data.response,
        score: data.score,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new TestResult(data);
    },
  };
  
  export { testResultConverter, TestResult };
  