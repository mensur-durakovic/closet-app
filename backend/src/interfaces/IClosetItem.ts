import ClosetItemCategories from '../constants/closetItemCategories';

export interface IClosetItem {
  id: number;
  category: ClosetItemCategories;
  createdAt: Date;
  name: string;
  imageUrl: string;
  updatedAt: Date;
}

//user can upload image of closet item and later assign category and name
export interface IClosetItemInputDTO {
  imageUrl: string;
}

export interface ILookOutputDTO {
  id: number;
  category: ClosetItemCategories;
  name: string;
  imageUrl: string;
}
