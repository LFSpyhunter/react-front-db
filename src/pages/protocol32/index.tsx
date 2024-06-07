import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
  Input,
  Textarea,
} from "@nextui-org/react"
import { SelectTo } from "../../components/select-to"
import { TextAreaTo } from "../../components/text-area-to"
import { useGetToByIdQuery, useUpdateToMutation } from "../../app/service/toApi"
import { useState } from "react"
import { hasErrorField } from "../../utils/has-error-field"
import { ErrorMessage } from "../../components/error-message"
import { CheckBox } from "../../components/checkbox"
import { useParams } from "react-router-dom"
import { Sostoyanie } from "../../app/myStore"
// import { ConverToDocPtotocol11 } from "../../features/converToDocProtocol11"

export const Protocol32To = () => {
  // const params = useParams<{ id: string }>()
  // const { data } = useGetToByIdQuery(params.id ?? "")
  // const { placeNumber, createdAt, fio, protocol } = data
  // const [to] = useUpdateToMutation()
  // const [error, setError] = useState("")
  // const handleSubmit = async e => {
  //   e.preventDefault()
  //   const formData = new FormData(e.currentTarget)
  //   const dataFromForm = Object.fromEntries(formData)
  //   try {
  //     await to({ toData: { protocol: dataFromForm }, id: params.id }).unwrap()
  //   } catch (error) {
  //     if (hasErrorField(error)) {
  //       setError(error.data.error)
  //     }
  //   }
  // }
  // const DownloadDocFile = () => {
  //   ConverToDocPtotocol11(placeNumber, createdAt, fio, protocol)
  // }
  return (
    <>
      <Button  disabled>
        Преобразовать в .doc
      </Button>
      <p className="text-center text-3xl mb-5 mt-5">
        Приложение 3.2. Протокол проверки РРС (Внешний осмотр)
      </p>
      <form >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-2 mb-5">
          <Input
            type="text"
            label="№ RRN"
            placeholder="(RRN - указывается № из НИОСС в соответствии с СТ-МВС-533)"
          />
          <Input
            type="text"
            label="Тип РРС"
            placeholder="Указывается согласно технической документации на оборудование"
          />
        </div>
        <Table>
          <TableHeader>
            <TableColumn>№ п/п</TableColumn>
            <TableColumn>Наименование работ</TableColumn>
            <TableColumn>Отметка о состоянии</TableColumn>
            <TableColumn>Замечания</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell width={10}>1</TableCell>
              <TableCell width={500}>
                Проверка отсутствия внешней индикации аварийного состояния
                оборудования
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"ocenkaUsloviy"}
                  defaultvalue={""}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo name={"ocenkaUsloviyZam"} defaultValue={""} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>
                Проверка температурного режима эксплуатации оборудования
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"osmotrApparatnoy"}
                  defaultvalue={""}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo name={"osmotrApparatnoyZam"} defaultValue={""} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>Проверка крепления оборудования</TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaVhodDvery"}
                  defaultvalue={""}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo name={"proverkaVhodDveryZam"} defaultValue={""} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4</TableCell>
              <TableCell>
                Проверка наличия неиспользуемого оборудования
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"osmotrStoyki"}
                  defaultvalue={""}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo name={"osmotrStoykiZam"} defaultValue={""} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>5</TableCell>
              <TableCell>
                Проверка отсутствия на элементах оборудования грязи и пыли,
                остатков монтажных материалов
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaSoedineniy"}
                  defaultvalue={""}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo name={"proverkaSoedineniyZam"} defaultValue={""} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>6</TableCell>
              <TableCell>
                Проверка отсутствия повреждений различного характера
                (механических повреждений, наличие опасных перегибов кабелей и
                патч-кордов)
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaKrossa"}
                  defaultvalue={""}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo name={"proverkaKrossaZam"} defaultValue={""} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>7</TableCell>
              <TableCell>
                Проверка укладки запасов длин патч-кордов в лотки/органайзеры
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaOsveshen"}
                  defaultvalue={""}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo name={"proverkaOsveshenZam"} defaultValue={""} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>8</TableCell>
              <TableCell>
                Проверка надежности крепления оборудования в стойке, блоков,
                соединения отдельных элементов и частей оборудования, разъемов,
                станционных кабелей, кабелей электропитания, заземления и вывода
                внешней сигнализации
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"osmotrFiderov"}
                  defaultvalue={""}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo name={"osmotrFiderovZam"} defaultValue={""} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>9</TableCell>
              <TableCell>
                Проверка наличия неиспользуемых кабелей/патчкордов
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaZazemlen"}
                  defaultvalue={""}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo name={"proverkaZazemlenZam"} defaultValue={""} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>10</TableCell>
              <TableCell>
                Проверка соответствия размещения, состава и подключения
                оборудования производственной документации
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"osmotrGidroizolyac"}
                  defaultvalue={""}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo name={"osmotrGidroizolyacZam"} defaultValue={""} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>11</TableCell>
              <TableCell>
                Проверка работоспособности встроенных вентиляторов (при наличии)
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaFundamenta"}
                  defaultvalue={""}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo name={"proverkaFundamentaZam"} defaultValue={""} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>12</TableCell>
              <TableCell>
                Проверка состояния пылевых фильтров (при наличии)
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaGrunta"}
                  defaultvalue={""}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo name={"proverkaGruntaZam"} defaultValue={""} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>13</TableCell>
              <TableCell>
                Проверка наличия фальшпанелей (заглушек) в установочных местах
                системных модулей
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"osmotrTerritorii"}
                  defaultvalue={""}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo name={"osmotrTerritoriiZam"} defaultValue={""} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>14</TableCell>
              <TableCell>
                Проверка правильности маркировки оборудования, кабелей на
                стороне кросса и оборудования, кабелей вывода внешней
                сигнализации
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"osmotrNaruzhSostoyan"}
                  defaultvalue={""}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"osmotrNaruzhSostoyanZam"}
                  defaultValue={""}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>15</TableCell>
              <TableCell>
                Проверка подключения оборудования к АВ защиты ЭПУ цепей
                приоритетной нагрузки (наличие основного и резервного
                электропитания)
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaSostoyanLestnic"}
                  defaultvalue={""}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"proverkaSostoyanLestnicZam"}
                  defaultValue={""}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>16</TableCell>
              <TableCell>
                Проверка правильности маркировки АВ защитного отключения
                электропитания оборудования, АВ щита электропитания
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaInzhenerKommukac"}
                  defaultvalue={""}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"proverkaInzhenerKommukacZam"}
                  defaultValue={""}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Textarea
          label="Заключение"
          placeholder="Пожалуйста напишите заключение"
          className="max-w-full mt-5"
        />
        <div className="flex gap=2 justify-end mb-10">
          <Button type="submit" className="mt-5" disabled>
            Сохранить
          </Button>
        </div>
      </form>
    </>
  )
}
