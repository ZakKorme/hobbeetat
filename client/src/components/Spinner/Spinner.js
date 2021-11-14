const Spinner = () => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ paddingTop: "10%" }}
    >
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
    </div>
  );
};

export default Spinner;
