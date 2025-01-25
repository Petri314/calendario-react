import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RotativeShiftCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0)); // January 2025
  const [currentShift, setCurrentShift] = useState("SSTK2"); // Default shift SSTK2
  const today = new Date();

  const shifts = [
    { color: "bg-orange-200", type: "Tarde" },
    { color: "bg-blue-200", type: "Mañana" },
    { color: "bg-blue-900", type: "Noche" },
  ];

  const shiftTurnMapping: { [key: string]: number[] } = {
    SSTK1: [2, 0, 1], // Mañana, Noche, Tarde
    SSTK2: [1, 2, 0], // Tarde, Mañana, Noche
    SSTK3: [0, 1, 2], // Noche, Tarde, Mañana
  };

  const holidaysInChile: { [key: string]: string } = {
    "2025-01-01": "Año Nuevo",
    "2025-04-18": "Viernes Santo",
    "2025-04-19": "Sábado Santo",
    "2025-05-01": "Día del Trabajo",
    "2025-05-21": "Día de las Glorias Navales",
    "2025-06-29": "San Pedro y San Pablo",
    "2025-07-16": "Día de la Virgen del Carmen",
    "2025-08-15": "Asunción de la Virgen",
    "2025-09-18": "Día de la Independencia Nacional",
    "2025-09-19": "Día de las Glorias del Ejército",
    "2025-10-12": "Encuentro de Dos Mundos",
    "2025-10-31": "Día de las Iglesias Evangélicas",
    "2025-11-01": "Día de Todos los Santos",
    "2025-12-08": "Inmaculada Concepción",
    "2025-12-25": "Navidad",
  };

  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Calculate the initial shift for the current month
    const startDate = new Date(2025, 0, 1); // Start from January 1, 2025
    const daysSinceStartDate = Math.floor(
      (firstDay.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const initialShift = (Math.floor(daysSinceStartDate / 7) + 2) % 3; // Start with 'Tarde' shift

    // Adjust to start week on Monday
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    for (let i = 0; i < startingDay; i++) {
      days.push({ date: null, shiftWeek: null });
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const fullDate = new Date(year, month, day);
      const weeksSinceFirstMonday = Math.floor(
        (fullDate.getDate() + startingDay - 1) / 7
      );
      const shiftWeek = (initialShift + weeksSinceFirstMonday) % 3;
      const shiftType = shiftTurnMapping[currentShift][shiftWeek];
      days.push({
        date: day,
        shiftWeek: shiftType,
        fullDate: fullDate,
        isHoliday: holidaysInChile[fullDate.toISOString().split("T")[0]],
      });
    }

    return days;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const todayElement = document.querySelector(".today");
      if (todayElement) {
        todayElement.classList.toggle("today-expanded");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderCalendar = () => {
    const days = generateCalendar(currentMonth);

    const monthName =
      currentMonth
        .toLocaleString("es-ES", {
          month: "long",
          year: "numeric",
        })
        .replace("de ", "") // Remove "de"
        .charAt(0)
        .toUpperCase() +
      currentMonth
        .toLocaleString("es-ES", {
          month: "long",
          year: "numeric",
        })
        .replace("de ", "")
        .slice(1); // Capitalize first letter

    return (
      <div>
        <div className="bg-white p-4 rounded-lg shadow-md flex">
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-4">
              <button
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition-colors"
                onClick={() => {
                  if (
                    currentMonth.getFullYear() > 2025 ||
                    currentMonth.getMonth() > 0
                  ) {
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1,
                        1
                      )
                    );
                  }
                }}
              >
                <ChevronLeft />
              </button>
              <h2
                className="text-xl font-bold"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                {monthName}
              </h2>
              <button
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition-colors"
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() + 1,
                      1
                    )
                  )
                }
              >
                <ChevronRight />
              </button>
            </div>
            <div className="flex justify-center mb-4">
              {["SSTK1", "SSTK2", "SSTK3"].map((shift) => (
                <button
                  key={shift}
                  className={`mx-2 px-4 py-2 rounded ${
                    currentShift === shift
                      ? "bg-gray-200 font-bold text-black"
                      : "bg-gray-200 text-gray-700 opacity-50"
                  } hover:bg-gray-300 transition-colors`}
                  onClick={() => setCurrentShift(shift)}
                >
                  {shift}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
                <div
                  key={day}
                  className="font-bold"
                  style={{ fontFamily: "Open Sans, sans-serif" }}
                >
                  {day}
                </div>
              ))}
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`p-2 border h-8 flex items-center justify-center ${
                    day.date
                      ? `${
                          day.isHoliday
                            ? "bg-red-200 hover:bg-opacity-75 relative" // Highlight holidays
                            : shifts[day.shiftWeek]?.color
                        } hover:bg-opacity-75 relative`
                      : "bg-gray-100"
                  } ${
                    day.fullDate &&
                    day.fullDate.toDateString() === today.toDateString()
                      ? "border-2 border-red-500 today"
                      : ""
                  }`}
                  style={{ fontFamily: "Open Sans, sans-serif" }}
                >
                  {day.date}
                  {day.isHoliday && (
                    <div className="text-xs absolute inset-0 flex items-center justify-center">
                      🎉
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          {shifts.map((shift, index) => (
            <div key={index} className="flex items-center mx-4">
              <div
                className={`w-4 h-4 rounded-full ${shift.color}`}
                style={{
                  minWidth: "1rem",
                  minHeight: "1rem",
                  border: "1px solid #000",
                }}
              ></div>
              <span
                className="text-sm font-semibold"
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  marginLeft: "0.5rem",
                }}
              >
                {shift.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return <div className="container mx-auto p-4">{renderCalendar()}</div>;
};

export default RotativeShiftCalendar;
