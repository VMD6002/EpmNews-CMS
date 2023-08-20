const Lodbl = () => {
  return (
    <div key="@" className="max-w-4xl mx-auto w-11/12 my-8">
      <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden">
        <div className="flex object-bottom bg-no-repeat w-full h-56 justify-center bg-logo3">
          <div className="h-56 w-3/4 my-auto bg-slate-100 animate-pulse rounded-xl" />
        </div>
        <div className="p-5">
          <div className="block mx-1 h-6 w-64 rounded animate-pulse bg-slate-600" />
          <div className="mx-1 mt-2 flex justify-between">
            <div className="h-4 w-32 animate-pulse bg-blue-900 rounded" />
            <div className="h-4 w-16 rounded animate-pulse bg-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

const LodSbl = () => {
  return (
    <div key="@" className="mx-auto my-8 lg:mx-5 w-11/12">
      <div>
        <div className="rounded-lg flex flex-row shadow-md overflow-hidden bg-logo3">
          <div className="flex object-bottom bg-no-repeat h-40 w-full justify-center mx-auto">
            <div
              className="w-24 h-full animate-pulse bg-slate-200"
            />
          </div>
          <div className="p-5 grid bg-gray-200 w-11/12 space-y-1 lg:w-auto">
            <div className="h-3 w-full lg:w-40 rounded-md animate-pulse bg-stone-400" />
            <div className="h-3 w-full lg:w-40 rounded-md animate-pulse bg-slate-400" />
            <div className="h-3 w-full lg:w-40 rounded-md animate-pulse bg-gray-400" />
            <div className="h-3 w-full lg:w-40 rounded-md animate-pulse bg-gray-400" />
            <div className="h-3 w-full lg:w-40 rounded-md animate-pulse bg-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Lodbl, LodSbl };
