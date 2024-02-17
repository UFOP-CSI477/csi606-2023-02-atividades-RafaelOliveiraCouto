const getByIdSangues = async(id: string) => {
    const sangues = await fetch(`http://localhost:5000/sangues/${id}`, {cache: "no-store"})
    return sangues.json()
}

export default getByIdSangues