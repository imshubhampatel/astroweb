class Question {
    constructor(data) {
      this.id = data.id;
      this.question = data.question;
      this.type = data.type;
      this.options = data.options;
      this.correctAnswer = data.correctAnswer;
    }
    toString() {
        return this.question;
    }
  }
  
  // Firestore data converter
  const questionConverter = {
    toFirestore: (data) => {
      return {
        id: data.id,
        question: data.question,
        type: data.type,
        options: data.options,
        correctAnswer: data.correctAnswer,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Question(data);
    },
  };
  
  export { questionConverter, Question };
  