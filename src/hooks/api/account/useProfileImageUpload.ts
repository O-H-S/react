
import { getProfileUploadUrl } from "@/api/user/getProfileUploadUrl";
import type { ProfileUrlResponse } from "@/api/user/getProfileUploadUrl";

export const useProfileImageUpload = () => {
    const upload = async (file : File) => {
        let response = await getProfileUploadUrl("me", file)
            .then(result=>{
                console.log("get url:", result);
                return result;
            });
        
        const uploadResponse = await fetch(response.presignedUrl, {
            method: 'PUT', // PUT 메소드 사용
            headers: {
                'Content-Type': file.type, // 파일 타입 지정
            },
            body: file // 업로드할 파일
        }).then(result => {
            console.log("s3 :", result);

        }).catch(error =>{
            console.log("s3 failed :", error);
            throw error;
        });

        return response.profileKey;        
    };
    

    return upload;
};