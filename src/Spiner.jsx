export default function Spinner() {
  return (
    <>
      <div className="flex flex-col w-full h-screen bg-logo2">
        <div className="mx-auto my-auto">
          <div className="h-16 w-16 rounded-full animate-spin border-y-red-300 border-x-zinc-700 border-y-4 border-x-4 border-black" />
        </div>
        <div className="flex w-full bg-logo1">
          <p className="text-zinc-200 mx-auto py-5 text-xs">
            Nothing Down here simply here for style
          </p>
        </div>
      </div>
    </>
  );
}
