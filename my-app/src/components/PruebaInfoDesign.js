import React, { useState } from 'react';
import { ConsumptionSectionsTotals } from './ConsumptionSectionsTotals';
import { ConsumptionSectionsDetailed } from './ConsumptionSectionsDetailed';
import { ConsumptionSectionsLosses } from './ConsumptionSectionsLosses';


// Componente para una pestaña
const Tab = ({ label, active, onClick }) => {
    return (
        <div
            className={`tab ${active ? 'active' : ''}`}
            onClick={onClick}
        >
            {label}
        </div>
    );
};

// Componente para el contenido de una pestaña
const TabContent = ({ children }) => {
    return <div className="tab-content">{children}</div>;
};

// Componente principal para el sistema de pestañas
const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="tabs-container">
            <div className="tabs">
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab.label}
                        active={index === activeTab}
                        onClick={() => handleTabClick(index)}
                    />
                ))}
            </div>
            <div className="tab-contents">
                {tabs[activeTab].component}
            </div>
        </div>
    );
};

// Ejemplo de uso
const PruebaInfoDesign = () => {
    const tabs = [
        {
            label: 'Pestaña 1',
            component: <ConsumptionSectionsTotals /> // Muestra el componente Tramos en el Tab 1
        },
        {
            label: 'Pestaña 2',
            component: <ConsumptionSectionsDetailed />
        },
        {
            label: 'Pestaña 3',
            component: <ConsumptionSectionsLosses/>
        }
    ];

    return (
        <div>
            <h1 className="chart-title">Pruebas InfoDesign</h1>
            <Tabs tabs={tabs} />
        </div>
    );
};

export { PruebaInfoDesign };
