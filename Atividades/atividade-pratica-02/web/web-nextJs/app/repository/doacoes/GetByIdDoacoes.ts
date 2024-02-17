const getByIdDoacoes = async(id: string) => {
    const doacao = await fetch(`http://localhost:5000/doacoes/${id}`, {cache: "no-store"})
    return doacao.json()
}

export default getByIdDoacoes