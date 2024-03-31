const Notification = ({ message, messageType, setMessage, setMessageType }) => {
  if (message){
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    },3000)
    return(
      <div className={messageType}>
        {message}
      </div>
    )
  }

  return (<></>)
}

export default Notification