export interface ITag {
  id: number;
  color: string;
  createdAt: Date;
  name: string;
  updatedAt: Date;
}

export interface ITagInputDTO {
  color: string;
  name: string;
}

export interface ITagOutputDTO {
  id: number;
  color: string;
  name: string;
}
