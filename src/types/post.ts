export interface PostData {
    id : number;
    boardId: number;
    userId: number;
    userNickname: string;
    userProfile:string;
    title : string;
    content : string;
    modifyDate: number[] | Date; 
    createDate: number[] | Date; 
    viewCount : number;
    likeCount : number;
    commentCount : number;

    normalTags:string[];
    highlightTags : string[];
    systemTags:string[];

    mine: boolean;
    liked: boolean;
}