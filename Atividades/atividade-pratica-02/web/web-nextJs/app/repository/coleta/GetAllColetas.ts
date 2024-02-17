const getAllColetas = async () => {
    const coletas = await fetch('http://localhost:5000/coletas', {cache: 'no-store'})

    return coletas.json()
}

export default getAllColetas