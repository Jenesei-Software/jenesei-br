import { setUserSetting } from "../../functions/Hooks";
import { IFieldChange } from "../organoids/FieldChange";
import { inApiSaveDefault } from "../logics/inApiSave";
import autosize from 'autosize';
import Arrow from '../../../assets/fieldchange/Arrow.svg'
import Setting from '../../../assets/userchange/Setting.svg'

export const FieldChangeAboutLong = (params: IFieldChange) => {
    const handleApiSave = async () => {
        try {
            const result = await inApiSaveDefault({ value: params.newValue, keyName: params.keyName });
            if (result) {
                setUserSetting(false);
            }
        } catch (error) {
            console.log("error", error)
        }
    }
    const handleNewValue = (event: any) => {
        if (params.keyName && params.setNewValue) {
            params.setNewValue(
                event.target.value
            )
        }
    }
    return (
        <div className="FieldChange__General" >
            <form onSubmit={e => { e.preventDefault();params.check && handleApiSave() }} className="FieldChange" >
                <img src={Arrow} className="FieldChange__Arrow" alt="Arrow" onClick={() => setUserSetting(false)} />
                <div className="FieldChange__Header" >
                    <img className="FieldChange__Image" alt="" src={Setting} />
                    <div className="FieldChange__BR">
                        Здесь вы можете изменить информацию о себе
                    </div>
                </div>
                <div className="FieldChange__Info">
                    <div className="FieldChange__Title" >
                        {params.title}
                    </div>

                    <div className="FieldChange__Inputs">
                        <textarea required minLength={20} onFocus={() => { autosize(document.querySelector('textarea')) }} value={!params.newValue ? (params.value && params.value) : params.newValue} onChange={handleNewValue} placeholder={"Расскажите о себе"}></textarea>
                    </div>
                </div>
                <div className="FieldChange__Button__Group">
                    <div className="FieldChange__Button__Group__Cancel" onClick={() => setUserSetting(false)}>
                        Отменить
                    </div>
                    <input type="submit" className={params.check ? "FieldChange__Button__Group__Save" : "FieldChange__Button__Group__Cancel"} value="Сохранить" />
                </div>
            </form>
        </div>
    );
};