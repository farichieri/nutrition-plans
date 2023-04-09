import PrimaryButton from "./Buttons/Primary";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <span className="text-4xl font-bold">
        Try Nutrition Plans for free today
      </span>
      <span>
        Receive your first nutrition plan today and start your transformation
      </span>
      <div className="my-2">
        <PrimaryButton href="/subscribe" content="Start my plan now ->" />
      </div>
    </div>
  );
};

export default CallToAction;
