import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext.js';

const Notification = () => {
    const notification = useContext(NotificationContext)

    console.log("rendering notification", notification)
    const {message, messageType} = notification.notificationState
    if (message) {
        
        return <div className={messageType}>{message}</div>
    }

    return <></>
}

export default Notification
