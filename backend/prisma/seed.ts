// prisma/seed.ts
import { PrismaClient } from "../src/generated/prisma";
import { UserRole } from "../src/generated/prisma";

const prisma = new PrismaClient();

// const users = [
//   {
//     firstName: "Bekam",
//     lastName: "Genene",
//     email: "bekam@gmail.com",
//     skills: ["Software Developer", "AI/ML Engineer"],
//   },
//   {
//     firstName: "Segni",
//     lastName: "Tsega",
//     email: "segni@gmail.com",
//     skills: ["Fullstack Developer", "Agentic AI Developer"],
//   },{
//     firstName: "Hana",
//     lastName: "Minaleshewa",
//     email: "hana@gmail.com",
//     skills: ["UI/UX Designer"],
//   },
//   {
//     firstName: "Tadese",
//     lastName: "Asefa",
//     role: UserRole.ADMIN,
//     email: "admin@gmail.com",
//     skills: ["Management", "Strategic Desicions"],
//   },
// ];

// const id1 = "0966513e-2ecc-42af-b0c0-fc5541818a62";
// const id2 = "7cc95a79-7011-4a9a-a803-b0c4320c938c";
// const id3 = "dcacdda8-9987-437e-9210-96021672a6f5";
// const id4 = "e641e1c1-3572-429b-a208-21bc84802acb";

// const docs = [
//   {
//     title: "Employee Onboarding Guide",
//     description: "Guidelines to support employee onboarding",
//     author: "Tadese Asefa",
//     category: ["Guide", "Onboarding", "HR"],
//     documentUrl: "https://kissflow.com/hr/employee-onboarding/employee-onboarding-guide/",
//     downloads: 20,
//     views: 150,
//   },
//   {
//     title: "Brand Guidelines 2024",
//     description: "2024 Brand guidlines",
//     author: "Hana Minaleshewa",
//     category: ["Branding", "design", "guidelines"],
//     documentUrl: "https://brandingstyleguides.com/",
//     downloads: 5,
//     views: 50,
//   },
//   {
//     title: "API Documentation Standards",
//     description: "How to document your RESTful APIs",
//     author: "Segni Tsega",
//     category: ["API", "Documentation", "Standards"],
//     documentUrl: "https://apidog.com/blog/api-reference-vs-documentation",
//     downloads: 12,
//     views: 100,
//   },
//   {
//     title: "Time Management",
//     description: "Learn the proven ways to effectively manage your time",
//     author: "Bekam Genene",
//     category: ["Guide", "Standards"],
//     documentUrl: "https://extension.uga.edu/",
//     downloads: 10,
//     views: 25,
//   },
// ];

// const docVersions = [
//     {
//         version: 1,
//         documentId: "0966513e-2ecc-42af-b0c0-fc5541818a62",
//         documentUrl: "https://kissflow.com/hr/employee-onboarding/employee-onboarding-guide/",
//     },
//     {
//         version: 1,
//         documentId: "7cc95a79-7011-4a9a-a803-b0c4320c938c",
//         documentUrl: "https://brandingstyleguides.com/",
//     },
//     {
//         version: 1,
//         documentId: "dcacdda8-9987-437e-9210-96021672a6f5",
//         documentUrl: "https://apidog.com/blog/api-reference-vs-documentation",
//     },
//     {
//         version: 1,
//         documentId: "e641e1c1-3572-429b-a208-21bc84802acb",
//         documentUrl: "https://extension.uga.edu/",
//     },
// ]

// const articles = [
//   {
//     title: "Remote Work Best Practices",
//     description: "Guidelines and tips for effective remote work",
//     author: "Bekele Arega",
//     category: ["remote work", "productivity", "collaboration"],
//     views: 30,
//     likes: 10,
//   },
//   {
//     title: "Effective Team Communication",
//     description: "How to improve communication within your team..",
//     author: "Meron Alemu",
//     category: ["communication", "teamwork"],
//     views: 100,
//     likes: 40,
//   },
//   {
//     title: "Time Management Strategies",
//     description:
//       "Techniques to manage your time better and increase productivity...",
//     author: "Abdi Chala",
//     category: ["time management", "productivity", "focus"],
//     views: 80,
//     likes: 35,
//   },
// ];

// const da = "";

// const discussions = [
//   {
//     title: "Best practices for team collaboration",
//     description:
//       "What are your favorite tools and techniques for team collaboration?",
//     authorName: "Segni Tsega",
//     category: ["collaboration", "tools", "productivity"],
//     likes: 23,
//     replies: 2,
//     authorId: "81eb9834-5ed5-4d14-9350-d863fe605e2a",
//   },
// ];

async function main() {
  await prisma.replies.create({
    data: {
      discussionId: "4642599f-1686-4498-8733-ee8ecefa9a35",
      userId: "81eb9834-5ed5-4d14-9350-d863fe605e2a",
      message: "Yes, many organizations and teams are actively working with the latest AI-powered tools across enterprise, legal, and industrial domains. Microsoft 365 Copilot, integrated into Teams, Outlook, Word, Excel, and PowerPoint, has become one of the most widely adopted generative AI solutions in the enterprise. Around 52% of enterprises already use it, and many evaluate its capabilities daily, from content creation to meeting recaps and analytics within Teams.",
    },
  });
}

// main()
//   .then(() => {
//     console.log("Seeding complete ✅");
//   })
//   .catch((e) => {
//     console.error("Seeding failed ❌", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
