const SkPosts = () => {
  return (
    <div>
      <section className="lg:px-1 md:px-2 lg:mx-0 md:mx-0 sm:mx-5 mx-5">
        <div className="grid md:mx-auto my-1 overflow-hidden rounded-lg shadow-lg bg-gray-800">
          <div className="flex object-bottom bg-no-repeat border-gray-800 border-t-8 border-r-4 border-l-4">
            <div className="w-full bg-gray-700">
              <div className="w-full flex">
                <div className="px-9 bg-orange-300 h-5 text-sm text-white w-full rounded-t-lg" />
              </div>
              <div className="flex w-full justify-center">
                <div className="w-11/12 bg-gray-600 h-56 sm:h-64 md:h-48 lg:h-40 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="py-5 px-4">
            <div className="block text-xl font-bold text-white mb-1 text-center space-y-2">
              <div className="bg-white w-10/12 mx-auto h-2 rounded-md animate-pulse" />
              <div className="bg-white w-10/12 mx-auto h-2 rounded-md animate-pulse" />
              <div className="bg-white w-10/12 mx-auto h-2 rounded-md animate-pulse" />
            </div>
            <div className="flex flex-row justify-between w-full">
              <div className="flex px-2 py-2 rounded-full bg-blue-300 animate-pulse mb-1 mt-5 justify-center">
                <div className="h-5 w-5" />
              </div>
              <div className="mt-8 w-6/12 h-2 bg-slate-400 animate-pulse rounded-lg" />
              <div className="flex px-2 py-2 rounded-full bg-red-300 animate-pulse mb-1 mt-5 justify-center">
                <div className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { SkPosts };
