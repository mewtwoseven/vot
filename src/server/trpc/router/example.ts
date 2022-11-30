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
    const results = data.results[i]

    await prisma.article.create({
      data: {
        title: results.title,
        rank: i + 1,
        url: results.url,
        source: results.source,
        publishedDate: results.published_date,
        keywords: results.adx_keywords,
        author: results.byline,
        summary: results.abstract,
        imageCaption: results.media[0].caption,
        image: results.media[0]["media-metadata"][1].url
      }
    })
  }
}

export const exampleRouter = router({
  getArticles: publicProcedure
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
  hasUserVoted: publicProcedure
    .input(z.string())
    // Pass in the user id on login to find hasVoted
    .query(async (userIdData) => {
      const arrayArticleId = [];
      //Gets the 10 articles of the day and sends them back to the front end
      const articles = await prisma.article.findMany({
        orderBy: {
          id: 'desc',
        },
        take: 10
      }
      );

      for (const article of articles) {
        arrayArticleId.push(article.id)
      }

      //Tells the front end which of these 10 articles has the user already voted on
      const hasVoted = await prisma.vote.findMany(
        {
          where: {
            userId: {
              equals: userIdData.input,
            },
            articleId: {
              gte: arrayArticleId[arrayArticleId.length - 1]
            }
          }
        });
      return {
        articles,
        hasVoted
      }
    }),


  creatingVote: publicProcedure
    .input(z.object({ userId: z.string(), articleId: z.number(), vote: z.boolean() }))
    .query(async ({ input }) => {
      console.log(input)
      // the front end should send userId, articleId and vote result to create a vote
      // If the user has already voted, the front end should prevent requests to the server
      const createVote = await prisma.vote.create({
        data: {
          userId: input.userId,
          articleId: input.articleId,
          vote: input.vote,
        }
      })
      return createVote;
    }),
});
