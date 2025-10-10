declare global {
  type productResponseType = {
    productResponseDtoList: productType[];
    totalElement: 0;
    pageCount: 0;
    isLast: boolean;
  };

  type questionResponseType = {
    questionResponseDtoList: questionType[];
    totalElement: 0;
    pageCount: 0;
    isLast: boolean;
  };

  type reviewResponseType = {
    reviewResponseDtoList: reviewType[];
    totalElement: 0;
    pageCount: 0;
    isLast: boolean;
  };

  type productType = {
    id: string;

    vendorProfile: vendorProfileType;

    name: string;

    imgUrl: string;

    description: string;

    price: number;

    deal: number;

    cod: boolean;

    freeDelivery: boolean;

    brand: string;

    category: categoryType;

    avgRatings: number;

    province: provinceType;

    warranty: warrantyType;

    quantity: number;
  };

  type categoryType = {
    id: number;
    name: string;
  };

  type provinceType = {
    id: number;
    name: string;
  };

  type warrantyType = {
    id: number;
    name: string;
  };

  type vendorProfileType = {
    id: string;
    businessName: string;
  };

  type reviewType = {
    id: number;
    body: string;
    rate: number;
    date: string;
    user: userType;
    edited: boolean;
    product: productType;
  };

  type questionType = {
    id: number;
    question: string;
    answer: string;
    user: userType;
    date: string;
    product: string;
  };

  type userType = {
    id: string;
    fname: string;
    lname: string;
    email: string;
  };

  type option = {
    name: string;
    href: string;
  };
}

export {};
