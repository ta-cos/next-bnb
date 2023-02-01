import React, { useState } from 'react'
import Header from '../../components/Header'

function bookings() {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        console.log(e)
    }

    return (
        <div>
            <Header />
            <h1>Create your booking</h1>
            <form
                onSubmit={e => handleSubmit(e)}
                className='form'

            >
                <label
                    htmlFor="start"
                >
                    Start date:
                </label>
                <input
                    type="date"
                    id="start"
                    name="trip-start"
                    value={startDate}
                    min="2018-01-01"
                    onChange={e => setStartDate(e.target.value)}
                />
                <label htmlFor="end">End date:</label>
                <input
                    type="date"
                    id="end"
                    name="trip-end"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    min="2018-01-01"
                />
            </form>
            <style jsx>
                {`
                .form {
                display: flex;
                flex-direction: column;
                width: 200px;
                }
                `}
            </style>
        </div>
    )
}

export default bookings
