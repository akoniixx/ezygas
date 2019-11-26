import React from 'react';
import Text from 'Components/Text';

export const noDataPlaceHolder = (
    <Text
        type="title"
        text="ไม่มีข้อมูล"
        align="start" />
);

export const errorPlaceHolder = (
    <Text
        type="title"
        text="เกิดข้อผิดพลาดในการโหลดข้อมูล"
        align="start" />
);