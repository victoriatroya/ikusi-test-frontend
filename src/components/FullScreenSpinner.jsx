import Spinner from "./Spinner";

const FullScreenSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
        <Spinner size="lg" />
      </div>
    </div>
  );
};

export default FullScreenSpinner;
