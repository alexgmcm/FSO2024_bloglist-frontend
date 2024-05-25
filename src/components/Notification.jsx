import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext.js';
import { Alert } from 'react-bootstrap';

const Notification = () => {
    const notification = useContext(NotificationContext)

    console.log("rendering notification", notification)
    const {message, messageType} = notification.notificationState
    if (message) {
        
        return <Alert  variant={messageType}>{message}</Alert>
    }

    return <></>
}

export default Notification
