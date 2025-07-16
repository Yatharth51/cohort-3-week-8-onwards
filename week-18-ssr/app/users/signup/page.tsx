export default function Signup() {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h1>
        <LabelledInput label="E-mail" placeholder="you@example.com" type="email" />
        <LabelledInput label="Password" placeholder="••••••••" type="password" />
        <Button text="Create Account" />
      </div>
    </div>
  );
}

const LabelledInput = ({
  label,
  placeholder,
  type,
}: {
  label: string;
  placeholder: string;
  type?: string;
}) => (
  <div className="flex flex-col gap-1 mb-4">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder={placeholder}
    />
  </div>
);

const Button = ({ text }: { text: string }) => {
  return (
    <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-200">
      {text}
    </button>
  );
};
