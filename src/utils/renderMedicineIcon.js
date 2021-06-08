import React from 'react';
import * as CustomIcons from '../icons';

/**
 * *********************************************************************************
 * **** Renders the corresponding Icon Component for the provided medicine type ****
 * *********************************************************************************
 * @param {String} medicineType - Type of Medicine
 * @returns {JSX} - Icon Component
 */
export const renderMedicineIcon = medicineType => {
    switch (medicineType) {
        case "Capsule":
            return <CustomIcons.CapsuleIcon />
        case "Tablet":
            return <CustomIcons.TabletIcon />
        case "Drop":
            return <CustomIcons.DropsIcon />
        default: 
            return <></>
    }
}