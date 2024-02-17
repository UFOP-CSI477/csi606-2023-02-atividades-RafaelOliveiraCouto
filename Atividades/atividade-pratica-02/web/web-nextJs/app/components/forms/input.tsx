import { ChangeEventHandler } from "react"

interface InputInterface{
    // OBS: '?:' -> Valor Opcional
    name: string
    label: string
    placeholder?: string
    value?: string
    setValue: ChangeEventHandler<HTMLInputElement> 
}

export default function Input({name, label, placeholder, value, setValue} : InputInterface){
    return(
        //Evita ter certos problemas a Tag vazia
        <>
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} name={name} value={value} placeholder={placeholder} onChange={setValue}/>
        </>

    )
}