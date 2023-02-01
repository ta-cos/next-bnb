import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";


export type BookingProps = {
    id: string;
    spotId: string;
    userId: string;
    startDate: string;
    endDate: string;
};

const Booking: React.FC<{ booking: BookingProps }> = ({ booking }) => {

    return (
        <h1>Booking thing</h1>
    )
}

export default Booking;
