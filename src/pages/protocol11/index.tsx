import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react"
import { SelectTo } from "../../components/select-to"
import { TextAreaTo } from "../../components/text-area-to"
import { useGetToByIdQuery, useUpdateToMutation } from "../../app/service/toApi"
import { useState } from "react"
import { hasErrorField } from "../../utils/has-error-field"
import { CheckBox } from "../../components/checkbox"
import { useParams } from "react-router-dom"
import { Sostoyanie } from "../../app/myStore"
import { saveFile } from "../../features/converToDocProtocol11"
import { TemplateHandler } from "easy-template-x"
import { formatToClientDate } from "../../utils/format-to-client-date"


export const Protocol11To = () => {
  const params = useParams<{ id: any }>()
  const { data } = useGetToByIdQuery(params.id ?? "")
  const [to] = useUpdateToMutation()
  const [error, setError] = useState("")
  if (!data) {
    return <h2>Протокола не существует</h2>
  }
  const { placeNumber, createdAt, fio, protocol, address } = data
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const dataFromForm = Object.fromEntries(formData)
    try {
      await to({ toData: { protocol: dataFromForm }, id: params.id }).unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
    window.location.reload();
  }
  const DownloadDocFile = async () => {
    const request = await fetch("/template11.docx")
    const templateFile = await request.blob()
    const data = JSON.parse(JSON.stringify(protocol))
    data.fio = fio
    data.placeNumber = placeNumber
    data.address = address
    data.createdAt = formatToClientDate(createdAt)
    console.log(JSON.stringify(data))
    const handler = new TemplateHandler()
    const doc = await handler.process(templateFile, data)
    saveFile(`BTS_${placeNumber}_Протокол_1_1_от_${formatToClientDate(createdAt)}.docx`, doc)
  }
  return (
    <>
      <Button onClick={DownloadDocFile}>Преобразовать в .doc</Button>
      <p className="text-center text-3xl mb-5 mt-5">
        Приложение 1.1. Сводный протокол проверки инфраструктуры
      </p>
      <form onSubmit={handleSubmit}>
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
                Оценка условий функционирования оборудования (температура,
                влажность, запылённость и т. п.)
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"ocenkaUsloviy"}
                  defaultvalue={protocol.ocenkaUsloviy}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"ocenkaUsloviyZam"}
                  defaultValue={protocol.ocenkaUsloviyZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>
                Осмотр аппаратной (состояние отделки внешней и внутренней
                поверхностей стен, потолка, пола, линолеума, плинтусов). Уборка
                помещения и прилегающей территории.
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"osmotrApparatnoy"}
                  defaultvalue={protocol.osmotrApparatnoy}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"osmotrApparatnoyZam"}
                  defaultValue={protocol.osmotrApparatnoyZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>
                Проверка состояния входной двери (уплотнителя), замков,
                антивандальной защиты.
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaVhodDvery"}
                  defaultvalue={protocol.proverkaVhodDvery}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"proverkaVhodDveryZam"}
                  defaultValue={protocol.proverkaVhodDveryZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4</TableCell>
              <TableCell>
                Осмотр кабель-роста, кабельных лотков и коробов, 19”
                стойки/шкафа (комплектность, надежность крепления, соединение
                частей).
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"osmotrStoyki"}
                  defaultvalue={protocol.osmotrStoyki}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"osmotrStoykiZam"}
                  defaultValue={protocol.osmotrStoykiZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>5</TableCell>
              <TableCell>
                Проверка соединения (наличие цепи) корпусов оборудования,
                шкафов, стоек, кабель-роста, элементов грозозащиты,
                актистатической защиты аппаратной с ГЗШ.
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaSoedineniy"}
                  defaultvalue={protocol.proverkaSoedineniy}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"proverkaSoedineniyZam"}
                  defaultValue={protocol.proverkaSoedineniyZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>6</TableCell>
              <TableCell>
                Проверка кроссового оборудования (крепление кросса, укладка
                оптических патч-кордов, проводов, кабелей, маркировка), наличие
                старых и неиспользуемых кабелей и проводов.
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaKrossa"}
                  defaultvalue={protocol.proverkaKrossa}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"proverkaKrossaZam"}
                  defaultValue={protocol.proverkaKrossaZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>7</TableCell>
              <TableCell>Проверка исправности приборов освещения.</TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaOsveshen"}
                  defaultvalue={protocol.proverkaOsveshen}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"proverkaOsveshenZam"}
                  defaultValue={protocol.proverkaOsveshenZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>8</TableCell>
              <TableCell>
                Осмотр фидерного ввода, закладных гильз ввода силового кабеля,
                патрубков кондиционеров.
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"osmotrFiderov"}
                  defaultvalue={protocol.osmotrFiderov}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"osmotrFiderovZam"}
                  defaultValue={protocol.osmotrFiderovZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>9</TableCell>
              <TableCell>
                Проверка состояния контура заземления внутри аппаратной,
                внешнего контура заземления и заземляющего устройства.
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaZazemlen"}
                  defaultvalue={protocol.proverkaZazemlen}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"proverkaZazemlenZam"}
                  defaultValue={protocol.proverkaZazemlenZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>10</TableCell>
              <TableCell>
                Осмотр контейнера, входной лестницы, перил, козырька. Состояние
                гидроизоляции дна контейнера, гидроизоляции кровли. Проверка
                отсутствия деформации в местах нагрузки.
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"osmotrGidroizolyac"}
                  defaultvalue={protocol.osmotrGidroizolyac}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"osmotrGidroizolyacZam"}
                  defaultValue={protocol.osmotrGidroizolyacZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>11</TableCell>
              <TableCell>
                Проверка состояния фундамента контейнера, разгрузочной рамы,
                бетонной отмостки.
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaFundamenta"}
                  defaultvalue={protocol.proverkaFundamenta}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"proverkaFundamentaZam"}
                  defaultValue={protocol.proverkaFundamentaZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>12</TableCell>
              <TableCell>
                Проверка состояния грунта, отсутствие просадок, промоин, ям.
                Осмотр ограждения вокруг выделенной территории, калитки,
                антивандальной защиты.
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaGrunta"}
                  defaultvalue={protocol.proverkaGrunta}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"proverkaGruntaZam"}
                  defaultValue={protocol.proverkaGruntaZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>13</TableCell>
              <TableCell>
              Осмотр ограждения вокруг выделенной территории, калитки, антивандальной защиты.
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"osmotrOgrazhdenia"}
                  defaultvalue={protocol.osmotrTerritorii}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"osmotrOgrazhdeniaZam"}
                  defaultValue={protocol.osmotrTerritoriiZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>14</TableCell>
              <TableCell>
                Осмотр территории. Покос травы, вырубка кустарника на
                огороженной территории, очистка и вывоз мусора.
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"osmotrTerritorii"}
                  defaultvalue={protocol.osmotrTerritorii}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"osmotrTerritoriiZam"}
                  defaultValue={protocol.osmotrTerritoriiZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>16</TableCell>
              <TableCell>
                Осмотр состояния наружного кабель-роста, антигололедной защиты,
                качество крепления, отсутствие механических повреждений.
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"osmotrNaruzhSostoyan"}
                  defaultvalue={protocol.osmotrNaruzhSostoyan}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"osmotrNaruzhSostoyanZam"}
                  defaultValue={protocol.osmotrNaruzhSostoyanZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>16</TableCell>
              <TableCell>
                Проверка состояния лестниц для подъема на кровлю; состояние
                кровли в местах установки анкерных групп, опорных узлов и
                разгрузочных рам. Наличие и состояние предохраняющих от падений
                с крыши парапетов, ограждений, страховочных систем.
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaSostoyanLestnic"}
                  defaultvalue={protocol.proverkaSostoyanLestnic}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"proverkaSostoyanLestnicZam"}
                  defaultValue={protocol.proverkaSostoyanLestnicZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>17</TableCell>
              <TableCell>
                Проверка состояния неиспользуемых инженерных коммуникаций
                (батареи отопления, трубопроводы).
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaInzhenerKommukac"}
                  defaultvalue={protocol.proverkaInzhenerKommukac}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"proverkaInzhenerKommukacZam"}
                  defaultValue={protocol.proverkaInzhenerKommukacZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>18</TableCell>
              <TableCell>
                Проверка герметичности окон, наличие антивандальной решеткой или
                жалюзи.
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaOkon"}
                  defaultvalue={protocol.proverkaOkon}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"proverkaOkonZam"}
                  defaultValue={protocol.proverkaOkonZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>19</TableCell>
              <TableCell>
                Проверка выполнения мероприятий предусмотренных ПОЛ (для
                объектов на землях лесного фонда).
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"proverkaPol"}
                  defaultvalue={protocol.proverkaPol}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"proverkaPolZam"}
                  defaultValue={protocol.proverkaPolZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>20</TableCell>
              <TableCell>
                Наличие неиспользуемого и демонтированного оборудования.
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"nalicieNeisOborud"}
                  defaultvalue={protocol.nalicieNeisOborud}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"nalicieNeisOborudZam"}
                  defaultValue={protocol.nalicieNeisOborudZam}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>21</TableCell>
              <TableCell>
                Проверка наличия оборудования сторонних операторов на БС.
              </TableCell>
              <TableCell>
                <SelectTo
                  name={"nalicieStoronOper"}
                  defaultvalue={protocol.nalicieStoronOper}
                  selectValues={Sostoyanie}
                />
              </TableCell>
              <TableCell>
                <TextAreaTo
                  name={"nalicieStoronOperZam"}
                  defaultValue={protocol.nalicieStoronOperZam}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="text-center text-2xl m-5">Проверка инвентаря</p>

        <CheckBox
          name={"lestnica"}
          defaultSelected={protocol.lestnica ? true : false}
          value={"есть"}
          desc={"Лестница"}
        />
        <CheckBox
          name={"stul"}
          defaultSelected={protocol.stul ? true : false}
          value={"есть"}
          desc={"Стул"}
        />
        <CheckBox
          name={"stol"}
          defaultSelected={protocol.Stol ? true : false}
          value={"есть"}
          desc={"Стол"}
        />
        <CheckBox
          name={"kovriki"}
          defaultSelected={protocol.kovriki ? true : false}
          value={"есть"}
          desc={"Диэл. коврики, коврик на входе"}
        />
        <CheckBox
          name={"per_sredst_pozhar"}
          defaultSelected={protocol.per_sredst_pozhar ? true : false}
          value={"есть"}
          desc={"Первичные средства пожаротушения"}
        />
        <CheckBox
          name={"sovok"}
          defaultSelected={protocol.sovok ? true : false}
          value={"есть"}
          desc={"Швабра, совок"}
        />
        <CheckBox
          name={"obogrev"}
          defaultSelected={protocol.obogrev ? true : false}
          value={"есть"}
          desc={"Обогреватель"}
        />
        <CheckBox
          name={"yashik_dokum"}
          defaultSelected={protocol.yashik_dokum ? true : false}
          value={"есть"}
          desc={"Ящик для документов"}
        />

        <p className="text-center text-2xl m-5">
          Проверка маркировки оборудования
        </p>
        <CheckBox
          name={"vvod_shit"}
          defaultSelected={protocol.vvod_shit ? true : false}
          value={"есть"}
          desc={"Вводной щит электропитания"}
        />
        <CheckBox
          name={"stoyka_pitan"}
          defaultSelected={protocol.stoyka_pitan ? true : false}
          value={"есть"}
          desc={"Стойка питания, щитки с автоматами"}
        />
        <CheckBox
          name={"akb"}
          defaultSelected={protocol.akb ? true : false}
          value={"есть"}
          desc={"АКБ"}
        />
        <CheckBox
          name={"rrl_stoyka"}
          defaultSelected={protocol.rrl_stoyka ? true : false}
          value={"есть"}
          desc={"РРЛ стойка"}
        />
        <CheckBox
          name={"rf_blok"}
          defaultSelected={protocol.rf_blok ? true : false}
          value={"есть"}
          desc={"RF блоки"}
        />
        <CheckBox
          name={"fider_bs"}
          defaultSelected={protocol.fider_bs ? true : false}
          value={"есть"}
          desc={"Фидера БС"}
        />
        <CheckBox
          name={"kross_ddf"}
          defaultSelected={protocol.kross_ddf ? true : false}
          value={"есть"}
          desc={"Кросс DDF/ODF"}
        />
        <CheckBox
          name={"condicioner"}
          defaultSelected={protocol.condicioner ? true : false}
          value={"есть"}
          desc={"Кондиционеры"}
        />
        <p className="text-center text-2xl m-5">
          Проверка наличия информационных наклеек, указателей, знаков
        </p>
        <CheckBox
          name={"kyrit_zhap"}
          defaultSelected={protocol.kyrit_zhap ? true : false}
          value={"есть"}
          desc={"Курить запрещено"}
        />
        <CheckBox
          name={"pom_s_opasnost"}
          defaultSelected={protocol.pom_s_opasnost ? true : false}
          value={"есть"}
          desc={"Помещение с повышенной опасностью"}
        />
        <CheckBox
          name={"otv_za_protivopozhar"}
          defaultSelected={protocol.otv_za_protivopozhar ? true : false}
          value={"есть"}
          desc={"Ответственный за противопожарное состояние"}
        />
        <CheckBox
          name={"ognetush"}
          defaultSelected={protocol.ognetush ? true : false}
          value={"есть"}
          desc={"Огнетушитель (№, проверен)"}
        />
        <CheckBox
          name={"visokoe_naprazh"}
          defaultSelected={protocol.visokoe_naprazh ? true : false}
          value={"есть"}
          desc={"Высокое напряжение (щит ЭП, стойка ЭП)"}
        />
        <CheckBox
          name={"tab_na_vhod_dvery"}
          defaultSelected={protocol.tab_na_vhod_dvery ? true : false}
          value={"есть"}
          desc={"Табличка на вх.двери, на калитке ограждения"}
        />
        <CheckBox
          name={"otvetst_bs"}
          defaultSelected={protocol.otvetst_bs ? true : false}
          value={"есть"}
          desc={"№ БС, ответственный за БС"}
        />
        <CheckBox
          name={"instruk_pozhar_bez"}
          defaultSelected={protocol.instruk_pozhar_bez ? true : false}
          value={"есть"}
          desc={
            "Инструкция по пож. безопасности с указанием № телефона для вызова пожарной охраны"
          }
        />
        <p className="text-center text-2xl m-5">Проверка документации</p>
        <CheckBox
          name={"zhurnal_ucheta"}
          defaultSelected={protocol.zhurnal_ucheta ? true : false}
          value={"есть"}
          desc={"Журнал учета работ на объекте сети радиодоступа"}
        />
        <CheckBox
          name={"ekspluatac_docum"}
          defaultSelected={protocol.ekspluatac_docum ? true : false}
          value={"есть"}
          desc={"Эксплуатац. тех. документация:"}
        />
        <CheckBox
          name={"odnolin_shema"}
          defaultSelected={protocol.odnolin_shema ? true : false}
          value={"есть"}
          desc={"Однолинейная электрическая схема"}
        />
        <CheckBox
          name={"shema_anten"}
          defaultSelected={protocol.shema_anten ? true : false}
          value={"есть"}
          desc={"Сх. расположения антенн"}
        />
        <CheckBox
          name={"inst_po_test_sk"}
          defaultSelected={protocol.inst_po_test_sk ? true : false}
          value={"есть"}
          desc={"Инструкция по тестированию СК, фрикулинга"}
        />
        <CheckBox
          name={"struktur_shema_post_tok"}
          defaultSelected={protocol.struktur_shema_post_tok ? true : false}
          value={"есть"}
          desc={"Структурная схема по постоянному току"}
        />
        <CheckBox
          name={"truktur_shema_vn_sig"}
          defaultSelected={protocol.truktur_shema_vn_sig ? true : false}
          value={"есть"}
          desc={"Структурная схема внешней сигнализации"}
        />
        <CheckBox
          name={"shema_vch_soed"}
          defaultSelected={protocol.shema_vch_soed ? true : false}
          value={"есть"}
          desc={"Схема ВЧ соединений"}
        />
        <CheckBox
          name={"akk_zhurnal"}
          defaultSelected={protocol.akk_zhurnal ? true : false}
          value={"есть"}
          desc={"Аккумуляторный журнал"}
        />
        <CheckBox
          name={"kross_zhurnal"}
          defaultSelected={protocol.kross_zhurnal ? true : false}
          value={"есть"}
          desc={"Кроссовый журнал"}
        />
        <CheckBox
          name={"inventar_ved"}
          defaultSelected={protocol.inventar_ved ? true : false}
          value={"есть"}
          desc={"Инвентаризационная ведомость"}
        />
        <CheckBox
          name={"plan_raspol_apparat"}
          defaultSelected={protocol.plan_raspol_apparat ? true : false}
          value={"есть"}
          desc={"План расположения оборудования в аппаратной"}
        />
        <CheckBox
          name={"instruc_pozh_v_pomesh"}
          defaultSelected={protocol.instruc_pozh_v_pomesh ? true : false}
          value={"есть"}
          desc={"Инструкция о мерах пожарной безопасности в помещении БС"}
        />
        <div className="flex gap=2 justify-end mb-10">
          <Button type="submit" className="mt-5">
            Сохранить
          </Button>
        </div>
      </form>
    </>
  )
}
