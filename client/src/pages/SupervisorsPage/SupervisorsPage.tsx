import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";

const SupervisorsPage: FC = () => {
    const { supervisors, error, loading } = useTypedSelector(state => state.supervisor)
    const { fetchSupervisors } = useActions()

    useEffect(() => {
        fetchSupervisors()
    }, [])

    return (
        <div>

        </div>
    );
};

export default SupervisorsPage;