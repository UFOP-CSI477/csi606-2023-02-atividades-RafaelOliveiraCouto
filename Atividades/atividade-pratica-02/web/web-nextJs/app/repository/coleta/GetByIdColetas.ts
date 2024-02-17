const getByIdColetas = async(id: string) => {
    const coleta = await fetch(`http://localhost:5000/coletas/${id}`, {cache: "no-store"})
    return coleta.json()
}

export default getByIdColetas