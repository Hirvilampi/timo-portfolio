import sql from 'better-sqlite3';
const dbtv = sql('tvproductions.db');
const dbit = sql('itprojects.db');

const productions = [
    {
        title: 'Love Island Suomi',
        slug: 'love-island-suomi',
        seasons: 'season 6',
        year: '2025',
        image: '/assets/tv_images/non_square/love_island_1280.png',
        job: 'episode director',
        summary: 'I was an episode director. The Season was shot in Spain, but our control room was in Helsinki. This was a perfect opportunity to learn how to direct remotely.',
        more: 'This was my first show done in remote environment and this kind of show. I liked it.',
        company: 'ITV'
    },
    {
        title: 'Lomittajat',
        slug: 'lomittajat',
        seasons: 'season 2',
        year: '2025',
        image: '/assets/tv_images/non_square/IMG_3504_1280.png',
        job: 'field director',
        summary: 'I was on field with the crew following the people working with farm animals.',
        more: 'I really loved doing this. Honest people, country side and great crew.',
        company: 'ITV',
    },
    {
        title: 'Love It Or Leave It (Remppa vai Muutto Suomi)',
        slug: 'remppa-vai-muutto-suomi',
        seasons: 'season 3',
        year: '2024',
        image: '/assets/tv_images/non_square/RVM3.jpg',
        job: 'director & writer',
        summary: 'I wrote and directed the newest season of this very much loved renovation show.',
        more: 'It is allways nice to do shows about renovating. The exitement is very real, when people worry what is done to their home.',
        company: 'Rabbit Films',
    },
    {
        title: 'The Mole (Myyrä)',
        slug: 'myyra',
        seasons: 'season 4',
        year: '2023',
        image: '/assets/tv_images/non_square/myyra_s4_1280.png',
        job: 'director',
        summary: 'Directing this season of the finnish version of the Mole.',
        more: 'The Mole was a great experience and it became a very good show. Estonia was a great place to shoot',
        company: 'Warner Bros ITVP Finland',
    },
    {
        title: 'Myyrä Johtolangat (sideshow for The Mole)',
        slug: 'johtolangat',
        seasons: 'season 2 (season 4 of the Mole)',
        year: '2023',
        image: '/assets/tv_images/non_square/Johtolangat.png',
        job: 'director & writer',
        summary: 'Wrote and directed this sideshow created by me. Now for the second time.',
        more: 'This show is about a celebrity trying to find out the Mole after watching the episodes. To visualize investigation, the celebrity then puts clues on the board. There is also a guest, usually the competitor who was dropped from the race. They give their insides to the hunt for the mole.',
        company: 'Warner Bros ITVP Finland',
    },
    {
        title: 'Unelma Asunto Espanjasta',
        slug: 'unelma-asunto-espanjasta',
        seasons: 'season 1',
        year: '2022',
        image: '/assets/tv_images/non_square/kirsi-markus-1280.png',
        job: 'director',
        summary: 'Directed this show about finding a dream home from Spain.',
        more: 'Dreams can be made real. People with very limited budgets trying to find homes from Costa Del Sol in Spain. This was a fun show to do. Few people also got home from Spain.',
        company: 'Warner Bros ITVP Finland',
    },
    {
        title: 'The Great Finnish Bake Off (Koko Suomi Leipoo)',
        slug: 'koko-suomi-leipoo',
        seasons: 'season 7 & 8',
        year: '2021,2022',
        image: '/assets/tv_images/non_square/Kakut_IMG_7634_1280.png',
        job: 'director & writer',
        summary: 'Finnish version of the British show',
        more: 'This was a very fun show to do. The desserts were great.',
        company: 'Warner Bros ITVP Finland',
    },
    {
        title: 'Supernanny Suomi',
        slug: 'supernanny-suomi',
        seasons: 'seasons 1,2,3,4',
        year: '2018-2022',
        image: '/assets/tv_images/non_square/Nanny_IMG_5114_1280.png',
        job: 'director & writer',
        summary: 'It was great to help families grow up their kids',
        more: 'Season 2 won Kultainen Venla award. Venla is the finnish version of the Emmy award. This has been one of the most rewarding shows that I have done. Our Supernanny Pia Penttala was such a professional with kids that we very early started to more and more focus on helping the families and doing the tv-show on the side. It also became a great tv-show.',
        company: 'Warner Bros ITVP Finland',
    },
    {
        title: 'Who Do You Think You Are (Sukuni Salat)',
        slug: 'sukuni-salat',
        seasons: 'seasons 1 & 2',
        year: '2020-2021',
        image: '/assets/tv_images/non_square/Susa_IMG_1968_1280.png',
        job: 'director',
        summary: 'Directed and localized the show where celebrities find out about their roots',
        more: 'It was a fun show to do. I also started to look into my own roots. Result was, that I now have four more cousins.',
        company: 'Warner Bros ITVP Finland',
    },
    {
        title: 'Huvila ja Huussi',
        slug: 'huvila-ja-huussi',
        seasons: 'seasons 10 & 11',
        year: '2018, 2019',
        image: '/assets/tv_images/non_square/Huhu_1280.png',
        job: 'writer & director',
        summary: 'Show about renovating summer cottages',
        more: 'Started as writer but ended up director half of the 10th season. It became a very good season ending up first time in this shows history to be in the top 3 renovating shows in Venla awards',
        company: 'Endemol Shine',
    },
    {
        title: 'Amanda ja Tomi',
        slug: 'amanda-ja-tomi',
        seasons: 'shortfilm',
        year: '2014',
        image: '/assets/tv_images/non_square/Amandajatomi_1280.png',
        job: 'director, writer, editor & producer',
        summary: 'An education story about 7-year old Amanda who is going into heart surgery. Over 4 million views in Youtube',
        more: 'This film is educational film for kids who have born with heart disease. Aim is to lower the fear of going to hospital.',
        company: 'Timo Lampinen Production',
    },
    {
        title: 'Koppipelaaja',
        slug: 'koppipelaaja',
        seasons: 'humour account in instagram',
        year: '2022-2023',
        image: '/assets/tv_images/non_square/Koppipelaaja_1280.png',
        job: 'directig, editing & shooting',
        summary: 'This was a hobby project. Making skits about Ice Hockey. I was mostly behind the camera.',
        more: 'I was part of this from the beginning and stopped at the end of 2024. https://www.instagram.com/koppipelaaja/?hl=en',
        company: 'self',
    },
    {
        title: 'Seikkailija Saku',
        slug: 'seikkailija-saku',
        seasons: 'fiction series 20 * 5 min',
        year: '2011',
        image: '/assets/tv_images/non_square/SeikkailijaSaku_ja_Jano_1280.png',
        job: 'director, writer & editor',
        summary: 'Fictional childrens tv-show about a small boy who plays in his backyard with his rabbit friend.',
        more: 'We filmed a 5-year old boy in chroma studio and used a puppet rabbit. In Post we added the cartoon backgrounds.',
        company: 'Petfilms',
    },
    {
        title: '8000 Miles from HipHop (Hiphop Kiina)',
        slug: 'hiphop-kiina',
        seasons: 'documentary film',
        year: '2015',
        image: '/assets/tv_images/non_square/8000milesfromhiphop_1280.png',
        job: 'editor',
        summary: 'The Story follows a hiphop band trying to make it and where their seven year journey takes them.',
        more: 'Very complicated project. Language was chinese, director was from Taiwan and we had about six different types of media. It turned out great. Pre-version of the film won an audience award in 2012 Cinemasia Amsterdam festival.',
        company: 'Vaski Filmi',
    },

    // {
    //     title: '',
    //     seasons: '',
    //     year: '',
    //     image: '',
    //     job: '',
    //     summary: '',
    //     more: '',
    //     company: '',
    // },
];

