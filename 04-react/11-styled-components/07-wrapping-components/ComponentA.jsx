function ComponentA({ title, className }) {
  return (
    <div className={className}>
      <h2>{title}</h2>

      <span>This is a wrapped component.</span>
    </div>
  );
}

export default ComponentA;