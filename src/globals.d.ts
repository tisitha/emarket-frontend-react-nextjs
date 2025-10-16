declare global {
  type productResponseType = {
    productResponseDtoList: productType[];
    totalElement: number;
    pageCount: number;
    isLast: boolean;
  };

  type questionResponseType = {
    questionResponseDtoList: questionType[];
    totalElement: number;
    pageCount: number;
    isLast: boolean;
  };

  type reviewResponseType = {
    reviewResponseDtoList: reviewType[];
    totalElement: number;
    pageCount: number;
    isLast: boolean;
  };

  type orderResponseType = {
    orderResponseDtoList: orderType[];
    totalElement: number;
    pageCount: number;
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
    product: productType;
  };

  type userType = {
    id: string;
    fname: string;
    lname: string;
    email: string;
  };

  type sortOptionType = {
    name: string;
    href: string;
  };

  type cartType = {
    cartItems: cartItemType[];
    subTotalCost: number;
    deliveryCost: number;
    totalCost: number;
  };

  type cartItemType = {
    id: string;
    user: userType;
    quantity: number;
    product: productType;
  };

  type paymentMethodType = {
    id: number;
    name: string;
  };

  type errdataType = {
    detail: string;
    errors: {
      field: string;
      message: string;
    }[];
  };

  type accountType = {
    id: string;

    fname: string;

    lname: string;

    email: string;

    phoneNo: string;

    address: string;

    province: provinceType;

    businessName: string;

    bankAccountNo: string;

    bank: string;
  };

  type orderType = {
    id: string;

    userId: string;

    orderStatus: string;

    paymentMethodName: string;

    productId: string;

    productName: string;

    cost: number;

    vendorId: string;

    vendorName: string;

    date: string;

    quantity: number;

    subTotalCost: number;

    deliveryCost: number;

    totalCost: number;
  };
}

export {};
