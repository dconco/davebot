const Form = document.querySelector('form')
const MessageWrapper = document.getElementById('message-wrapper')

DisableButton()

const Input = document.getElementById('input')

Input.addEventListener('input', () => {
    if (Input.value != ('' | null | undefined)) {
        EnableButton();
    } else {
        DisableButton()
    }
})

Form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (Input.value == ('' | null | undefined)) {
        alert('You haven\'t written any message!')
        return;
    } else {
        var input_value = Input.value
        Input.value = ""
    }

    // create user message container
    const UserMsgDiv = document.createElement('div')
    const UserMsg = document.createElement('span')
    const TextNode = document.createTextNode(input_value)
    const BrElem = document.createElement('br')
    const SmallTimeElem = document.createElement('small')

    // add classes to the created elements
    UserMsgDiv.classList.add('user_msg')
    UserMsg.classList.add('user_message')
    SmallTimeElem.classList.add('msg_time')

    let date = new Date()
    let hour = date.getHours()
    let mins = date.getMinutes()

    // if hours is in the afternoon
    if (hour >= 12 && hour < 24) {
        hour = hour - 12
        var meridian = 'pm'
    } else {
        var meridian = 'am'
    }

    // if hours is less than 10
    if (hour < 10) {
        hour = '0' + hour
    }

    // if minutes is less than 10
    if (mins < 10) {
        mins = '0' + mins
    }

    SmallTimeElem.append(hour + ':' + mins + meridian)

    UserMsg.appendChild(TextNode)
    UserMsg.appendChild(BrElem)
    UserMsg.appendChild(SmallTimeElem)

    UserMsgDiv.appendChild(UserMsg)
    MessageWrapper.appendChild(UserMsgDiv)


    // scroll the page to the bottom
    window.scrollTo(0, document.body.scrollHeight)
    SendButton.Disabled()


    // send request to backend
    let request = new Request('http://localhost:8000/server.php')

    let response = fetch(request, {
        method: 'POST',
        body: JSON.stringify({
            message: input_value,
            origin: location.host
        }),
        headers: {
            "Content-Type": "Application/json",
        }
    })

    response.then((res) => {
            if (res.status >= 200 && res.status <= 299) {
                let result = res.json();

                BotMessage(result.data);
            } else {
                BotMessage('An Error Occured!')
            }
        })
        .catch((error) => {
            BotMessage('Error while trying to connect. \nPlease check your internet connection')
            console.log(error)
        })
        .finally(() => {
            SendButton.Enable()
        })
})

// Focus on the input whenever key is pressed
document.addEventListener('keypress', () => {
    const Input = document.getElementById('input')
    Input.focus()
})

// Disable Button function
function DisableButton() {
    const Button = document.getElementById('send-btn')

    Button.disabled = true
    Button.style.cursor = 'not-allowed'
    Button.style.background = '#4f9fb5'
}

// Enable Button Function
function EnableButton() {
    const Button = document.getElementById('send-btn')

    Button.disabled = false
    Button.style.cursor = 'cursor'
    Button.style.background = '#2ec6ee'
}

// Enable or disable Button and loader
const SendButton = {
    Button: document.getElementById('send-btn'),
    Icon: document.getElementById('send-icon'),

    Disabled() {
        this.Icon.removeAttribute('icon')
        this.Icon.setAttribute('icon', 'eos-icons:three-dots-loading')

        this.Button.disabled = true
        this.Button.style.fontSize = '45px'
        this.Button.style.cursor = 'not-allowed'
        this.Button.style.background = '#4f9fb5'
    },

    Enable() {
        this.Icon.removeAttribute('icon')
        this.Icon.setAttribute('icon', 'fa-solid:paper-plane')

        this.Button.disabled = false
        this.Button.style.fontSize = '20px'
        this.Button.style.cursor = 'pointer'
        this.Button.style.background = '#2ec6ee'
    }
}

// Add Bot Message
function BotMessage(message) {
    if (message == '' || message == null || message == undefined) {
        return false;
    } else {

        // create user message container
        const BotMsgDiv = document.createElement('div')
        const BotMsg = document.createElement('span')
        const TextNode = document.createTextNode(message)

        // create new Bot Image
        const BotImage = new Image()
        BotImage.src = 'img/logo.png'
        BotImage.draggable = false
        BotImage.alt = 'DaveBot Icon'

        // add classes to the created elements
        BotMsgDiv.classList.add('bot_msg')
        BotImage.classList.add('bot_msg')
        BotMsg.classList.add('bot_message')

        BotMsg.appendChild(TextNode)

        BotMsgDiv.appendChild(BotImage)
        BotMsgDiv.appendChild(BotMsg)
        MessageWrapper.appendChild(BotMsgDiv)


        // scroll the page to the bottom
        window.scrollTo(0, document.body.scrollHeight)
        SendButton.Disabled()
    }
}