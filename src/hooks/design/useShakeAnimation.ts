import { useState, useCallback } from "react";
import { css, keyframes } from "@emotion/react";

// duration과 offset 인자를 추가하여 떨림 효과를 조정할 수 있는 useShakeAnimation 훅 정의
export function useShakeAnimation(duration = 500, offset = '5px') {
    const [isShaking, setIsShaking] = useState(false);
  
    // 떨림 효과를 위한 keyframes 생성
    const shakeAnimation = keyframes`
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-${offset}); }
        20%, 40%, 60%, 80% { transform: translateX(${offset}); }
    `;

    // 떨림 효과 활성화 및 자동 비활성화 함수
    const triggerShake = useCallback(() => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), duration); // 떨림 효과 지속 시간을 인자로 받음
    }, [duration]);

    // isShaking 상태와 떨림 효과를 적용할 때 사용할 스타일, 그리고 효과를 트리거하는 함수 반환
    const shakeStyle = css({
        animation: isShaking ? `${shakeAnimation} ${duration}ms cubic-bezier(.36,.07,.19,.97) both` : 'none'
    });
  
    return { isShaking, shakeStyle, triggerShake };
}