const itprojects = [
    {
        title: 'Kimara.ai',
        slug: 'kimara.ai',
        year: '2025-2026',
        link: 'www.kimara.ai',
        gitlink: '',
        image: '/assets/it_images/non_square/kimara.ai_1280.png',
        job: 'interning in frontend development',
        summary: 'Start up company Kimara is developing stable workspaces for ComfyUI. ',
        more: 'ComfyUI is a powerful, open-source, node-based interface for generative AI. My internship was about UI/UX in early access. This included coding using AI tools like Codex, making surveys, inviting users, connecting with users over discord and many day to day activities. I learned a lot about Next.js, using AI tools, Gitlab, Linear, not making spaghetti code etc.',
        technologies: 'Next.js, React, Tailwind',
        company: 'Kimara AI',
    },
    {
        title: 'Portfolio',
        slug: 'portfolio',
        year: '2026',
        image: '/assets/it_images/non_square/portfolio_1280.png',
        link: 'www.timolampinen.com',
        gitlink: 'https://github.com/Hirvilampi/timo-portfolio/tree/main',
        job: 'softaware developer',
        summary: 'Using Next.js, typescript and Tailwind to create my portfolio on web.',
        more: '',
        technologies: 'Next.js, React, Typescript, Tailwind',
        company: 'own',
    },
    {
        title: 'Bonakota',
        slug: 'bonakota',
        year: '2025',
        link: '',
        gitlink: 'https://github.com/Hirvilampi/bonakota',
        image: '/assets/it_images/non_square/bonakota_1280.png',
        job: 'developer, creator',
        summary: 'Created an application for iPhone where you can make an inventory of your stuff and sell it to others.',
        more: 'I used react and javascript, backend was with Firebase, FireStore and the realtime database. I learned to use a lot of different technologies when doing this. This project was keps alive by me and the next step is to develop it a bit more and the publish it.',
        technologies: 'React, React Native, Expo 54, Firebase, Firestore, Storage, AsyncStorage + other react libraries',
        company: 'student work',
    },
    {
        title: 'Personal trainer',
        slug: 'personal-trainer',
        year: '2024',
        link: 'https://personaltrainer-orpin.vercel.app/',
        gitlink: 'https://github.com/Hirvilampi/personaltrainer',
        image: '/assets/it_images/non_square/personaltrainer_1280.png',
        job: 'softaware developer',
        summary: 'School work for frontend course.',
        more: 'Task description: A personal trainer company needs a user interface for their existing backend, which stores their customer data. The database contains information about customers and their training sessions. The backend provides a REST API, and its documentation includes the necessary details for developing the user interface. REST API documentation: https://juhahinkula.github.io/personaltrainerdocs/',
        technologies: 'React, TypeScript, Vite',
        company: 'student work',
    },
];


