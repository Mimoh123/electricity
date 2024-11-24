const Form = ({ label, placeholder }) => {
  return (
    <form className="flex flex-col">
      <label className="p-1">{label}</label>
      <input
        className="w-72 border p-2 bg-white rounded-lg border-slate-300"
        placeholder={placeholder}
      />
    </form>
  );
};

export default Form;
