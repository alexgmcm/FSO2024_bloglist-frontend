const Notification = ({ notificationState }) => {
    const {message, messageType} = notificationState
    if (message) {
        
        return <div className={messageType}>{message}</div>
    }

    return <></>
}

export default Notification
