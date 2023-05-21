import { z } from "zod";

import { createTRPCRouter, publicProcedure, adminProcedure } from "../trpc";

export const orderRouter = createTRPCRouter({
  change: adminProcedure
    .input(
      z
        .object({
          order: z.number().positive().gte(1),
          timeStart: z.string(),
          timeEnd: z.string(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.order.update({
        where: {
          order: input.order,
        },
        data: {
          timeStart: input.timeStart,
          timeEnd: input.timeEnd,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.order.findMany();
  }),
});
