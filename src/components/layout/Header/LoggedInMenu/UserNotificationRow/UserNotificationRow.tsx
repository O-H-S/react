import { UserNotification } from "@/types/user";
import { ProblemPostNotificationRow } from "./ProblemPostNotificationRow";

type UserNotificationRowProps = {
    notification: UserNotification;
};

const DefaultNotificationRow: React.FC<{ notification: UserNotification }> = ({ notification }) => {
    return (
        <div>
            <strong>Notification:</strong> {notification.id}
            <div>Time: {new Date(notification.timestamp as Date).toLocaleString()}</div>
        </div>
    );
};


export const UserNotificationRow: React.FC<UserNotificationRowProps> = ({ notification }) => {
    // 타입 별로 컴포넌트를 매핑하는 객체
    const componentMap: { [key: string]: React.FC<{ notification: any }> } = {
        'default' : DefaultNotificationRow,
        'problemPost': ProblemPostNotificationRow,
    };

    // notification.type에 따라 다른 컴포넌트를 렌더링
    const Component = componentMap[notification.type] || componentMap['default'];

    return <Component notification={notification} />;
};