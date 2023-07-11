import { VictoryBar, VictoryChart, VictoryAxis, VictoryLegend, VictoryTooltip, VictoryGroup } from 'victory';

const ChartSectionCostsAndConsumptionLosses = ({ data }) => {
  return (
    <div className="chart-wrapper">
      <VictoryChart padding={{ top: 20, bottom: 40, left: 60, right: 20 }}>
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
            { name: 'Comercial', symbol: { fill: 'rgba(75, 192, 192, 1)' } },
            { name: 'Industrial', symbol: { fill: 'rgba(54, 162, 235, 1)' } },
            { name: 'Residencial', symbol: { fill: 'rgba(255, 99, 132, 1)' } },
          ]}
        />
        <VictoryGroup offset={10} colorScale={['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)']}>
          <VictoryBar
            data={data}
            x="Linea"
            y={datum => datum.Comercial}
            barWidth={10}
            labels={({ datum }) => `Perdida Comercial: ${datum.Comercial}`}
            labelComponent={<VictoryTooltip />}
            style={{
              data: { fill: 'rgba(75, 192, 192, 0.8)' }, // Estilo de las barras
              labels: { fontSize: 8, fill: 'black' }, // Estilo de las etiquetas de las barras
            }}
          />
          <VictoryBar
            data={data}
            x="Linea"
            y={datum => datum.Industrial}
            barWidth={10}
            labels={({ datum }) => `Perdida Industrial: ${datum.Industrial}`}
            labelComponent={<VictoryTooltip />}
            style={{
              data: { fill: 'rgba(54, 162, 235, 0.8)' }, // Estilo de las barras
              labels: { fontSize: 8, fill: 'black' }, // Estilo de las etiquetas de las barras
            }}
          />
          <VictoryBar
            data={data}
            x="Linea"
            y={datum => datum.Residencial}
            barWidth={10}
            labels={({ datum }) => `Perdida Residencial: ${datum.Residencial}`}
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

export { ChartSectionCostsAndConsumptionLosses };
