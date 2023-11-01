const Form = document.querySelector('form');
const MessageWrapper = document.getElementById('message-wrapper');

Form.addEventListener('submit', (e) => {
    e.preventDefault()
    const Input = document.getElementById('input')

    if (Input.value == ('' | null | undefined)) {
        alert('You haven\'t written any message!')
        return;
    }

    // create user message container
    const UserMsgDiv = document.createElement('div')
    const UserMsg = document.createElement('span')
    const TextNode = document.createTextNode(Input.value)

    // add classes to the created elements
    UserMsgDiv.classList.add('user_msg')
    UserMsg.classList.add('user_message')


    UserMsg.appendChild(TextNode);
    alert(UserMsg.innerHTML)

})

document.addEventListener('keypress', () => {
    const Input = document.getElementById('input');
    Input.focus()
})