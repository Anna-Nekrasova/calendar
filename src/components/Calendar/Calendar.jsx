import React from 'react';
import './Calendar.css';

function Calendar() {
    const weekDayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const YEAR = 2024;

    function getDayOfWeek(date) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0) {
            return 6
        } else {
            return dayOfWeek - 1;
        }
    }

    function getMonthData(month) {
        const result = [];
        const date = new Date(YEAR, month);
        const daysInMonth = DAYS_IN_MONTH[month];
        const monthStartsOn = getDayOfWeek(date);
        let day = 1;

        for (let i = 0; i < (daysInMonth + monthStartsOn) / 7; i++) {
            result[i] = [];

            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
                    result[i][j] = undefined;
                } else {
                    result[i][j] = new Date(YEAR, month, day++);
                }
            }
        }

        return result;
    }

    const now = new Date();
    const month = now.getMonth();
    const currentMonth = monthNames[month];
    const [monthInTable, setMonthInTable] = React.useState(currentMonth);
    const [monthInTableIndex, setMonthInTableIndex] = React.useState(month);

    function handleMonthBeforeClick() {
        if (monthInTableIndex !== 0) {
            setMonthInTableIndex(monthInTableIndex - 1);
            setMonthInTable(monthNames[monthInTableIndex - 1]);
        } else {
            setMonthInTableIndex(11);
            setMonthInTable(monthNames[11]);
        }
    };

    function handleMonthAfterClick() {
        if (monthInTableIndex !== 11) {
            setMonthInTableIndex(monthInTableIndex + 1);
            setMonthInTable(monthNames[monthInTableIndex + 1]);
        } else {
            setMonthInTableIndex(0);
            setMonthInTable(monthNames[0]);
        }
    };

    const monthData = getMonthData(monthInTableIndex);

    return (
        <div className='calendar'>
            <h1 className='title'>Календарь 2024</h1>
            <header className='header'>
                <button className='header__button header__button_before' type='button' onClick={handleMonthBeforeClick}>{'<'}</button>
                <p className='header__month'>{monthInTable}</p>
                <button className='header__button header__button_after' type='button' onClick={handleMonthAfterClick}>{'>'}</button>
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
                            {week.map((date, index) => date ?
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