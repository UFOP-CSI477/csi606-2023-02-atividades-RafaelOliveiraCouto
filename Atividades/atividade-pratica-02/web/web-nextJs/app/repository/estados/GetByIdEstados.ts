const getByIdEstados = async(id: string) => {
    const estados = await fetch(`http://localhost:5000/estados/${id}`, {cache: "no-store"})
    return estados.json()
}

export default getByIdEstados