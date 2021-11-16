class Item {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.available = data.available;
    this.headline = data.headline;
    this.visible = data.visible;
    this.sellingPrice = data.sellingPrice;
    this.mrp = data.mrp;
    this.category = data.category;
    this.photos = data.photos;
  }
  toString() {
    return this.available + ", " + this.available + ", " + this.name;
  }
}

// Firestore data converter
const ItemConverter = {
  toFirestore: (data) => {
    return {
      id: data.id,
      name: data.name,
      available: data.available,
      description: data.description,
      headline: data.headline,
      photos: data.photos,
      category: data.category,
      mrp: data.mrp,
      sellingPrice: data.sellingPrice,
      visible: data.visible,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Item(data);
  },
};

export { ItemConverter, Item };
