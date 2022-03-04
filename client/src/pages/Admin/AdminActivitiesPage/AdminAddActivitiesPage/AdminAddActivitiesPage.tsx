import DefaultButton, { ButtonStyles, ButtonTypes } from "../../../../components/DefaultButton/DefaultButton";
import styles from './AdminAddActivitiesPage.module.scss'
import { FormEvent, useState } from "react";

import AdminAddSupervisorForm from "../../../../components/Admin/AdminAddSupervisorForm/AdminAddSupervisorForm";
import SchedulePicker from "./SchedulePicker/SchedulePicker";
import { ScheduleIntefrace } from '../../../../types/schedule'
import AdminEditPageHeader, { AEPHTypes } from "../../../../components/AdminEditPageHeader/AdminEditPageHeader";
import AddActivityMainInfo from "./AddActivityMainInfo/AddActivityMainInfo";
import { Activity, emptyActivity } from "../../../../types/activity";



const AdminAddActivitiesPage = () => {

    const activityId = undefined;
    const [activity, setActivity] = useState<Activity>(emptyActivity)

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // const formData = new FormData(e.currentTarget)
        // const editorData = await getEditorContent(editorCore);
    }


    return (
        <>

            <AdminEditPageHeader
                linkTo='/admin/activities'
                headerForObj={activityId}
                headerFor={AEPHTypes.activity}
                onDeleteBtnClick={() => { }} />

            <form className={styles.AddActivityForm} onSubmit={submitHandler}>

                <AddActivityMainInfo />

                <AdminAddSupervisorForm />

                <SchedulePicker />

                <DefaultButton
                    text="Сохранить новость"
                    style={ButtonStyles.filled}
                    type={ButtonTypes.submit}
                    extraClass={styles.alignSelfCenter}
                />
            </form>

        </>
    )
}

export default AdminAddActivitiesPage;