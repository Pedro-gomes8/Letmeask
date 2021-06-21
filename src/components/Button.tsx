import React,{ useState } from 'react'
import Button from 'react-bootstrap/Button';

export default function CustomButton() {
    const [number, setnumber] = useState(0);
    return (
        <Button onClick={()=> setnumber(number+1)}>{number}</Button>
    )
}
