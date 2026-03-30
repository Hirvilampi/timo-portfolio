This is about how the chatbot is created.  

This is also seminar project for course Ohjelmistokehityksen teknologioita (winter 2026) in Haaga-Helia. 
Course page is in https://github.com/haagahelia/ohke-teknologiat. 

This project is done by Timo Lampinenk student of Haaga-Helia. 

Project and what it is about:  

My plan is to build chatbot Timo that works on my portfolio page. You can ask from chatbot about my 
experience, projects and some personal questions.   

Used technologies: 
next.js  - portfolio is done in newt.js. 
typescript and tailwind 
vercel (where the project is actually running)
Vercel AI SDK - tookit used to build chatbot  
gpt-4o-mini-2024-07-18 - large language model from OPENAI that is used to power the chat
supabase - database to storage chats and information, this is the RAG database also


Why did I pick these?

To learn and show my abitily to create something using AI, I think just building chatbot and have people use it tells if I can do this or not.  

I also had started to build my portfolio in next.js so that is the right place for chatbot. 

I tried to search what should I use to build and the suggestion was: vercel AI SDK, a ready llm model that is cheap to use and RAG vector database. 

I was already using Supabase in my portforlio and I quickly found you can use Supabase for RAG database. 





## Creating vector chuncks   

This is about my table documents_chunks and how we made vectors there for each of the row.   
each row has vector column called embedding.  

I did this by creating script that reads all rows from the table.   
this can be seen in file [scripts/embed-document-chunks.ts](scripts/embed-document-chunks.ts). 
For first time use, it takes only those rows which have no embeddings.  
Then we use embedding model text-embedding-3-small from OpenAI to create the embeddings.  
The embeddings are then inserted into rows in supabase.   

## Using chuncks as part of the search. 

Tämä oli melko hankalaa, enkä tosiaankaan ole saamassa sitä heti toimimaan.   

Tuo tuli osaksi route.ts, koska siellähän sitä käytetään.   
 
Tosin funktio, joka tekee selvittelyn on tehty Supabaseen ja toimii näin:   
"
create extension if not exists vector with schema extensions;

