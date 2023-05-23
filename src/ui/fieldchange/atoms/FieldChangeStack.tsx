import { $userValue, setUserSetting } from "../../functions/Hooks";
import { useEffect, useState } from "react";
import { inStack } from "../logics/inStack";
import { IFieldChange } from "../organelles/FieldChange";
import Arrow from '../../../assets/fieldChange/Arrow.svg'
import Setting from '../../../assets/userChange/Setting.svg'
import { inApiSaveStack } from "../logics/inApiSave";
import { useStore } from "effector-react";
import Delete from '../../../assets/userChange/Delete.svg'
import { inApiDeleteStack } from "../logics/inApiDelete";
import Select from "react-select";

export const FieldChangeStack = (params: IFieldChange) => {
    const userValue = useStore($userValue);
    const [valueApi, setValueApi] = useState<any>()
    const [valueApiChoice, setValueApiChoice] = useState<any>({ value: "", label: "" })
    const [oldValue, setOldValue] = useState<any | null>(null)
    const handleApiChoiceChange = (event: any, type: any) => {
        setValueApiChoice({ value: event?.value, label: event?.value })
    };
    const handleValueApi = async () => {
        try {
            const result = await inStack()
            if (result) {
                setValueApi(result.map((e: any) => ({ value: e.name, label: e.name })))
            }
        } catch (error) {
            console.log("handleValueApi", handleValueApi)
        }
    }
    useEffect(() => {
        handleValueApi()
        if (params.value?.name) {
            setValueApiChoice({ value: params.value?.name, label: params.value?.name })
            params.setNewValue && params.setNewValue(params.value?.level)
        }
    }, [params.value])

    useEffect(() => {
        let result = ""
        for (let i = 0; i < userValue.stack.length; i++) {
            const object = userValue.stack[i];
            if (object && object.name && object.name === valueApiChoice.value) {
                result = object.level
            }
        }
        if (params.setNewValue) {
            params.setNewValue(result)
            setOldValue(result)
        }
        params.setCheck && params.setCheck(result ? true : false)

    }, [valueApiChoice])

    const handleApiDelete = async () => {
        try {
            const result = await inApiDeleteStack({ name: valueApiChoice.value });
            if (result) {
                setUserSetting(false);
            }else{
                setUserSetting(false);
            }
        } catch (error) {
            console.log("error", error)
        }

    }
    const handleApiSave = async () => {
        try {
            const result = await inApiSaveStack({ name: valueApiChoice.value, level: params.newValue });
            if (result) {
                setUserSetting(false);
            }else{
                setUserSetting(false);
            }
        } catch (error) {
            console.log("error", error)
        }


    };

    return (
        <div className="FieldChange__General" >
            <form onSubmit={e => { e.preventDefault(); (oldValue !== params.newValue && params.newValue) && handleApiSave(); }} className="FieldChange" >
                <img src={Arrow} className="FieldChange__Arrow" alt="Arrow" onClick={() => setUserSetting(false)} />
                {oldValue && <img src={Delete} alt="Delete" className="FieldChange__Delete" onClick={handleApiDelete} />}
                <div className="FieldChange__Header" >
                    <img className="FieldChange__Image" alt="" src={Setting} />
                    <div className="FieldChange__BR">
                        Здесь вы можете изменить информацию о себе
                    </div>
                </div>
                <div className="FieldChange__Info">
                    <div className="FieldChange__Title" >
                        {oldValue ? "Изменить " : "Добавить "}{params.title}
                    </div>
                    <div className="FieldChange__Inputs">
                        {params.value?.name && valueApiChoice.value && <Select
                            onChange={(event: any) => handleApiChoiceChange(event, "contacts")}
                            defaultValue={valueApiChoice}
                            isSearchable
                            options={valueApi}
                            className="Input__Select"
                            classNamePrefix="SelectSearchInput"
                            placeholder={<div className="SelectSearchInput__Placeholder">Выберите навык</div>}
                            noOptionsMessage={() => 'Нет данных'}
                            loadingMessage={() => 'Поиск'}
                            required

                        />}
                        {!params.value?.name && <Select
                            onChange={(event: any) => handleApiChoiceChange(event, "contacts")}
                            isSearchable
                            options={valueApi}
                            className="Input__Select"
                            classNamePrefix="SelectSearchInput"
                            placeholder={<div className="SelectSearchInput__Placeholder">Выберите навык</div>}
                            noOptionsMessage={() => 'Нет данных'}
                            loadingMessage={() => 'Поиск'}
                            required
                        />}
                        {valueApiChoice.value &&
                            <>
                                <div className="FieldChange__Title">Выберите выш уровень</div>
                                <div className="FieldChange__Inputs__Stack__Bar">
                                    {[1, 2, 3, 4, 5, 6].map((e: any) =>
                                        <div className={params.newValue === e ? "FieldChange__Inputs__Stack__Bar__Level__Choice FieldChange__Inputs__Stack__Bar__Level" : "FieldChange__Inputs__Stack__Bar__Level"} onClick={() => { params.setNewValue && params.setNewValue(e) }}>
                                            {e}
                                        </div>
                                    )}
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className="FieldChange__Button__Group">
                    <div className="FieldChange__Button__Group__Cancel" onClick={() => setUserSetting(false)}>
                        Отменить
                    </div>
                    <input type="submit" className={(oldValue !== params.newValue && params.newValue) ? "FieldChange__Button__Group__Save" : "FieldChange__Button__Group__Cancel"} value="Сохранить" />
                </div>
            </form>
        </div>
    );
};
