import { useState } from 'react';

function SelectDropDown() {
  const bankAccounts = [
    { bankName: 'Discover', lastFour: '1234' },
    { bankName: 'Chase', lastFour: '1323' },
  ];

  const [selectedBank, setSelectedBank] = useState('');

  function handleSelectChange(event) {
    setSelectedBank(event.target.value);
  }

  const displayOptions = bankAccounts.map((bank) => (
    <option key={bank.bankName} value={bank.bankName}>
      {bank.bankName} {bank.lastFour}
    </option>
  ));

  return (
    <div>
      <h2>Select Bank</h2>
      <select value={selectedBank} onChange={handleSelectChange}>
        <option value="">Choose Bank</option>
        {displayOptions}
      </select>
      <p>Selected Bank: {selectedBank}</p>
    </div>
  );
}

export default SelectDropDown;
