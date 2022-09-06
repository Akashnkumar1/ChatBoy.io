let stompClient = null;

function showMessage(message) {
    $("#message-container-table").prepend(`<tr><td><b>${message.name} :</b> ${message.content}</td></tr>`)
}

function connect() {

    let socket = new SockJS("/server1")
    stompClient = Stomp.over(socket)
    stompClient.connect({}, function(frame) {
        console.log("Connected : "+ frame)

        $("#page-top").addClass('d-none')
        $("#chat-room").removeClass('d-none')
        stompClient.subscribe("/topic/return-to", function (response) {
            showMessage(JSON.parse(response.body))
        })
    })
}

function sendMessage() {
    localStorage.setItem("timeStamp", new Date().toUTCString())
    let jsonObj = {
        name : localStorage.getItem("name"),
        email : localStorage.getItem("email"),
        timeStamp : localStorage.getItem("timeStamp"),
        content : $("#message-value").val()
    }
    stompClient.send("/app/message",{}, JSON.stringify(jsonObj))
}

$(document).ready((e)=>{

    $("#login").click(()=>{
        // alert("Logging in...")
        let name = $("#name-value").val()
        let email = $("#email-value").val()
        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        connect();
        $("#name-title").html(`Welcome, <b>${name}! </b>`)
    })
    $("#send-btn").click(()=>{
        sendMessage();
    })
    $("#logout").click(()=>{

        localStorage.removeItem("name")
        localStorage.removeItem("email")
        if(stompClient!==null)
        {
            stompClient.disconnect({}, function(frame) {
                console.log("Disconnected : "+ frame)
            })
            $("#page-top").removeClass('d-none')
            $("#chat-room").addClass('d-none')
            console.log(stompClient)
        }

    })
})