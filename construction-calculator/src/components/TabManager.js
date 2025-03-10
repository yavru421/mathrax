import { useState } from 'react';
import BasicCalculator from './BasicCalculator';
import Calculator from './Calculator';

const TabManager = () => {
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Basic Calculator' },
    { id: 'construction', label: 'Construction' },
    { id: 'concrete', label: 'Concrete' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicCalculator />;
      case 'construction':
        return <Calculator mode="construction" />;
      case 'concrete':
        return <Calculator mode="concrete" />;
      default:
        return <BasicCalculator />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default TabManager;
