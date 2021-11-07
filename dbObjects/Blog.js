import { Timestamp } from "firebase/firestore";

class Blog {
  constructor(data) {
    this.id = data.id;
    this.author = data.author;
    this.commentCount = data.commentCount;
    this.description = data.description;
    this.readDuration = data.readDuration;
    this.time = new Timestamp(data.time).toDate();
    this.title = data.title;
    this.visible = data.visible;
    this.comment = data.comment ? data.comment : [];
  }
  toString() {
    return this.commentCount + ", " + this.description + ", " + this.author;
  }
}

// Firestore data converter
const blogConverter = {
  toFirestore: (data) => {
    return {
      id: data.id,
      author: data.author,
      commentCount: data.commentCount,
      description: data.description,
      readDuration: data.readDuration,
      time: data.time,
      visible: data.visible,
      title: data.title,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Blog(data);
  },
};
const blogStatus = {
  CREATED: "created",
  REMOVED: "removed"
};
export { blogConverter, Blog, blogStatus };
