import React from 'react';

function Header(props) {
    let a = "fg";
    return (
        <div>
            <input type="text"  onChange={(e)=>{console.log(">>",e);}} />
        </div>
    );
}

export default Header;