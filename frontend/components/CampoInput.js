export default function CampoInput({ 
  label, 
  name, 
  type = 'text', 
  defaultValue, 
  onChange, 
  required = true, 
  placeholder = '' 
}) {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}