const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center p-12 bg-white">
      <div className="max-w-lg text-center">
        {/* Image */}
        <img 
          src="https://static.vecteezy.com/system/resources/previews/009/361/021/large_2x/flat-cartoon-characters-online-chat-illustration-concept-vector.jpg" 
          alt="Online Chat Illustration"
          className="w-[900px] h-auto rounded-lg mb-6"
        />
        
        {/* Text Content */}
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
