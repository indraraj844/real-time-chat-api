
var socket = io('http://localhost:8000/', { transports: ['websocket', 'polling', 'flashsocket'] });

const form =document.querySelector(".input1")
const massageInp =document.querySelector(".massageInp")
const container =document.querySelector(".container")

var audio =new Audio('ting.mp3')

const append=(massage,position) =>{
    const massageElement=document.createElement('div');
    massageElement.innerHTML=massage;
    massageElement.classList.add('massage');
    massageElement.classList.add(position);
    container.append(massageElement);
    if(position=='left')
    {
        audio.play();
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const massage=massageInp.value;
    append( `You: ${massage}`,'right')
    socket.emit('send',massage);
    massageInp.value='';
})
const name1 =prompt("enter you name to join")
socket.emit('new-user-joined', name1);

socket.on('user-joined',name1=>{
    append( `${name1} joined the chat`,'right')
})
socket.on('receive',data =>{
    append( `${data.name}:${data.massage}`,'left');
})
socket.on('left',data =>{
    append( `${data} left`,'right');
})

