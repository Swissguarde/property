interface IProperty {
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: {
    nightly?: number;
    weekly: number;
    monthly?: number;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PropertyData {
  _id?: string;
  type: string;
  name: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: string;
  baths: string;
  square_feet: string;
  amenities: string[];
  rates: {
    weekly: string;
    monthly: string;
    nightly: string;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images?: string[];
  owner?: string;
}

interface IMessage {
  _id: string;
  sender: {
    _id: string;
    username: string;
  };
  recipient: string;
  property: {
    _id: string;
    name: string;
  };
  name: string;
  email: string;
  phone: string;
  body: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
