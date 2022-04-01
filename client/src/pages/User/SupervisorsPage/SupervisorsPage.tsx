import React, { FC, useEffect } from 'react';
import SupervisorsList from "../../../components/SupervisorsList/SupervisorsList";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";

const SupervisorsPage: FC = () => {
    const { supervisors, error, loading } = useTypedSelector(state => state.supervisor)
    const { fetchSupervisors } = useActions()

    useEffect(() => {
        fetchSupervisors()
        window.scroll(0, 0)

    }, [])

    return (
        <section className={'section'}>
            <div className={'container'}>
                <h1>Руководители</h1>
                <SupervisorsList supervisors={supervisors} />
            </div>
        </section>
    )
}

export default SupervisorsPage