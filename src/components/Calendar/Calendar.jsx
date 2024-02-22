import React from 'react';
import './Calendar.css';

function Calendar() {
    const weekDayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

    const monthData = [
        [undefined, undefined, new Date(), new Date(), new Date(), new Date(), new Date()],
        [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
        [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
        [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
        [new Date(), new Date(), new Date(), new Date(), undefined, undefined, undefined],
    ]

    const now = new Date();
    const month = now.getMonth();
    const currentMonth = monthNames[month];
    const [monthInTable, setMonthInTable] = React.useState(currentMonth);
    const [monthInTableIndex, setMonthInTableIndex] = React.useState(month);

    function handleMonthBeforeClick() {
        setMonthInTableIndex(monthInTableIndex - 1);
        setMonthInTable(monthNames[monthInTableIndex]);
    };

    function handleMonthAfterClick() {
        setMonthInTableIndex(monthInTableIndex + 1);
        setMonthInTable(monthNames[monthInTableIndex]);
    };

    return (
        <div className='calendar'>
            <header className='header'>
                <button className='header__before' onClick={handleMonthBeforeClick}>{'<'}</button>
                <h1 className='header__month'>{monthInTable}</h1>
                <button className='header__after' onClick={handleMonthAfterClick}>{'>'}</button>
            </header>
            <table className='table'>
                <thead className='table__head'>
                    <tr className='table__day'>
                        {weekDayNames.map(name =>
                            <th key={name}>{name}</th>
                        )}
                    </tr>
                </thead>

                <tbody>
                            {monthData.map((week, index) =>
                                <tr key={index} className='calendar__week'>
                                    {week.map((date,index) => date ?
                                    <td key={index} className='calendar__day'>{date.getDate()}</td>
                                    :
                                    <td key={index} />
                                    )}
                                    </tr>
                            )}
                </tbody>
            </table>
        </div>
    );
}

export default Calendar;