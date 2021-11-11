class Question {
    constructor(data) {
      this.id = data.id;
      this.question = data.question;
      this.type = data.type;
      this.options = data.options;
      this.correctOption = data.correctOption;
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
        correctOption: data.correctOption,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Question(data);
    },
  };
  
  export { questionConverter, Question };
  