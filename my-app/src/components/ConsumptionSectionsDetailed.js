import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { TableSection } from './TableSection';
import { ChartSectionCostsAndConsumptionDetailed } from './ChartSectionCostsAndConsumptionDetailed';
import { FilterSection } from './FilterSection';

const ConsumptionSectionsDetailed = () => {
    const [data, setData] = useState([]);
    const [fechainicial, setFechaInicial] = useState(new Date('2010-01-01'));
    const [fechafinal, setFechaFinal] = useState(new Date('2010-01-03'));
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConsulta = () => {
        setLoading(true);
        setError(false);
        axios
            .post('http://localhost:4000/cliente', { fechainicial, fechafinal })
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
        // eslint-disable-next-line
    }, []);
    const consumo = [
        {
            Header: 'Linea',
            accessor: 'Linea',
        },
        {
            Header: 'Consumo Comercial',
            accessor: 'consumo_comercial',
        },
        {
            Header: 'Consumo Industrial',
            accessor: 'consumo_industrial',
        },
        {
            Header: 'Consumo Residencial',
            accessor: 'consumo_residencial',
        }
    ];

    const costos = [
        {
            Header: 'Linea',
            accessor: 'Linea',
        },
        {
            Header: 'Costo Comercial',
            accessor: 'costo_comercial',
        },
        {
            Header: 'Costo Industrial',
            accessor: 'costo_industrial',
        },
        {
            Header: 'Costo Residencial',
            accessor: 'costo_residencial',
        }
    ];

    const perdidas = [
        {
            Header: 'Linea',
            accessor: 'Linea',
        },
        {
            Header: 'Perdidas Comercial',
            accessor: 'perdidas_comercial',
        },
        {
            Header: 'Perdidas Industrial',
            accessor: 'perdidas_industrial',
        },
        {
            Header: 'Perdidas Residencial',
            accessor: 'perdidas_residencial',
        }
    ]
    const noResults = data.length === 0;

    return (
        <div className="chart-container">
            <h3>Consulta detallada de consumo, pérdidas y costo por línea en un rango de fechas</h3>
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
                            <ChartSectionCostsAndConsumptionDetailed data={data} residencial='Consumo Residencial' comercial='Consumo Comercial' industrial='Consumo Industrial' title='Consumo' />
                            <ChartSectionCostsAndConsumptionDetailed data={data} residencial='Costo Residencial' comercial='Costo Comercial' industrial='Costo Industrial' title='Costo' />
                            <ChartSectionCostsAndConsumptionDetailed data={data} residencial='Perdidas Residencial' comercial='Perdidas Comercial' industrial='Perdidas Industrial' title='Perdidas' />

                        </div>
                    )}
                    {
                        !noResults &&
                        (
                            <>
                                <h4>Consumo</h4>
                                <TableSection columns={consumo} data={data} />
                                <h4>Costos</h4>
                                <TableSection columns={costos} data={data} />
                                <h4>Perdidas</h4>
                                <TableSection columns={perdidas} data={data} />
                            </>
                        )
                    }
                </>
            )}
        </div>
    );
};

export { ConsumptionSectionsDetailed };