dbtv.exec(`DROP TABLE IF EXISTS tvproductions;`);
dbtv.prepare(`
    CREATE TABLE IF NOT EXISTS tvproductions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        seasons TEXT,
        year TEXT,
        image TEXT,
        job TEXT,
        summary TEXT,
        more TEXT,
        company TEXT
    );
`).run();

function initTvData() {
    const stmt = dbtv.prepare(`
        INSERT INTO tvproductions 
        (slug, title, seasons, year, image, job, summary, more, company)
        VALUES (
        @slug,
        @title,
        @seasons,
        @year,
        @image,
        @job,
        @summary,
        @more,
        @company
        )
        `)

    for (const production of productions) {
        stmt.run(production);
    }
}

dbtv.exec(`DROP TABLE IF EXISTS projects;`);
dbit.prepare(`
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        year TEXT,
        image TEXT,
        link TEXT,
        gitlink TEXT,
        job TEXT,
        summary TEXT,
        more TEXT,
        technologies TEXT,
        company TEXT
    );    
`).run();

function initITData() {
    const stmt = dbit.prepare(`
        INSERT INTO projects 
        (slug, title, year, image, link, gitlink, job, summary, more, technologies, company)
        VALUES (
        @slug,
        @title,
        @year,
        @image,
        @link,
        @gitlink,
        @job,
        @summary,
        @more,
        @technologies,
        @company
        )
        `);

    for (const project of itprojects) {
        stmt.run(project);
    }
}

initTvData();
initITData();

dbtv.close();
dbit.close();