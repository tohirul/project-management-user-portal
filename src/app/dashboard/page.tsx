"use server";

import { fetchList } from "@/lib/api/fetchList";
import userApi from "@/store/slice/api/endpoints/userApi";
// import serverStore, { ServerDispatch } from "@/store/serverStore";
// import userApi from "@/store/slice/api/endpoints/userApi";

export default async function Home() {
  const { result } = await fetchList(userApi);
  console.log("Users on server:", result?.data);
  return (
    <div className="bg-dark grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-(family-name:--font-geist-sans) sm:p-20">
      <div className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <h2>Dashboard | Home</h2>
        {/* You can pass result directly to your Users component */}
        {/* <Users users={result} /> */}
      </div>
    </div>
  );
}
