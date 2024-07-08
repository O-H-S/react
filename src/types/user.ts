

export interface UserData {
    id : number;
    nickname: string;
    profileImage: string;
    email: string;
    createDate: string; // ISO 8601 날짜 포맷, const dateObject = new Date(userData.createData); 과 같이 사용 가능.
    admin:boolean;
}

export interface UserNotification {
    id : number;
    type : string;
    viewed : boolean;
    timestamp : number[] | Date;
}

export interface ProblemPostNotification extends UserNotification {
    problemId : number;
    problemName : string;
    postId: number;
    postName:string;
    valid : boolean;
}