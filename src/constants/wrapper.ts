import { BoardData} from "@/types/board";



const boardWrapDataByAlias: Record<string|number, Partial<BoardData>> = {
    "problem": {
        title : "문제 토론", 
        description : "문제에 대한 모든 토론들을 모아놓은 게시판입니다.",
    }
};

export const BOARD_WRAPPER = (id : string|number , target: BoardData): BoardData => {

    
    const data = boardWrapDataByAlias[id];
    console.log(id, target);
    // 일부만 변경
    if (data) {
        const updatedData = {
            
            ...target,
            ...data
        };
        //boardWrapDataByAlias[target.id] = updatedData;
        console.log(updatedData);
        return updatedData;
    } else {
        return target;
    }
};
