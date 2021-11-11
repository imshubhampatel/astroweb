class TestResult {
    constructor(data) {
      this.question_count = data ?data.question_count:0 ;
      this.response = data ? data.response : [];
      this.score = data ? data.score : 0;
    }
    toString() {
        return this.question_count;
    }
  }
  
  // Firestore data converter
  const testResultConverter = {
    toFirestore: (data) => {
      return {
        question_count: data.question_count,
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
  