create or replace function match_document_chunks (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns setof document_chunks
language sql
as $$
  select *
  from document_chunks
  where embedding <=> query_embedding < 1 - match_threshold
  order by embedding <=> query_embedding asc
  limit least(match_count, 200);
$$;
"

Tuo vektoriarvo voi olla väärä ja olla myös syynä siihen, että thresholdia on joutunut laskemaan tosi alas, että tulee yhtään match:jä. Muistaakseni se on kuitenkin tuo, joten testataan sitä huomenna.

Tässä on kyse siitä, että taulukko on luotu jollain vektoriarvolla ja jos vertoriarvo on väärä, eivät tulokset osu oikein.

TESTAA ERI VEKTORIARVOILLA ()!!!

Lisäksi tulee mieleen, että kirjoittaessani suomeksi vastaukset eivät ole kovin hyviä. Mietin pitäisikö minun muuttaa document_chunks mieluummin kokonaan suomeksi tai sitten luoda suomenkielelle toiset chunkit. Silloin kysymyksen kielen tunnistuksen jälkeen voi valita kummasta chunkista etsitään.



## document chunk creation in Supabase

This war my prompt to create chunks and this is my data.

insert into document_chunks (document_id, content, metadata)
values
(
  'languages',
  'Native language is Finnish. English is fluent and used naturally in professional contexts. Swedish is at work level. He also knows some German and French.',
  '{"title":"Known languages","category":"profile","source":"manual","visibility":"public","language":"en"}'::jsonb
),
(
  'family_and_home',
  'Timo lives in Espoo with his wife, three sons, and two dogs. Two of the sons are already adults, and the youngest is finishing comprehensive school. He and his wife have been together for 24 years. Their dogs are a poodle named Usva and a cockapoo named Myrsky.',
  '{"title":"Family and home life","category":"personal_profile","source":"manual","visibility":"public","language":"en"}'::jsonb
),
(
  'family_history_private',
  'Timo was born in Kuhmo. His father was Pentti Lampinen, who worked as a study counsellor. His mother was Irma Lampinen, who worked as a practical nurse. He had a sister who died in 1997. His father died in 2015.',
  '{"title":"Family history","category":"personal_history","source":"manual","visibility":"public","language":"en"}'::jsonb
),
(
  'tv_career_summary',
  'Timo Lampinen has over 20 years of experience in television and film, mainly as a director, writer, and editor. His work spans reality TV, documentary, fiction, and entertainment. He has worked with companies such as Warner Bros, ITV, Rabbit Films, YLE, and others.',
  '{"title":"TV and film career summary","category":"career","source":"cv_portfolio","visibility":"public","language":"en"}'::jsonb
),
(
  'selected_tv_productions',
  'Selected productions include Love Island Suomi, Remppa vai Muutto Suomi, Myyrä, Unelma Asunto Espanjasta, Koko Suomi Leipoo, Sukuni Salat, Huvila ja Huussi, Supernanny Suomi, Amanda ja Tomi, and Seikkailija Saku.',
  '{"title":"Selected productions","category":"career","source":"portfolio","visibility":"public","language":"en"}'::jsonb
),
(
  'awards_and_recognition',
  'Timo is an award winning television director. Supernanny Suomi won Kultainen Venla for Best Lifestyle Program. Several of his productions have also received nominations.',
  '{"title":"Awards and recognition","category":"career","source":"cv","visibility":"public","language":"en"}'::jsonb
),
(
  'transition_to_software_development',
  'After a long television career, Timo is transitioning into software development. He sees this as a return to a childhood passion, now combined with strong real world experience in leadership, communication, and handling complex projects.',
  '{"title":"Transition to software development","category":"career_transition","source":"cv_portfolio","visibility":"public","language":"en"}'::jsonb
),
(
  'haaga_helia_studies',
  'Timo studies Information Technology at Haaga Helia University of Applied Sciences. He started in 2024 and aims to graduate in 2026. His academic performance is strong and he is interested in usability and service design.',
  '{"title":"Studies at Haaga Helia","category":"education","source":"portfolio","visibility":"public","language":"en"}'::jsonb
),
(
  'technical_skills',
  'Technical skills include JavaScript, TypeScript, React, Next.js, Tailwind, Node.js, Spring Boot, PostgreSQL, Firebase, Supabase, React Native, Expo, REST APIs, Git, and AI assisted development tools.',
  '{"title":"Technical skills","category":"skills","source":"portfolio","visibility":"public","language":"en"}'::jsonb
),
(
  'it_projects',
  'Key projects include a personal portfolio built with Next.js, Bonakota mobile app, Kimara.ai internship work, and various coursework projects. These demonstrate frontend, backend, and full stack development skills.',
  '{"title":"IT projects","category":"projects","source":"portfolio","visibility":"public","language":"en"}'::jsonb
),
(
  'bonakota_project',
  'Bonakota is a personal app project for managing household items and selling them. It reflects practical product thinking and independent development work.',
  '{"title":"Bonakota project","category":"projects","source":"portfolio","visibility":"public","language":"en"}'::jsonb
),
(
  'kimara_internship',
  'At Kimara.ai, Timo worked on frontend development, UI UX design, and AI assisted coding. He gained experience in startup environments, user feedback, and real world product development challenges.',
  '{"title":"Kimara internship","category":"experience","source":"internship_report","visibility":"public","language":"en"}'::jsonb
),
(
  'work_style_and_strengths',
  'Timo works well under pressure, communicates effectively, and can handle large projects. He has strong leadership skills from directing and focuses on helping teams perform at their best.',
  '{"title":"Work style and strengths","category":"strengths","source":"cv","visibility":"public","language":"en"}'::jsonb
),
(
  'personality_profile',
  'Grounded, analytical, and practical. Timo enjoys solving real problems, talking to people, and thinking about systems and user experience. He values clarity over complexity.',
  '{"title":"Personality","category":"profile","source":"inferred","visibility":"public","language":"en"}'::jsonb
),
(
  'hobbies_and_interests',
  'Hobbies include ice hockey, role playing games such as Dungeons and Dragons, video games, and grilling. He enjoys both creative and social activities.',
  '{"title":"Hobbies","category":"personal_profile","source":"manual","visibility":"public","language":"en"}'::jsonb
),
(
  'job_search_status',
  'Currently looking for junior software developer roles while still open to selected TV projects during the transition.',
  '{"title":"Job search status","category":"career","source":"portfolio","visibility":"public","language":"en"}'::jsonb
),
(
  'employer_summary',
  'Timo combines over 20 years of professional experience with modern software development skills. He brings strong communication, leadership, and product thinking to junior developer roles.',
  '{"title":"Employer summary","category":"recruitment","source":"synthesized","visibility":"public","language":"en"}'::jsonb
);