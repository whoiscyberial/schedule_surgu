import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { lessonRouter } from "./routers/lesson";
import { teacherRouter } from "./routers/teacher";
import { orderRouter } from "./routers/order";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  lesson: lessonRouter,
  teacher: teacherRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
