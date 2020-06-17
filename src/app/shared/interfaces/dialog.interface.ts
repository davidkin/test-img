import { IPost } from './post.interface';

export interface IDialogData {
    posts?: IPost[];
    post?: IPost;
    status: string;
}
