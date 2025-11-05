type ProgressIndicatorProps = {
  a: number;
  b: number;
};

export const ProgressIndicator = ({ a, b }: ProgressIndicatorProps) => {
  const percentage = Math.floor((a / b) * 100);

  return (
    <div className="w-32">
      <div
        className="rounded-full h-1 bg-gray-700"
        style={{
          background: `linear-gradient(to right, #99a1af 0%, #99a1af ${percentage}%, #364153 ${percentage}%, #364153 100%)`,
        }}
      ></div>
    </div>
  );
};
