class OrderItem {
    constructor(data) {
      this.itemId = data.itemId;
      this.price = data.price;
      this.name = data.name;
      this.quantity = data.quantity;
      this.status = data.status;
      this.itemPhoto = data.itemPhoto;
    
    
    }
    toString() {
      return this.quantity + ", " + this.quantity + ", " + this.status;
    }
  }
  
  // Firestore data converter
  const OrderItemConverter = {
    toFirestore: (data) => {
      return {
        itemId: data.itemId,
        status: data.status,
        quantity: data.quantity,
        name: data.name,
        price: data.price,
        itemPhoto: data.itemPhoto,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new OrderItem(data);
    },
  };
  
  const OrderItemStatus = {
      OUTOFSTOCK : "outofstock",
      AVAILABLE : "available",
      REFUND : "refund",
      CANCEL : "cancel",

  }
  export { OrderItemConverter, OrderItem ,OrderItemStatus};
  