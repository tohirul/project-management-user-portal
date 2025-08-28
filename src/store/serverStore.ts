import { makeStore } from "@/store/store";

const serverStore = makeStore();
export type ServerStore = typeof serverStore;
export type ServerDispatch = ServerStore["dispatch"]; // <- important
export default serverStore;
