import { VictoryBar, VictoryChart, VictoryAxis, VictoryLegend, VictoryTooltip, VictoryGroup, VictoryLabel } from 'victory';

const ChartSectionCostsAndConsumptionDetailed = ({ data, residencial, comercial, industrial, title }) => {
  return (
    <div className="chart-wrapper">
      <VictoryChart padding={{ top: 20, bottom: 40, left: 60, right: 20 }}>
        <VictoryLabel
          text={title}
          x={100}
          y={-10}
          textAnchor="middle"
          style={{ fontSize: 18, fontWeight: 'bold' }}
        />
        <VictoryAxis
          tickValues={data.map(item => item.Linea)}
          style={{
            tickLabels: { fontSize: 10, padding: 5, angle: -45, textAnchor: 'end' },
            axis: { stroke: '#ccc' }, // Estilo del eje
            ticks: { stroke: '#ccc' }, // Estilo de las marcas del eje
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { fontSize: 10, padding: 5 },
            axis: { stroke: '#ccc' }, // Estilo del eje
            ticks: { stroke: '#ccc' }, // Estilo de las marcas del eje
            grid: { stroke: '#ddd', strokeWidth: 1 }, // Estilo de la cuadrícula del eje y
          }}
        />
        <VictoryLegend
          x={100}
          y={0}
          orientation="horizontal"
          gutter={5}
          style={{
            labels: { fontSize: 10 },
          }}
          data={[
            { name: residencial, symbol: { fill: 'rgba(75, 192, 192, 1)' } },
            { name: comercial, symbol: { fill: 'rgba(54, 162, 235, 1)' } },
            { name: industrial, symbol: { fill: 'rgba(255, 99, 132, 1)' } },
          ]}
        />
        <VictoryGroup offset={10} colorScale={['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)']}>
          <VictoryBar
            data={data}
            x="Linea"
            y={datum =>
              residencial === 'Consumo Residencial'
                ? datum.consumo_residencial
                : residencial === 'Costo Residencial'
                  ? datum.costo_residencial
                  : residencial === 'Perdidas Residencial'
                    ? datum.perdidas_residencial
                    : residencial === 'Residencial'
                      ? datum.Residencial
                      : 0
            }
            barWidth={10}
            labels={({ datum }) =>
              residencial === 'Consumo Residencial'
                ? `Consumo Residencial: ${datum.consumo_residencial}`
                : residencial === 'Costo Residencial'
                  ? `Costo Residencial: ${datum.costo_residencial}`
                  : residencial === 'Perdidas Residencial'
                    ? `Perdidas Residencial: ${datum.perdidas_residencial}`
                    : residencial === 'Residencial'
                      ? `Perdidas Residencial: ${datum.Residencial}`
                      : ''
            }
            labelComponent={<VictoryTooltip />}
            style={{
              data: { fill: 'rgba(75, 192, 192, 0.8)' }, // Estilo de las barras
              labels: { fontSize: 8, fill: 'black' }, // Estilo de las etiquetas de las barras
            }}
          />
          <VictoryBar
            data={data}
            x="Linea"
            y={datum =>
              comercial === 'Consumo Comercial'
                ? datum.consumo_comercial
                : comercial === 'Costo Comercial'
                  ? datum.costo_comercial
                  : comercial === 'Perdidas Comercial'
                    ? datum.perdidas_comercial
                    : comercial === 'Comercial'
                      ? datum.Comercial
                      : 0
            }
            barWidth={10}
            labels={({ datum }) =>
              comercial === 'Consumo Comercial'
                ? `Consumo Comercial: ${datum.consumo_comercial}`
                : comercial === 'Costo Comercial'
                  ? `Costo Comercial: ${datum.costo_comercial}`
                  : comercial === 'Perdidas Comercial'
                    ? `Perdidas Comercial: ${datum.perdidas_comercial}`
                    : comercial === 'Comercial'
                      ? `Perdidas Comercial: ${datum.Comercial}`
                      : ''
            }
            labelComponent={<VictoryTooltip />}
            style={{
              data: { fill: 'rgba(54, 162, 235, 0.8)' }, // Estilo de las barras
              labels: { fontSize: 8, fill: 'black' }, // Estilo de las etiquetas de las barras
            }}
          />
          <VictoryBar
            data={data}
            x="Linea"
            y={datum =>
              industrial === 'Consumo Industrial'
                ? datum.consumo_industrial
                : industrial === 'Costo Industrial'
                  ? datum.costo_industrial
                  : industrial === 'Perdidas Industrial'
                    ? datum.perdidas_industrial
                    : industrial === 'Industrial'
                      ? datum.Industrial
                      : 0
            }
            barWidth={10}
            labels={({ datum }) =>
              industrial === 'Consumo Industrial'
                ? `Consumo Industrial: ${datum.consumo_industrial}`
                : industrial === 'Costo Industrial'
                  ? `Costo Industrial: ${datum.costo_industrial}`
                  : industrial === 'Perdidas Industrial'
                    ? `Perdidas Industrial: ${datum.perdidas_industrial}`
                    : industrial === 'Industrial'
                      ? `Perdidas Industrial: ${datum.Industrial}`
                      : ''
            }
            labelComponent={<VictoryTooltip />}
            style={{
              data: { fill: 'rgba(255, 99, 132, 0.8)' }, // Estilo de las barras
              labels: { fontSize: 8, fill: 'black' }, // Estilo de las etiquetas de las barras
            }}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};

export { ChartSectionCostsAndConsumptionDetailed };
