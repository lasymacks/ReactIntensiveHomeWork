import React, { forwardRef, useState } from 'react';

const Header = forwardRef((props, ref) => {

    return (
        <h1 className='header' ref={ref}>{props.text}</h1>
    )
}
)
export default Header;