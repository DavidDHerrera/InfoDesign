import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = forwardRef(({ onChange, ...rest }, ref) => {
  return <DatePicker {...rest} onChange={onChange} ref={ref} />;
});

const FilterSection = ({ fechainicial, fechafinal, handleFechaInicial, handleFechaFinal, handleConsulta }) => {
  const [fechaMaxima, setFechaMaxima] = useState(new Date()); // Fecha máxima permitida

  const handleChangeFechaInicial = (date) => {
    handleFechaInicial(date);
    setFechaMaxima(date); // Actualizar la fecha máxima permitida al seleccionar una nueva fecha inicial
  };

  return (
    <div className="date-picker-wrapper">
      <CustomDatePicker
        selected={fechainicial}
        onChange={handleChangeFechaInicial}
        dateFormat="yyyy-MM-dd"
        maxDate={fechaMaxima}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15}
      />
      <DatePicker
        selected={fechafinal}
        onChange={handleFechaFinal}
        dateFormat="yyyy-MM-dd"
        minDate={fechainicial}
        maxDate={new Date()}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15}
      />
      <button className="consulta-button" onClick={handleConsulta}>
        Realizar Consulta
      </button>
    </div>
  );
};

export { FilterSection };
