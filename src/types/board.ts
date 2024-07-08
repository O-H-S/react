export interface BoardData {
    id : number|string; // 실제 id 정수 값이거나 별칭일 수도 있다.
    title : string;
    description: string;
    postCounts : number;

    writable:boolean;
    writableMethods:string[];
}