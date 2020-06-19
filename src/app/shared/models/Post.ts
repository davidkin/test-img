import { IPost } from '../interfaces/post.interface';

export class Post implements IPost {
    public id: number;
    public title: string;
    public img: string;

    constructor({ id, title, img }) {
        this.id = id;
        this.title = title;
        this.img = img;
    }
}
