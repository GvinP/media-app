export interface IPost {
  id: string;
  createdAt: string;
  image?: string;
  images?: string[];
  video?: string;
  description: string;
  user?: IUser;
  nofComments?: number;
  nofLikes?: number;
  comments?: IComment[];
}

export interface IComment {
  id: string;
  comment: string;
  user: IUser;
}

export interface IUser {
  id: string;
  username: string;
  image?: string;
}
