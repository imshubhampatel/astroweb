class Order {
    constructor(data) {
      this.id = data.id;
      this.amount = data.amount;
      this.itemCount = data.itemCount;
      this.user = data.user;
      this.status = data.status;
      this.timestamp = data.timestamp;
      this.address = data.address;
      this.items = data.items ? data.items :[]
    
    }
    toString() {
      return this.user + ", " + this.user + ", " + this.amount;
    }
  }
  
  // Firestore data converter
  const OrderConverter = {
    toFirestore: (data) => {
      return {
        id: data.id,
        amount: data.amount,
        user: data.user,
        itemCount: data.itemCount,
        status: data.status,
     
        address: data.address,
        timestamp: data.timestamp,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Order(data);
    },
  };
  
  const OrderStatus = {
      CREATED : "created",
      SHIPPED : "shipped",
      DELIVERED : "delivered",
      CANCELLED : "cancelled",

  }
  export { OrderConverter, Order ,OrderStatus};
  