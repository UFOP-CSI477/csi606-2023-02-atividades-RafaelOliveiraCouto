const getByIdPessoas = async(id: string) => {
    const pessoa = await fetch(`http://localhost:5000/pessoas/${id}`, {cache: "no-store"})
    return pessoa.json()
}

export default getByIdPessoas