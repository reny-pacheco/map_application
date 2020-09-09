const form = document.querySelector('form')


const errFirstname = document.querySelector('#err-firstname')
const errUsername = document.querySelector('#err-lastname')
const errEmail = document.querySelector('#err-email')
const errPassword = document.querySelector('#err-password')



const submitForm = async (e) => {
    e.preventDefault()
    const firstname = form.firstname.value
    const lastname = form.lastname.value
    const email = form.email.value
    const password = form.password.value

    errFirstname.textContent = ''
    errUsername.textContent = ''
    errEmail.textContent = ''
    errPassword.textContent = ''

    

    try {
        const res = await fetch('/signup',{
            method: 'POST',
            body: JSON.stringify({ firstname, lastname, email, password}),
            headers: { 'Content-Type' : 'application/json' }
        })
        const data = await res.json()
        console.log(data)
        if (data.errors) {
            const { firstname, lastname, email, password} = data.errors

            errFirstname.textContent = firstname
            errUsername.textContent = lastname
            errEmail.textContent = email
            errPassword.textContent = password
        }
        if (data.user) {
            location.assign('/login')
        }
    } catch (err) {
        console.log(err)
    }

}
form.addEventListener('submit', submitForm)