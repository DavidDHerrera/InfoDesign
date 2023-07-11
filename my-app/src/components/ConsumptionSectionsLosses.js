import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { TableSection } from './TableSection';
import { FilterSection } from './FilterSection';
import { ChartSectionCostsAndConsumptionDetailed } from './ChartSectionCostsAndConsumptionDetailed';

const ConsumptionSectionsLosses = () => {
    const [data, setData] = useState([]);
    const [fechainicial, setFechaInicial] = useState(new Date('2010-01-01'));
    const [fechafinal, setFechaFinal] = useState(new Date('2010-01-03'));
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConsulta = () => {
        setLoading(true);
        setError(false);

        axios
            .post('http://localhost:4000/tramos-cliente', { fechainicial, fechafinal })
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

    const consumo = [
        {
            Header: 'Linea',
            accessor: 'Linea',
        },
        {
            Header: 'Comercial',
            accessor: 'Comercial',
        },
        {
            Header: 'Industrial',
            accessor: 'Industrial',
        },
        {
            Header: 'Residencial',
            accessor: 'Residencial',
        }
    ];
    const noResults = data.length === 0;

    return (
        <div className="chart-container">
            <h3>Consulta detallada de pérdidas de suma comercio, industrial y residencial por línea en un rango de fechas</h3>
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
                            <ChartSectionCostsAndConsumptionDetailed data={data} residencial='Residencial' comercial='Comercial' industrial='Industrial' title='Perdidas' />
                        </div>
                    )}
                    {!noResults && <TableSection columns={consumo} data={data} />}
                </>
            )}
        </div>
    );
};

export { ConsumptionSectionsLosses };
