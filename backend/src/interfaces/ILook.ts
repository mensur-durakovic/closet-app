export interface ILook {
  id: number;
  createdAt: Date;
  name: string;
  updatedAt: Date;
}

export interface ILookInputDTO {
  name: string;
}

export interface ILookOutputDTO {
  id: number;
  name: string;
}
