import React, { useState } from 'react';
import { Flex, Rate } from 'antd';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const Stars = ({ onChange }) => {
    const [value, setValue] = useState(0);

    const handleRateChange = (value) => {
        setValue(value);
        if (onChange) {
            onChange(value); // Propagate the rating change to parent component
        }
    };

    return (
        <Flex gap="middle" vertical>
            <Rate tooltips={desc} onChange={handleRateChange} value={value} />
            {value ? <span>{desc[value - 1]}</span> : null}
        </Flex>
    );
};

export default Stars;
