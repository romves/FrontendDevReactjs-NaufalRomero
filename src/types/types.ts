export type Restaurant = {
    id: string;
    name: string;
    description: string;
    city: string;
    address: string;
    pictureId: string;
    categories: {
      name: string;
    }[];
    menus: {
      drinks?: { name: string }[];
      foods?: { name: string }[];
    };
    rating: number;
    customerReviews: {
      date: string;
      name: string;
      review: string;
    }[];
    isOpen: string;
    expenseLevel: number;
  };