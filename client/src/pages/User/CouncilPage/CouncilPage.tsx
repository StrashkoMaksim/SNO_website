import React, { FC, useEffect } from 'react';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import SupervisorsList from "../../../components/SupervisorsList/SupervisorsList";

const CouncilPage: FC = () => {
    const { supervisors, error, loading } = useTypedSelector(state => state.supervisor)
    const { fetchSupervisors } = useActions()

    useEffect(() => {
        fetchSupervisors()
    }, [])

    return (
        <section className={'section'}>
            <div className={'container'}>
                <h1>Совет СНО</h1>
                <SupervisorsList supervisors={supervisors}/>
            </div>
        </section>
    );
};

export default CouncilPage;