import { Select, SelectItem } from "@nextui-org/react"



export const SelectTo = ({name, defaultvalue, selectValues}:{name:string, defaultvalue:string, selectValues:any}) => {
  return (
    <>
      <Select label="выберите состояние" name={name} defaultSelectedKeys={[defaultvalue]}>
      {selectValues.map((value:any) => (
          <SelectItem key={value} value={value}>
            {value}
          </SelectItem>))}
      </Select>
    </>
  )
}



