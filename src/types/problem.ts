
export enum ProblemBookmarkType {
    Unsolved = "Unsolved",
    FailedCompletely = "FailedCompletely",
    TooLong = "TooLong",
    Success = "Success",
    SuccessDifferently = "SuccessDifferently"
}


export interface ProblemData {
    id : number;
    platform: string;
    title: string;
    difficulty: string;
    link: string;
    postCount: number;
    level:number;
    foundDate: number[] | Date; //
    bookmarkType:string|null|ProblemBookmarkType;
}