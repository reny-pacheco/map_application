const form = document.querySelector('form')






const submitForm = async (e) => {
    e.preventDefault()
    const email = form.email.value
    const password = form.password.value
    const error = document.querySelector('.error')


    try {
        const res = await fetch('/login',{
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: { 'Content-Type' : 'application/json' }
        })
        const data = await res.json()
        // console.log(data)
        if (data.errors) {
            console.log(data.errors)

            error.textContent = data.errors

        }
        if (data.user) {
            location.assign('/')
        }
    } catch (err) {
        console.log(err)
    }

}
form.addEventListener('submit', submitForm)