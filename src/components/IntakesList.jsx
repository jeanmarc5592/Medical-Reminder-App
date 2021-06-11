import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import Intake from './Intake';

const IntakesList = () => {
    const { reminders } = useSelector(state => state.user);
    const { selectedDay } = useSelector(state => state.calendar);
    
    // Checks if the selected day (e.g. "Mon") is included in the reminders
    // This ensures to render only the reminders that are relevant for that day 
    const remindersForToday = useMemo(() => {
        return reminders?.filter((reminder) => reminder.reminderDays.includes(selectedDay.formatted));
    }, [reminders, selectedDay])

    if (!reminders) {
        return <></>;
    }

    return (
        <View style={{ marginTop: 35, width: "100%" }}>
            {
                remindersForToday.map((intake, index) => {
                    return <Intake key={`${intake.name}-${index}`} {...intake} />
                })
            }
        </View>
    )
}

export default IntakesList
