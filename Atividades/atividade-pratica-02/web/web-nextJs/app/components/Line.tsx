interface LineInterface{
    id: number
    description: string
}

export default function Line( {id, description} : LineInterface){
    // Destract const {id, description} = props

    return(
        <div className="flex">
            <div className="flex-auto">
                {id}
            </div>

            <div className="flex-auto">
                {description}
            </div>
        </div>
    )
}