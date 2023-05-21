import { z } from "zod";

import { createTRPCRouter, publicProcedure, adminProcedure } from "../trpc";

export const lessonRouter = createTRPCRouter({
  add: adminProcedure
    .input(
      z
        .object({
          title: z.string(),
          day: z.number(),
          type: z.string(),
          office: z.string().max(10),
          order: z.number().positive().int().max(1).gte(1),
          teacherId: z.string(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.lesson.create({
        data: {
          title: input.title,
          type: input.type,
          office: input.office,
          day: input.day,
          order: input.order,
          teacherId: input.teacherId,
        },
      });
    }),

  getAllByTeacherId: publicProcedure
    .input(z.object({ teacherId: z.string() }).required())
    .query(async ({ input, ctx }) => {
      const lessons = await ctx.prisma.lesson.findMany({
        where: { teacherId: input.teacherId },
      });
      return lessons;
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }).required())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.lesson.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
