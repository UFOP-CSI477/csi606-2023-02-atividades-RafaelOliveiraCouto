const getAllPessoas = async () => {
    const pessoas = await fetch('http://localhost:5000/pessoas', {cache: 'no-store'})

    return pessoas.json()
}

export default getAllPessoas