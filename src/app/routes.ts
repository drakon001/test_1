import { Home } from "../pages/Home";
import Page2 from "../pages/Page2";
import Page3 from "../pages/Page3";


export const routes = {
    "/": Home,
    "/page2": Page2,
    "/page3": Page3
} as const

export type IRoutesEntry = typeof routes;
export type IRoutes= keyof IRoutesEntry;
