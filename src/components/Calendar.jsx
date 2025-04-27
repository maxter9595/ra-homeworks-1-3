import React from 'react';
import './ui-datepicker.css';

const Calendar = ({ date }) => {
  const getDayName = (date) => {
    const days = [
      'Воскресенье', 
      'Понедельник', 
      'Вторник', 
      'Среда', 
      'Четверг', 
      'Пятница',
      'Суббота'
    ];
    return days[date.getDay()];
  };

  const getMonthNameGenitive = (month) => {
    const months = [
      'Января', 
      'Февраля', 
      'Марта', 
      'Апреля', 
      'Мая', 
      'Июня',
      'Июля', 
      'Августа', 
      'Сентября', 
      'Октября', 
      'Ноября', 
      'Декабря'
    ];
    return months[month];
  };

  const getMonthNameNominative = (month) => {
    const months = [
      'Январь', 
      'Февраль', 
      'Март', 
      'Апрель', 
      'Май', 
      'Июнь',
      'Июль', 
      'Август', 
      'Сентябрь', 
      'Октябрь', 
      'Ноябрь', 
      'Декабрь'
    ];
    return months[month];
  };

  const generateCalendarGrid = () => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDay = new Date(firstDay);
    startDay.setDate(1 - (firstDay.getDay() || 7) + 1);
    
    const endDay = new Date(lastDay);
    endDay.setDate(lastDay.getDate() + (7 - (lastDay.getDay() || 7)));
    
    const weeks = [];
    let currentDay = new Date(startDay);
    
    while (currentDay <= endDay) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(currentDay));
        currentDay.setDate(currentDay.getDate() + 1);
      }
      weeks.push(week);
    }
    
    return weeks;
  };

  const weeks = generateCalendarGrid();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{getDayName(date)}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{currentDay}</div>
          <div className="ui-datepicker-material-month">{getMonthNameGenitive(currentMonth)}</div>
          <div className="ui-datepicker-material-year">{currentYear}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{getMonthNameNominative(currentMonth)}</span>&nbsp;
          <span className="ui-datepicker-year">{currentYear}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => {
                const isOtherMonth = day.getMonth() !== currentMonth;
                const isToday = 
                  day.getDate() === currentDay && 
                  day.getMonth() === currentMonth && 
                  day.getFullYear() === currentYear;
                
                const classNames = [
                  isOtherMonth ? 'ui-datepicker-other-month' : '',
                  isToday ? 'ui-datepicker-today' : ''
                ].filter(Boolean).join(' ');
                
                return (
                  <td key={dayIndex} className={classNames || undefined}>
                    {day.getDate()}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
