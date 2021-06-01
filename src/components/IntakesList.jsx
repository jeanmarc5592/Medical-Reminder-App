import React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import Intake from './Intake';

const IntakesList = () => {
    const { reminders } = useSelector(state => state.user);

    if (!reminders) {
        return <></>;
    }

    return (
        <View style={{ marginTop: 35, width: "100%" }}>
            {
                reminders.map((intake, index) => {
                    return <Intake key={`${intake.name}-${index}`} {...intake} />
                })
            }
        </View>
    )
}

export default IntakesList
