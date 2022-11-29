import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const articleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getArticles: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.article.findMany();
  }),
});
