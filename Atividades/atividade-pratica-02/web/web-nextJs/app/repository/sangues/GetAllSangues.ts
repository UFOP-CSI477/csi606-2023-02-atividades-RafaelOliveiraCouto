const getAllSangues = async () => {
    const sangues = await fetch('http://localhost:5000/sangues', {cache: 'no-store'})

    return sangues.json()
}

export default getAllSangues