const Form = document.querySelector('form')
const MessageWrapper = document.getElementById('message-wrapper')

// Bot First Message
BotMessage('Hello! How can I assist you today?');

DisableButton()

const Input = document.getElementById('input')

Input.addEventListener('input', () => {
    if (Input.value != ('' | null | undefined) && IconType() !== 'LoaderIcon') {
        EnableButton()
    } else {
        DisableButton()
    }
})


// If form is subitted
Form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (Input.value == ('' | null | undefined)) {
        alert('You haven\'t written any message!')
        return
    } else {
        var input_value = Input.value
        Input.value = ""

        UserMessage(input_value)
    }


    const url = 'http://localhost/projects/dave_ai/server.php'

    // Send a POST request
    const response = await axios({
        url: url,
        method: 'POST',
        data: JSON.stringify({
            message: input_value,
            origin: 'http://localhost/'
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    try {
        const result = await response

        if (result.data.status === 'success') {
            BotMessage(result.data.data)
        } else {
            BotMessage('Not able to get message - Response Text: ' + result.statusText)
        }

        // catch any f**king error
    } catch (error) {

        BotMessage('Error while trying to connect. \nPlease check your internet connection')
        console.log(error)

        // finally after response
    } finally {
        // clearTimeout(timeout)
        SendButton.Enable()
    }

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
    Button.style.cursor = 'pointer'
    Button.style.background = '#2ec6ee'
}

function IconType() {
    let icon = document.getElementById('send-icon')
    if (icon.getAttribute('icon') === 'eos-icons:three-dots-loading') {
        return 'LoaderIcon'
    } else {
        return 'SendIcon'
    }
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
    if (message == ('' | null | undefined)) {
        return false
    } else {

        // create user message container
        const BotMsgDiv = document.createElement('div')
        const BotMsg = document.createElement('span')
        // const TextNode = new Text(message)

        // create new Bot Image
        const BotImage = new Image()
        BotImage.src = 'img/logo.png'
        BotImage.draggable = false
        BotImage.alt = 'DaveBot Icon'

        // add classes to the created elements
        BotMsgDiv.classList.add('bot_msg')
        BotImage.classList.add('bot_msg')
        BotMsg.classList.add('bot_message')

        BotMsg.innerHTML = message

        let botInnerMsg = BotMsg.innerHTML
        BotMsg.innerHTML = ''

        BotMsgDiv.appendChild(BotImage)
        BotMsgDiv.appendChild(BotMsg)
        MessageWrapper.appendChild(BotMsgDiv)

        // Write the message to the user fluently
        var i = 0
        var interval = setInterval(() => {
            BotMsg.innerHTML += botInnerMsg[i]

            if (i < botInnerMsg.length - 1) {
                i++
            } else {
                clearInterval(interval)
                return false
            }

            // scroll the page to the bottom
            window.scrollTo(0, document.body.scrollHeight)
        }, 50)
    }
}


// Add User Message to view
function UserMessage(message) {

    // create user message container
    const TextNode = new Text(message)
    const UserMsgDiv = document.createElement('div')
    const UserMsg = document.createElement('span')
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

}