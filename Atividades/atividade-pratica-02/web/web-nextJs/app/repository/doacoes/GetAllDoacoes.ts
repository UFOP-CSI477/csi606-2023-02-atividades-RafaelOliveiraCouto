const getAllDoacoes = async () => {
    const doacoes = await fetch('http://localhost:5000/doar', {cache: 'no-store'})

    return doacoes.json()
}

export default getAllDoacoes