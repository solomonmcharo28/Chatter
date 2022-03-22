const socket =  io()

socket.on('countUpdated', (count) =>{
    console.log("The count has been updated", count)
    document.getElementById("countVal").innerHTML = count
})

document.getElementById("increment").addEventListener("click", () =>{
    console.log("Clicked")
    socket.emit('increment')
})

document.getElementById("myMessage").addEventListener("submit", (e) =>{
    e.preventDefault()
    const msg = e.target.elements.message.value
    //console.log(msg)
    socket.emit("sendMessage", msg)
    document.getElementById("textMessage").value = ' ';
})

document.getElementById("sendLocation").addEventListener("click", (e) => {
    if(!navigator.geolocation){
        alert("Browser does not support Geolocation");
        return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      socket.emit("sendLocation", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
      })
      
    })
}) 

socket.on('message', (message) =>{
    console.log(message);
})

