import React from 'react'
import { View } from 'react-native';
import CustomText from './CustomText';
import Intake from './Intake';

const MOCK_INTAKES_LIST = [
    { 
        id: 1,
        name: "Amoxicillin",
        type: "Capsule",
        dose: "300mg",
        amount: 1,
        frequency: "daily",
        reminder: "8:30 AM",
        start: "09/01/2020",
        end: "02/31/2021"
    },
    { 
        id: 12,
        name: "Ibuprofen",
        type: "Tablet",
        dose: "600mg",
        amount: 1,
        frequency: "daily",
        reminder: "11:30 AM",
        start: "09/01/2020",
        end: "02/31/2021"
    },
    { 
        id: 13,
        name: "Vitamin D3",
        type: "Drops",
        dose: "1000mg",
        amount: 5,
        frequency: "daily",
        reminder: "8:30 PM",
        start: "09/01/2020",
        end: "02/31/2021"
    },
    { 
        id: 14,
        name: "Vitamin C",
        type: "Capsule",
        dose: "100mg",
        amount: 1,
        frequency: "daily",
        reminder: "9:00 PM",
        start: "09/01/2020",
        end: "02/31/2021"
    }
]

const IntakesList = () => {
    return (
        <View style={{ marginTop: 35, width: "100%" }}>
            {
                MOCK_INTAKES_LIST.map(intake => {
                    return <Intake key={intake.id} {...intake} />
                })
            }
        </View>
    )
}

export default IntakesList
