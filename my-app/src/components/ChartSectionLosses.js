import { VictoryBar, VictoryChart, VictoryAxis, VictoryLegend, VictoryTooltip } from 'victory';

const ChartSectionLosses = ({ data }) => {
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
            { name: 'Perdidas', symbol: { fill: 'rgba(0, 0, 0, 0.8)' } },
          ]}
        />
        <VictoryBar
          data={data}
          x="Linea"
          y={datum => datum.perdidas}
          barWidth={10}
          labels={({ datum }) => `Valor: ${datum.perdidas}`}
          labelComponent={<VictoryTooltip />}
          style={{
            data: { fill: 'rgba(0, 0, 0, 0.8)' }, // Estilo de las barras
            labels: { fontSize: 8, fill: 'black' }, // Estilo de las etiquetas de las barras
          }}
        />
      </VictoryChart>
    </div>
  );
};

export { ChartSectionLosses };
