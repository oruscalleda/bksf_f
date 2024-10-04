import React from 'react';

const YearSelect = ({ startYear, onChange, className }) => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year >= startYear; year--) {
    years.push(<option key={year} value={year}>{year}</option>);
  }

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
      <select onChange={handleChange} className={className}>
        <option value="" disabled>Select year</option>
        {years}
      </select>
  );
};

YearSelect.defaultProps = {
  startYear: 1950,
  onChange: (value) => {},
};

export default YearSelect;