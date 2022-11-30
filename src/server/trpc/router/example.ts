import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { z } from "zod";

import { router, publicProcedure } from "../trpc";
// Creating Articles

async function main() {
  async function getData() {
    const res = await fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=igvpTluLJ9nBd9ew1LdH23lY0oWjKpfS');
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }
  const data = await getData()
  for (let i = 0; i < 10; i++) {
    let results = data.results[i]

    const article = await prisma.article.create({
      data: {
        title: results.title, rank: i + 1, url: results.url, source: results.source, publishedDate: results.published_date, keywords: results.adx_keywords, author: results.byline, summary: results.abstract, imageCaption: results.media[0].caption, image: results.media[0]["media-metadata"][1].url
      }
    })
  }
}

export const exampleRouter = router({
  wgetArticle: publicProcedure
    // .input(z.object({ text: z.string().nullish() }).nullish())
    .query(() => {
      // async function anotherFunction() {
      //   await getData();
      // }
      main()
        .then(async () => {
          await prisma.$disconnect()
        })
        .catch(async (err) => {
          console.log(err)
          await prisma.$disconnect()
          process.exit(1)
        })

      return "Did data go through?"


    }),
  getArticle: publicProcedure.query(() => {
    return prisma.article.findMany(
      {
      orderBy: {
        id: 'desc',
      },
      take:10
    }
    );
  }),
});
