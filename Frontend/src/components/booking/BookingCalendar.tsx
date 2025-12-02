import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../common/Button';

interface BookingCalendarProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  unavailableDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
}

export const BookingCalendar = ({
  selectedDate,
  onDateSelect,
  unavailableDates = [],
  minDate = new Date(),
  maxDate
}: BookingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? new Date(selectedDate) : new Date()
  );

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isDateUnavailable = (date: Date): boolean => {
    return unavailableDates.some(
      unavailableDate =>
        unavailableDate.toDateString() === date.toDateString()
    );
  };

  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    if (isDateUnavailable(date)) return true;

    return false;
  };

  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

    if (!isDateDisabled(date)) {
      onDateSelect(date);
    }
  };

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const disabled = isDateDisabled(date);
      const selected = isDateSelected(date);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateClick(day)}
          disabled={disabled}
          className={`
            aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all
            ${disabled
              ? 'text-neutral-300 cursor-not-allowed bg-neutral-50'
              : 'text-neutral-900 hover:bg-primary-50 hover:text-primary-600 cursor-pointer'
            }
            ${selected
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : ''
            }
            ${isToday && !selected
              ? 'border-2 border-primary-600'
              : ''
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-h4 text-neutral-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousMonth}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextMonth}
            leftIcon={<ChevronRight className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-neutral-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-6 pt-4 border-t border-neutral-200 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-primary-600 rounded" />
          <span className="text-neutral-600">Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary-600 rounded" />
          <span className="text-neutral-600">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-neutral-50 rounded" />
          <span className="text-neutral-600">Unavailable</span>
        </div>
      </div>
    </div>
  );
};
