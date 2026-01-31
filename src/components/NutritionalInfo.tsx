import React from 'react';

const NutritionalInfo = () => {
  const stats = [
    { label: 'Calories', value: '450', unit: 'kcal' },
    { label: 'Protein', value: '24', unit: 'g' },
    { label: 'Carbs', value: '52', unit: 'g' },
    { label: 'Fat', value: '18', unit: 'g' },
  ];

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
      <h3 className='font-heading text-lg font-bold text-gray-900 mb-4'>
        Nutritional Info (per serving)
      </h3>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className='bg-primary-50 rounded-xl p-3 text-center'
          >
            <p className='text-primary-600 font-bold text-xl'>
              {stat.value}
              <span className='text-xs font-normal ml-0.5'>{stat.unit}</span>
            </p>
            <p className='text-gray-500 text-xs uppercase tracking-wider font-bold mt-1'>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <p className='text-xs text-gray-400 mt-4 text-center'>
        * Percent Daily Values are based on a 2,000 calorie diet.
      </p>
    </div>
  );
};

export default NutritionalInfo;
