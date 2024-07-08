export interface CommentData {
    id : number;
    postId : number;
    content: string;
    writerId : number;
    writerNickname:string;
    writerProfile:string;
    likeCount : number;
    liked : boolean;
    createDate: number[]|Date;
    modifyDate: number[]|Date;

}