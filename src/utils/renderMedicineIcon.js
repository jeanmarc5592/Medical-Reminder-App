import React from 'react';
import * as CustomIcons from '../icons';

export const renderMedicineIcon = medicineType => {
    switch (medicineType) {
        case "Capsule":
            return <CustomIcons.CapsuleIcon />
        case "Tablet":
            return <CustomIcons.TabletIcon />
        case "Drops":
            return <CustomIcons.DropsIcon />
        default: 
            return <></>
    }
}