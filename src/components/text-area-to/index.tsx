import { Textarea } from "@nextui-org/react"

export const TextAreaTo = ({ name, defaultValue }: { name:string, defaultValue:string }) => {
  return (
    <div>
      <Textarea
        name={name}
        placeholder="Введите замечание"
        defaultValue={defaultValue}
      ></Textarea>
    </div>
  )
}
