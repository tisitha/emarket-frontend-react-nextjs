declare module '*.css';

declare global {
    type productResponseType = {
        productResponseDtoList: product[];
        totalElement: 0;
        pageCount: 0;
        isLast: true;
      };
      
      type productType = {
        id: string;
      
        vendorProfile: any;
      
        name: string;
      
        imgUrl: string;
      
        description: string;
      
        price: number;
      
        deal: number;
      
        cod: boolean;
      
        freeDelivery: boolean;
      
        brand: string;
      
        category: any;
      
        reviews: any;
      
        avgRatings: number;
      
        province: any;
      
        warranty: any;
      
        questions: any;
      
        cartItems: any;
      
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
  }
  
  export {};