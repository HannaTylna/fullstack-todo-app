import React from 'react';

export default function TodoForm() {
    return (
        <div className='input-field mt2'>
            <input type='text' id='title' placeholder='What do you need to do?'/>
            <label htmlFor='title' className='active'>
                What do you need to do?
            </label>
        </div>
    )
}