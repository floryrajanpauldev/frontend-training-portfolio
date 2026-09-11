function Employee() {
  const employee = {
    name: 'Anita',
    role: 'Frontend Developer',
    department: 'Engineering',
  };

  return (
    <li>
      <strong>{employee.name}</strong>
      <span> — {employee.role}</span>
      <small> ({employee.department})</small>
    </li>
  );
}

export default Employee;
