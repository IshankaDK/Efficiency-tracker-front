const PageHeader = ({ title }) => {
    return (
      <div className="bg-gray-200 py-4">
        <div className="max-w-7xl mx-16 px-4 sm:px-6 lg:px-4">
          <h1 className="text-3xl leading-6 font-bold text-black">{title}</h1>
        </div>
      </div>
    );
  };

  export default PageHeader