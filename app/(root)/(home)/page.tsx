import MeetingTypeList from "@/components/MeetingTypeList";

const Home = () => {
  const now = new Date();
  const date = new Intl.DateTimeFormat("lookup", { dateStyle: "full" }).format(
    now
  );
  const time = now.toLocaleTimeString("lookup", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="flex flex-col size-full gap-10 text-white">
      <div className="h-72 w-full bg-gradient-to-r from-[#19376D] via-[#27374D] to-gray-700 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-0 border-[0.3px] border-gray-900">
        <div className="flex h-full flex-col justify-between px-3 py-6 md:px-5 md:py-8 lg:p-11">
          {/* <h2 className="glassmorphism max-w-64 rounded-md py-2 text-center text-base font-normal">
            Upcoming meeting at 8:00 AM
          </h2> */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl lg:text-7xl font-extrabold">{time}</h1>
            <p className="text-lg lg:text-2xl font-medium text-sky-1">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
