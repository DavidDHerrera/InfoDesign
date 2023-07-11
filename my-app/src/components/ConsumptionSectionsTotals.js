import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { TableSection } from './TableSection';
import { ChartSectionLosses } from './ChartSectionLosses';
import { ChartSectionCostsAndConsumption } from './ChartSectionCostsAndConsumption';
import { FilterSection } from './FilterSection';

const ConsumptionSectionsTotals = () => {
    const [data, setData] = useState([]);
    const [fechainicial, setFechaInicial] = useState(new Date('2010-01-01'));
    const [fechafinal, setFechaFinal] = useState(new Date('2010-01-03'));
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConsulta = () => {
        setLoading(true);
        setError(false);

        axios
            .post('http://localhost:4000/tramos', { fechainicial, fechafinal })
            .then(response => {
                console.log(response.data);
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError(true);
                setLoading(false);
            });
    };

    useEffect(() => {
        handleConsulta();
    });

    const columns = [
        {
            Header: 'Linea',
            accessor: 'Linea',
        },
        {
            Header: 'Consumo',
            accessor: 'consumo',
        },
        {
            Header: 'Costo',
            accessor: 'costo',
        },
        {
            Header: 'Perdidas',
            accessor: 'perdidas',
        },
    ];

    const noResults = data.length === 0;

    return (
        <div className="chart-container">
            <h3>Consulta de consumo total, pérdidas totales y costo total por línea en un rango de fechas</h3>
            <FilterSection
                fechainicial={fechainicial}
                fechafinal={fechafinal}
                handleFechaInicial={setFechaInicial}
                handleFechaFinal={setFechaFinal}
                handleConsulta={handleConsulta}
            />

            {loading ? (
                <p className='message-load'>Cargando resultados...</p>
            ) : error ? (
                <p className='message-error'>Error al cargar los resultados.</p>
            ) : (
                <>
                    {noResults ? (
                        <p className='message-error'>No se encontraron resultados.</p>
                    ) : (
                        <div className="flex-container">
                            <ChartSectionCostsAndConsumption data={data} />
                            <ChartSectionLosses data={data} />
                        </div>
                    )}
                    {!noResults && <TableSection columns={columns} data={data} />}
                </>
            )}
        </div>
    );
};

export { ConsumptionSectionsTotals };
