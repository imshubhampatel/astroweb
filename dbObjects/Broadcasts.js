class Broadcast {
  constructor(data) {
    this.id = data.id;
    this.author = data.author;
    this.commentCount = data.commentCount;
    this.description = data.description;
    this.readDuration = data.readDuration;
    this.time = data.time;
    this.title = data.title;
    this.comment = data.comment ? data.comment : [];
  }
  toString() {
    return this.commentCount + ", " + this.description + ", " + this.author;
  }
}

// Firestore data converter
const broadcastConverter = {
  toFirestore: (data) => {
    return {
      id: data.id,
      author: data.author,
      commentCount: data.commentCount,
      description: data.description,
      readDuration: data.readDuration,
      time: data.time,
      title: data.title,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Broadcast(data);
  },
};
const broadcastStatus = {
  SCHEDULED: "scheduled",
  ONGOING: "live",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
};
export { broadcastConverter, Broadcast, broadcastStatus };
