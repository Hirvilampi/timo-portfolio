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

Tässä on ehkä kyse siitä, että taulukko on luotu jollain vektorin dimensiolla ja jos demensio on väärä, eivät tulokset osu oikein.

TESTAA ERI VEKTORIARVOILLA ()!!!

Lisäksi tulee mieleen, että kirjoittaessani suomeksi vastaukset eivät ole kovin hyviä. Mietin pitäisikö minun muuttaa document_chunks mieluummin kokonaan suomeksi tai sitten luoda suomenkielelle toiset chunkit. Silloin kysymyksen kielen tunnistuksen jälkeen voi valita kummasta chunkista etsitään.



Nyt testissä on match_document_chunks funktio 
vektoridimensio on 1536 
threshold 0.5 (tämä on turhan matala threshold, eli pitäisi tuottaa liikaa vastauksia)
matches 10 

Kysymys: Mitä tv-tuotantoja olet tehnyt? 
Printtaan konsoliin rag vastausten määrän ja vastaukset. Ennen jokaista kysymystä tyhjennän kysymyshistorian, ettei se vaikuta tuloksiin.

antaa RAG vastauksia, eli löytää yhtäläisyyksiä: 
threshold 0.5
RAG määrä: 0 kpl.

threshold 0.45
RAG määrä 1 kpl.

threshold 0.4
RAG määrä 3 kpl.

threshold 0.35
RAG määrä 3 kpl.

threshold 0.30
RAG määrä 3 kpl.

threshold 0.25
RAG määrä 6 kpl.

threshold 0.20
RAG määrä 7 kpl.

--> vektoridimensio ei ole oikea

vektoridimensio 768

antaa RAG vastauksia, eli löytää yhtäläisyyksiä: 
threshold 0.5
RAG määrä: 0 kpl.

threshold 0.45
RAG määrä 2 kpl.

threshold 0.40
RAG määrä 3 kpl.

threshold 0.35
RAG määrä 3 kpl.

threshold 0.30
RAG määrä 3 kpl.

threshold 0.25
RAG määrä 6 kpl.

threshold 0.20
RAG määrä 7 kpl.

--> vektoridimensio ei ole oikea

vektoridimensio 768


Itseasiassa löysin tavan selvittää dimension ja se on tuo aiempi 1536. Onko se paras, se on hyvä kysymys.

antaa RAG vastauksia, eli löytää yhtäläisyyksiä: 
threshold 0.5
RAG määrä: 0 kpl.

threshold 0.45
RAG määrä 2 kpl.

threshold 0.40
RAG määrä 3 kpl.

threshold 0.35
RAG määrä 3 kpl.

threshold 0.30
RAG määrä 3 kpl.

threshold 0.25
RAG määrä 6 kpl.

threshold 0.20
RAG määrä 7 kpl.


Tutkin vähän asiaa ja keskustelun tekoälyn kanssa siitä, kannattaako muuttaa dimensiota vai mitä. 
Rivimääräni on nyt 19 ja merkkimäärä alle 250 merkkiä. Tämä on myös todettu olevan hyvä kohta aloittaa, mutta Milvuksen dokumentissa todetaankin, että tämä sopii hyvin haku tyyppiseen dataan.
https://milvus.io/ai-quick-reference/what-is-the-optimal-chunk-size-for-rag-applications
https://www.llamaindex.ai/blog/evaluating-the-ideal-chunk-size-for-a-rag-system-using-llamaindex-6207e5d3fec5
Kokeilen seuraavaksi isompaa chunk kokoa. Myös kieli on mietityttänyt, koska keskustellessani suomeksi botin kanssa, on kieli huonoa. Tämä voi vaikuttaa myös tuloksiin. Teen seuraavan chunkin siis suomeksi ja suurempana merkkimäärällä. ajattelin kokeilla maksimissaan 800 merkkiä. Tämä lisää datan määrää toki erittäin paljon. 


## document chunk creation in Supabase

I am creating my chunks by giving ChatGpt-5.4 many of my cv:s from past, linkedin page, my portfolio page, github page, imdb site etc. 
Then gave it command to create document chunks for PostGresSql with document_id, content, metadata.
I created the table before.

### First table of document chunks 

I am creating my chunks by giving ChatGpt-5.4 many of my cv:s from past, linkedin page, my portfolio page, github page, imdb site etc. 
Then gave it command to create document chunks for PostGresSql with document_id, content, metadata.
I created the table before.

This was my prompt to create chunks and this is my data.

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

### Second table of document chunks

I'm not getting rid of my documents chunks but I will create a new one. This will also be in finnish.

I will insert this into supabase for document_chunks_big_fin. But before I will have to do the table for this, and make this into PostGresSQL.  

#### info on timo - for later 

const documentChunks: DocumentChunk[] = [
  {
    id: "chunk-fi-001",
    document_id: "bio-ja-tausta",
    chunk_index: 0,
    title: "Bio ja tausta",
    category: "profile",
    language: "fi",
    content_original:
      "Timo Lampinen on espoolainen suomalainen ammattilainen, jolla on kaksi vahvaa uralinjaa: pitkä ura tv- ja elokuva-alalla sekä siirtymä ohjelmistokehitykseen. Hän on syntynyt Kuhmossa 20.12.1974, käynyt siellä lukion ja myöhemmin opiskellut media-alaa sekä IT-alaa. Koodaaminen oli nuoruuden intohimo, johon hän on palannut aikuisena tavoitteellisesti. Ennen ohjelmistokehitykseen siirtymistä hän toimi pitkään yrittäjänä ja pyöritti yhden miehen yritystä noin 20 vuoden ajan.",
    content_display:
      "Syntynyt Kuhmossa, asuu Espoossa. Pitkä tv-ura ja myöhempi siirtymä ohjelmistokehitykseen. Koodaaminen oli nuoruuden intohimo, johon hän on palannut aikuisena tavoitteellisesti.",
    content_search:
      "Kuka on Timo Lampinen? Tausta, elämäkerta, bio, syntynyt Kuhmossa, asuu Espoossa, yrittäjätausta, pitkä tv-ura, siirtymä IT-alalle, nuoruuden intohimo koodata.",
    keywords: ["bio", "tausta", "Kuhmo", "Espoo", "yrittäjyys", "ura", "ohjelmistokehitys"],
    entities: ["Timo Lampinen", "Kuhmo", "Espoo"],
    metadata: {
      source: "manual+cv+portfolio",
      source_type: "combined",
      visibility: "public",
      audience: "general",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-002",
    document_id: "kielet",
    chunk_index: 0,
    title: "Kielet",
    category: "profile",
    language: "fi",
    content_original:
      "Timo Lampisen äidinkieli on suomi. Hän käyttää sujuvaa englantia sekä kirjoitetussa että suullisessa viestinnässä, mistä esimerkkeinä ovat englanninkielinen portfolio, GitHub-profiili ja CV-materiaalit. Hän osaa virkamiesruotsia ja pystyy käyttämään ruotsia työ- ja opiskelutilanteissa. Lisäksi hän osaa jonkin verran saksaa ja ranskaa.",
    content_display:
      "Äidinkieli suomi, sujuva englanti, virkamiesruotsi sekä hieman saksaa ja ranskaa.",
    content_search:
      "Mitä kieliä Timo Lampinen osaa? Äidinkieli suomi, englanti, ruotsi, virkamiesruotsi, saksa, ranska, kielitaito, kielet.",
    keywords: ["kielet", "suomi", "englanti", "ruotsi", "virkamiesruotsi", "saksa", "ranska"],
    entities: ["Timo Lampinen"],
    metadata: {
      source: "manual+portfolio+cv",
      source_type: "combined",
      visibility: "public",
      audience: "general",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-003",
    document_id: "tv-ura",
    chunk_index: 0,
    title: "Tv- ja elokuvauran yhteenveto",
    category: "career",
    language: "fi",
    content_original:
      "Timo Lampisella on yli 20 vuoden kokemus tv- ja elokuva-alalta. Hänen pääroolinsa ovat olleet ohjaaja, käsikirjoittaja ja leikkaaja, mutta työ on sisältänyt myös tuottamista, location scoutingia, fixerin töitä, kuvauksia, ohjelmakehitystä ja muita tuotannollisia vastuita. Hän on työskennellyt muun muassa Warner Bros International Television Production Finlandilla, ITV:llä, Rabbit Filmsillä, YLEn projekteissa sekä useissa muissa tuotannoissa. Ura alkoi leikkaamisesta, mutta hän siirtyi melko varhain myös ohjaamiseen.",
    content_display:
      "Yli 20 vuoden kokemus tv- ja elokuva-alalta. Pääroolit ohjaaja, käsikirjoittaja ja leikkaaja, mutta mukana myös tuottamista, kehitystä ja muita tuotannollisia vastuita.",
    content_search:
      "Millainen tv-ura Timo Lampisella on? Ohjaaja, käsikirjoittaja, leikkaaja, tuottaja, location scout, fixer, pitkä kokemus televisiosta ja elokuvasta.",
    keywords: ["tv-ura", "elokuva", "ohjaaja", "käsikirjoittaja", "leikkaaja", "tuottaja"],
    entities: ["Timo Lampinen", "Warner Bros", "ITV", "Rabbit Films", "YLE"],
    metadata: {
      source: "portfolio+cv",
      source_type: "combined",
      visibility: "public",
      audience: "general",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-004",
    document_id: "valikoidut-tuotannot",
    chunk_index: 0,
    title: "Valikoidut tuotannot",
    category: "career",
    language: "fi",
    content_original:
      "Valikoituihin Timo Lampisen tuotantoihin kuuluvat muun muassa Love Island Suomi, Remppa vai Muutto Suomi, Myyrä, Myyrä Johtolangat, Unelma Asunto Espanjasta, Koko Suomi Leipoo, Sukuni Salat, Huvila ja Huussi, Supernanny Suomi, Amanda ja Tomi sekä Seikkailija Saku. Näissä hänen roolinsa on vaihdellut ohjaajasta käsikirjoittajaan, leikkaajaan, tuottajaan ja ohjelmakehittäjään. Hänen kokemuksensa kattaa viihteen, lifestyle-ohjelmat, dokumentit, lastensisällöt ja lyhytelokuvat.",
    content_display:
      "Tunnettuja tuotantoja ovat esimerkiksi Supernanny Suomi, Myyrä, Koko Suomi Leipoo, Sukuni Salat ja Remppa vai Muutto Suomi.",
    content_search:
      "Missä ohjelmissa Timo Lampinen on ollut mukana? Supernanny Suomi, Myyrä, Koko Suomi Leipoo, Sukuni Salat, Huvila ja Huussi, Love Island, Amanda ja Tomi, Seikkailija Saku.",
    keywords: ["tuotannot", "Supernanny Suomi", "Myyrä", "Koko Suomi Leipoo", "Sukuni Salat"],
    entities: ["Love Island Suomi", "Remppa vai Muutto Suomi", "Myyrä", "Supernanny Suomi", "Amanda ja Tomi", "Seikkailija Saku"],
    metadata: {
      source: "portfolio+cv+imdb_support",
      source_type: "combined",
      visibility: "public",
      audience: "general",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-005",
    document_id: "palkinnot-ja-tunnustus",
    chunk_index: 0,
    title: "Palkinnot ja tunnustus",
    category: "career",
    language: "fi",
    content_original:
      "Timo Lampinen on palkittu tv-ohjaaja. Supernanny Suomi voitti Kultaisen Venlan parhaana lifestyle-ohjelmana, ja hänen portfoliomateriaalinsa mukaan tuotannot ovat olleet useita kertoja shortlistalla sekä saaneet muitakin ehdokkuuksia. Palkinnot ja ehdokkuudet tukevat käsitystä siitä, että hänen työnsä on ollut näkyvää ja tunnustettua suomalaisessa televisiossa.",
    content_display:
      "Palkittu tv-ohjaaja. Supernanny Suomi voitti Kultaisen Venlan, ja muitakin shortlistauksia ja ehdokkuuksia on kertynyt.",
    content_search:
      "Onko Timo Lampinen palkittu? Kultainen Venla, Supernanny Suomi, palkinnot, shortlist, tunnustus, ehdokkuudet.",
    keywords: ["palkinnot", "Kultainen Venla", "Supernanny Suomi", "ehdokkuudet", "tunnustus"],
    entities: ["Timo Lampinen", "Kultainen Venla", "Supernanny Suomi"],
    metadata: {
      source: "portfolio+cv",
      source_type: "combined",
      visibility: "public",
      audience: "general",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-006",
    document_id: "siirtyma-ohjelmistokehitykseen",
    chunk_index: 0,
    title: "Siirtymä ohjelmistokehitykseen",
    category: "career_transition",
    language: "fi",
    content_original:
      "Timo Lampinen on siirtymässä tv-alalta ohjelmistokehitykseen. Hän ei kuvaa tätä täytenä suunnanmuutoksena vaan paluuna nuoruuden kiinnostukseen koodaamisesta. Samalla hän tuo ohjelmistokehitykseen mukanaan kykyä johtaa ihmisiä, hahmottaa kokonaisuuksia, toimia paineessa ja rakentaa käyttäjälle ymmärrettäviä kokemuksia. Hänen profiilinsa on poikkeuksellinen yhdistelmä junioritason ohjelmistokehittäjää ja kokeneen ammattilaisen vastuunkantoa.",
    content_display:
      "Siirtymä tv-alalta ohjelmistokehitykseen on samalla paluu vanhaan kiinnostukseen koodaamisesta. Mukana siirtyy paljon kokemusta johtamisesta ja kokonaisuuksien hallinnasta.",
    content_search:
      "Miksi Timo Lampinen siirtyy ohjelmistokehitykseen? Tv-alalta IT-alalle, uramuutos, paluu koodaamiseen, junior developer mutta paljon kokemusta.",
    keywords: ["siirtymä", "ohjelmistokehitys", "uramuutos", "koodaaminen", "junior developer"],
    entities: ["Timo Lampinen"],
    metadata: {
      source: "cv+portfolio+github",
      source_type: "combined",
      visibility: "public",
      audience: "recruiters",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-007",
    document_id: "opinnot-haaga-helia",
    chunk_index: 0,
    title: "Opinnot Haaga-Heliassa",
    category: "education",
    language: "fi",
    content_original:
      "Timo Lampinen opiskelee tietojenkäsittelyä ja ohjelmistokehitystä Haaga-Helia ammattikorkeakoulussa. Portfolion mukaan opinnot alkoivat syksyllä 2024 ja tavoitteena on valmistuminen vuoden 2026 loppuun mennessä. Hän kuvaa opintomenestystään vahvaksi ja on kiinnostunut myös palvelumuotoilusta ja käytettävyydestä. Tämä näkyy tavassa, jolla hän puhuu ohjelmistoista: niiden pitää olla intuitiivisia, selkeitä ja ihmisille helppoja käyttää.",
    content_display:
      "IT-opinnot Haaga-Heliassa alkoivat 2024. Kiinnostuksen kohteita ovat ohjelmistokehitys, käytettävyys ja palvelumuotoilu.",
    content_search:
      "Missä Timo Lampinen opiskelee? Haaga-Helia, tietojenkäsittely, IT-tradenomi, ohjelmistokehitys, palvelumuotoilu, käytettävyys.",
    keywords: ["Haaga-Helia", "opinnot", "IT-tradenomi", "ohjelmistokehitys", "käytettävyys"],
    entities: ["Timo Lampinen", "Haaga-Helia"],
    metadata: {
      source: "portfolio+cv+internship_report",
      source_type: "combined",
      visibility: "public",
      audience: "general",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-008",
    document_id: "tekniset-taidot",
    chunk_index: 0,
    title: "Tekniset taidot",
    category: "skills",
    language: "fi",
    content_original:
      "Timo Lampisen tekniseen osaamiseen kuuluvat muun muassa Java, JavaScript, TypeScript, Python, React, Next.js, Tailwind CSS, HTML, CSS, React Native, Expo, Spring Boot, Node.js, REST-rajapinnat, GraphQL, PostgreSQL, Firebase, Supabase, SQLite, Linux, Bash, SSH, Apache, GitHub, GitLab, JUnit, Mockito ja AI-avusteinen kehitys esimerkiksi ChatGPT:n ja Codexin avulla. Portfolio on rakennettu Next.js:llä, TypeScriptillä, Tailwindilla, Vercelillä ja Supabasella.",
    content_display:
      "Tekninen stack sisältää moderneja web- ja mobiiliteknologioita, tietokantoja, backendiä, Linux-osaamista ja AI-avusteista kehitystä.",
    content_search:
      "Mitä teknologioita Timo Lampinen osaa? React, Next.js, TypeScript, Java, Spring Boot, Supabase, Firebase, Linux, React Native, Expo, Node.js.",
    keywords: ["React", "Next.js", "TypeScript", "Java", "Spring Boot", "Supabase", "Firebase", "Linux"],
    entities: ["React", "Next.js", "TypeScript", "Spring Boot", "Supabase", "Firebase", "Vercel"],
    metadata: {
      source: "portfolio+github+internship_report",
      source_type: "combined",
      visibility: "public",
      audience: "recruiters",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-009",
    document_id: "it-projektit",
    chunk_index: 0,
    title: "IT-projektit",
    category: "projects",
    language: "fi",
    content_original:
      "Keskeisiä IT-projekteja ovat henkilökohtainen portfolio, joka on rakennettu Next.js:llä, Reactilla, TypeScriptillä ja Tailwindilla, Bonakota-sovellus kotitavaroiden hallintaan ja myyntiin, Kimara.ai-harjoittelussa tehty frontend- ja UI/UX-työ, Linux-palvelinharjoitukset sekä kouluprojektit kuten Personal Trainer -sovellus. Projektit osoittavat, että osaaminen ei rajoitu yksittäiseen teknologiaan, vaan mukana on sekä frontend-, backend-, mobiili- että tuotetason ajattelua.",
    content_display:
      "Portfolio, Bonakota, Kimara.ai ja muut koulu- ja harjoitteluprojektit muodostavat ohjelmistokehityksen käytännön näytöt.",
    content_search:
      "Mitä ohjelmistoprojekteja Timo Lampinen on tehnyt? Portfolio, Bonakota, Kimara.ai, Linux-palvelimet, Personal Trainer, frontend, backend, full stack.",
    keywords: ["projektit", "portfolio", "Bonakota", "Kimara.ai", "Linux", "Personal Trainer"],
    entities: ["Bonakota", "Kimara.ai", "Next.js", "React"],
    metadata: {
      source: "portfolio+cv",
      source_type: "combined",
      visibility: "public",
      audience: "general",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-010",
    document_id: "bonakota",
    chunk_index: 0,
    title: "Bonakota-projekti",
    category: "projects",
    language: "fi",
    content_original:
      "Bonakota on Timo Lampisen oma sovellusprojekti. Sen idea on auttaa käyttäjää hallitsemaan kodin tavaroita ja mahdollistaa tavaroiden myynti muille käyttäjille. Projekti toimii näyttönä siitä, että hän ei ainoastaan opiskele ohjelmistokehitystä vaan rakentaa myös omia tuotteita. Bonakota yhdistää käytännöllisen arjen ongelmanratkaisun, mobiilikehityksen ja tuoteajattelun.",
    content_display:
      "Bonakota on oma sovellus kodin tavaroiden hallintaan ja myyntiin. Se toimii vahvana käytännön näyttönä omasta tuotekehityksestä.",
    content_search:
      "Mikä on Bonakota? Timo Lampisen oma sovellus, kotitavaroiden hallinta, tavaroiden myynti, mobiilisovellus, oma projekti.",
    keywords: ["Bonakota", "oma projekti", "mobiilisovellus", "tuoteajattelu", "inventaario"],
    entities: ["Bonakota", "Timo Lampinen"],
    metadata: {
      source: "portfolio+cv",
      source_type: "combined",
      visibility: "public",
      audience: "recruiters",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-011",
    document_id: "kimara-harjoittelu",
    chunk_index: 0,
    title: "Kimara.ai-harjoittelu",
    category: "experience",
    language: "fi",
    content_original:
      "Kimara.ai-harjoittelussa Timo Lampinen työskenteli frontend-painotteisesti ohjelmistokehityksen, UI/UX-suunnittelun, käyttäjäkontaktien ja AI-avusteisen koodaamisen parissa. Harjoittelu antoi käytännön kokemusta Next.js:stä, TypeScriptistä, Tailwindista, startup-ympäristöstä, käyttäjähaastatteluista ja siitä, miten tekninen kehitys, arkkitehtuuri ja käyttäjien tarpeet kohtaavat tai törmäävät. Raportissa korostuu ajatus siitä, että loppukäyttäjää ei saa unohtaa, vaikka teknologia olisi monimutkaista.",
    content_display:
      "Kimara.ai-harjoittelu toi käytännön kokemusta frontendistä, UI/UX:stä, startup-työstä, käyttäjäpalautteesta ja AI-avusteisesta koodaamisesta.",
    content_search:
      "Mitä Timo Lampinen teki Kimara.ai:ssa? Harjoittelu, frontend, UI UX, Next.js, TypeScript, startup, käyttäjähaastattelut, AI-koodaus.",
    keywords: ["Kimara.ai", "harjoittelu", "frontend", "UI/UX", "startup", "AI-koodaus"],
    entities: ["Kimara.ai", "Next.js", "TypeScript", "Tailwind", "ComfyUI"],
    metadata: {
      source: "internship_report+cv+portfolio",
      source_type: "combined",
      visibility: "public",
      audience: "recruiters",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-012",
    document_id: "tyotyyli-ja-vahvuudet",
    chunk_index: 0,
    title: "Työtyyli ja vahvuudet",
    category: "strengths",
    language: "fi",
    content_original:
      "Timo Lampisen vahvuuksia ovat paineensietokyky, kommunikointi, isojen kokonaisuuksien hallinta, kirjoittaminen ja ihmisten johtaminen. Hän korostaa, että ohjaajan työ on opettanut saamaan ihmiset tekemään parhaansa ja rakentamaan työilmapiiriä, jossa työnteko on tehokasta mutta mielekästä. Tiimityö- ja projektiraportissa hän pohtii luottamusta, motivaatiota, projektin onnistumista ja sitä, miten hyvä ilmapiiri parantaa myös lopputulosta. Hänen ajattelussaan yhdistyvät käytännöllisyys, luovuus ja systeeminen hahmotuskyky.",
    content_display:
      "Vahvuuksia ovat paineensietokyky, johtaminen, kirjoittaminen, kommunikointi ja suurten kokonaisuuksien hallinta.",
    content_search:
      "Mitkä ovat Timo Lampisen vahvuudet? Johtaminen, paineensietokyky, kommunikointi, tiimityö, kirjoittaminen, kokonaisuuksien hallinta.",
    keywords: ["vahvuudet", "johtaminen", "paineensietokyky", "tiimityö", "kommunikointi", "kirjoittaminen"],
    entities: ["Timo Lampinen"],
    metadata: {
      source: "cv+teamwork_report",
      source_type: "combined",
      visibility: "public",
      audience: "recruiters",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-013",
    document_id: "persoona",
    chunk_index: 0,
    title: "Persoona ja ajattelutapa",
    category: "profile",
    language: "fi",
    content_original:
      "Timon persoonasta nousevat esiin maanläheisyys, analyyttisyys, käytännöllisyys ja luovuus. Hän pitää todellisten ongelmien ratkaisemisesta, ihmisten kanssa puhumisesta ja siitä, että ohjelmistot tai tuotannot eivät jää pelkäksi tekniikaksi vaan palvelevat käyttäjiä ja katsojia. Häntä kiinnostavat rakenteet, arkkitehtuuri, käyttökokemus ja se, miten idea saadaan muutettua toimivaksi kokonaisuudeksi. Hän ei korosta itseään turhaan, mutta ottaa vastuuta ja pohtii asioita syvällisesti.",
    content_display:
      "Persoonassa yhdistyvät luovuus, analyyttisyys, käytännöllisyys ja kiinnostus ihmisiin sekä käyttäjäkokemukseen.",
    content_search:
      "Millainen persoona Timo Lampisella on? Maanläheinen, analyyttinen, luova, käytännöllinen, kiinnostunut käyttäjäkokemuksesta ja kokonaisuuksista.",
    keywords: ["persoona", "analyyttinen", "luova", "maanläheinen", "käyttäjäkokemus", "arkkitehtuuri"],
    entities: ["Timo Lampinen"],
    metadata: {
      source: "manual+reports_inference",
      source_type: "inferred",
      visibility: "public",
      audience: "general",
      confidence: "medium",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-014",
    document_id: "harrastukset",
    chunk_index: 0,
    title: "Harrastukset ja kiinnostuksen kohteet",
    category: "personal_profile",
    language: "fi",
    content_original:
      "Timo Lampinen harrastaa jääkiekon pelaamista ja seuraamista, roolipelejä erityisesti Dungeons & Dragonsia, videopelejä sekä grillaamista hiiligrillillä. CV- ja GitHub-materiaaleissa näkyy myös laajempi kiinnostus peleihin: video-, mobiili-, lauta- ja roolipelit kuuluvat samaan jatkumoon. Harrastukset kertovat sosiaalisesta, luovasta ja leikkisästä puolesta sekä kiinnostuksesta strategiaan, tarinoihin ja yhdessä tekemiseen.",
    content_display:
      "Harrastuksia ovat jääkiekko, Dungeons & Dragons, videopelit ja hiiligrillaus.",
    content_search:
      "Mitä Timo Lampinen harrastaa? Jääkiekko, Dungeons and Dragons, roolipelit, videopelit, grillaus, hiiligrilli.",
    keywords: ["harrastukset", "jääkiekko", "Dungeons & Dragons", "videopelit", "grillaus"],
    entities: ["Dungeons & Dragons", "Timo Lampinen"],
    metadata: {
      source: "manual+cv+github",
      source_type: "combined",
      visibility: "public",
      audience: "general",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-015",
    document_id: "tyonhakutilanne",
    chunk_index: 0,
    title: "Työnhakutilanne",
    category: "career",
    language: "fi",
    content_original:
      "Timo Lampinen hakee tällä hetkellä mahdollisuuksia ohjelmistokehityksessä, erityisesti junior developer -tasoisissa tai vastaavissa tehtävissä. Samalla hän on yhä kiinnostunut valikoiduista tv-alan ohjaus- ja käsikirjoitustöistä siirtymävaiheen aikana. Portfolio esittelee hänet tarkoituksella sekä ohjelmistokehittäjänä että tv-ammattilaisena, koska uusi tekninen ura rakentuu aiemman kokemuksen päälle eikä sitä vastaan.",
    content_display:
      "Tällä hetkellä painopiste on ohjelmistokehityksen työmahdollisuuksissa, mutta myös valikoidut tv-työt kiinnostavat edelleen.",
    content_search:
      "Etsiikö Timo Lampinen töitä? Junior developer, ohjelmistokehitys, urasiirtymä, avoin myös tv-ohjaus- ja käsikirjoitustöille.",
    keywords: ["työnhaku", "junior developer", "ohjelmistokehitys", "tv-työt", "urasiirtymä"],
    entities: ["Timo Lampinen"],
    metadata: {
      source: "portfolio+cv",
      source_type: "combined",
      visibility: "public",
      audience: "recruiters",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-016",
    document_id: "vahvuudet-tyonantajalle",
    chunk_index: 0,
    title: "Yhteenveto vahvuuksista työnantajalle",
    category: "recruitment",
    language: "fi",
    content_original:
      "Työnantajan näkökulmasta Timo Lampinen yhdistää poikkeuksellisella tavalla pitkän ammatillisen kokemuksen ja modernin ohjelmistokehityksen opettelun. Hän tuo junioritason teknisiin tehtäviin kypsyyttä, vastuunkantoa, viestintätaitoa, asiakasymmärrystä, luovuutta ja kykyä hahmottaa isoja kokonaisuuksia. Erityisen vahva yhdistelmä on frontend-painotteinen kehitys, UI/UX-ajattelu, käyttäjien kuunteleminen ja paineen alla toimiminen. Hän ei ole vain koodin kirjoittaja vaan ihminen, joka ymmärtää myös tuotteen, käyttäjän ja tiimin.",
    content_display:
      "Työnantajalle vahvuuksia ovat kypsyys, viestintä, paineensietokyky, frontend- ja UI/UX-ajattelu sekä kokonaisuuksien hallinta.",
    content_search:
      "Miksi palkata Timo Lampinen? Vahvuudet työnantajalle, junior developer jolla paljon kokemusta, frontend, UI UX, tiimityö, vastuu, viestintä.",
    keywords: ["työnantajalle", "vahvuudet", "rekrytointi", "frontend", "UI/UX", "vastuunkanto"],
    entities: ["Timo Lampinen"],
    metadata: {
      source: "synthesized_from_all_sources",
      source_type: "synthesized",
      visibility: "public",
      audience: "recruiters",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-017",
    document_id: "perhe-ja-koti",
    chunk_index: 0,
    title: "Perhe ja koti",
    category: "personal_profile",
    language: "fi",
    content_original:
      "Timo Lampinen asuu Espoossa vaimonsa, kolmen poikansa ja kahden koiran kanssa. Kaksi pojista on jo täysi-ikäisiä ja nuorin on peruskoulun loppuvaiheessa. Puolison kanssa yhteistä taivalta on 24 vuotta. Koirat ovat villakoira Usva ja cockapoo Myrsky. Tämä puoli elämästä kuuluu yksityisempään profiiliin, mutta auttaa ymmärtämään hänen arkeaan, vakaata elämäntilannettaan ja sitä, että perhe on hänelle tärkeä.",
    content_display:
      "Asuu Espoossa vaimon, kolmen pojan ja kahden koiran kanssa. Koirat ovat Usva ja Myrsky.",
    content_search:
      "Millainen perhe Timo Lampisella on? Vaimo, kolme poikaa, kaksi koiraa, Espoo, Usva, Myrsky.",
    keywords: ["perhe", "Espoo", "vaimo", "pojat", "koirat", "Usva", "Myrsky"],
    entities: ["Timo Lampinen", "Espoo", "Usva", "Myrsky"],
    metadata: {
      source: "manual",
      source_type: "manual",
      visibility: "private",
      audience: "private_assistant",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  },
  {
    id: "chunk-fi-018",
    document_id: "suku-ja-henkiloehistoria",
    chunk_index: 0,
    title: "Suku ja henkilökohtainen historia",
    category: "personal_history",
    language: "fi",
    content_original:
      "Timo Lampinen on syntynyt Kuhmossa ja käynyt siellä lukion. Hänen isänsä Pentti Lampinen toimi opinto-ohjaajana Kuhmossa, ja äitinsä Irma Lampinen perushoitajana. Hänen isänsä kuoli syöpään vuonna 2015. Timolla oli sisko Päivi Lampinen, joka kuoli vuonna 1997. Nämä tiedot ovat henkilökohtaisia ja soveltuvat vain yksityiseen tietokantaan, eivät julkiseen portfoliochattiin.",
    content_display:
      "Syntynyt Kuhmossa. Vanhemmat Pentti ja Irma Lampinen. Isä kuoli 2015 ja sisko Päivi 1997.",
    content_search:
      "Missä Timo Lampinen syntyi? Kuhmo. Ketkä ovat hänen vanhempansa? Pentti Lampinen, Irma Lampinen. Sisko Päivi Lampinen. Henkilöhistoria.",
    keywords: ["Kuhmo", "Pentti Lampinen", "Irma Lampinen", "Päivi Lampinen", "henkilöhistoria"],
    entities: ["Timo Lampinen", "Kuhmo", "Pentti Lampinen", "Irma Lampinen", "Päivi Lampinen"],
    metadata: {
      source: "manual",
      source_type: "manual",
      visibility: "private",
      audience: "private_assistant",
      confidence: "high",
      updated_at: "2026-03-31"
    }
  }
]

#### Create table document_chunks_big_fin in supabase postgresSQL  

I used this command to create the table:  

*create table if not exists document_chunks_big_fin (
  id text primary key,
  document_id text not null,
  chunk_index integer not null,

  title text not null,
  category text not null,
  language text not null,

  content_original text not null,
  content_display text not null,
  content_search text not null,

  keywords text[] not null default '{}',
  entities text[] not null default '{}',

  metadata jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now(),

  constraint document_chunks_big_fin_chunk_index_check
    check (chunk_index >= 0),

  constraint document_chunks_big_fin_metadata_is_object
    check (jsonb_typeof(metadata) = 'object')
);

create index if not exists idx_document_chunks_big_fin_document_id
  on document_chunks_big_fin (document_id);

create index if not exists idx_document_chunks_big_fin_category
  on document_chunks_big_fin (category);

create index if not exists idx_document_chunks_big_fin_language
  on document_chunks_big_fin (language);

create index if not exists idx_document_chunks_big_fin_doc_chunk
  on document_chunks_big_fin (document_id, chunk_index);

create index if not exists idx_document_chunks_big_fin_keywords_gin
  on document_chunks_big_fin using gin (keywords);

create index if not exists idx_document_chunks_big_fin_entities_gin
  on document_chunks_big_fin using gin (entities);

create index if not exists idx_document_chunks_big_fin_metadata_gin
  on document_chunks_big_fin using gin (metadata);

create index if not exists idx_document_chunks_big_fin_content_search_fts
  on document_chunks_big_fin
  using gin (to_tsvector('simple', content_search));*. 


####  used this to add embedding for vector search:

  *create extension if not exists vector;

alter table document_chunks_big_fin
add column if not exists embedding vector(1536);

create index if not exists idx_document_chunks_big_fin_embedding
  on document_chunks_big_fin
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);*   


#### Add row level security and policy 

Policy is not needed because we only access supabase from server side.  

*alter table document_chunks_big_fin enable row level security;*



#### used this to insert the info inside supabase. 


insert into document_chunks_big_fin (
  id,
  document_id,
  chunk_index,
  title,
  category,
  language,
  content_original,
  content_display,
  content_search,
  keywords,
  entities,
  metadata
)
values
(
  'chunk-fi-001',
  'bio-ja-tausta',
  0,
  'Bio ja tausta',
  'profile',
  'fi',
  'Timo Lampinen on espoolainen suomalainen ammattilainen, jolla on kaksi vahvaa uralinjaa: pitkä ura tv- ja elokuva-alalla sekä siirtymä ohjelmistokehitykseen. Hän on syntynyt Kuhmossa 20.12.1974, käynyt siellä lukion ja myöhemmin opiskellut media-alaa sekä IT-alaa. Koodaaminen oli nuoruuden intohimo, johon hän on palannut aikuisena tavoitteellisesti. Ennen ohjelmistokehitykseen siirtymistä hän toimi pitkään yrittäjänä ja pyöritti yhden miehen yritystä noin 20 vuoden ajan.',
  'Syntynyt Kuhmossa, asuu Espoossa. Pitkä tv-ura ja myöhempi siirtymä ohjelmistokehitykseen. Koodaaminen oli nuoruuden intohimo, johon hän on palannut aikuisena tavoitteellisesti.',
  'Kuka on Timo Lampinen? Tausta, elämäkerta, bio, syntynyt Kuhmossa, asuu Espoossa, yrittäjätausta, pitkä tv-ura, siirtymä IT-alalle, nuoruuden intohimo koodata.',
  array['bio','tausta','Kuhmo','Espoo','yrittäjyys','ura','ohjelmistokehitys'],
  array['Timo Lampinen','Kuhmo','Espoo'],
  '{"source":"manual+cv+portfolio","source_type":"combined","visibility":"public","audience":"general","confidence":"high","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-002',
  'kielet',
  0,
  'Kielet',
  'profile',
  'fi',
  'Timo Lampisen äidinkieli on suomi. Hän käyttää sujuvaa englantia sekä kirjoitetussa että suullisessa viestinnässä, mistä esimerkkeinä ovat englanninkielinen portfolio, GitHub-profiili ja CV-materiaalit. Hän osaa virkamiesruotsia ja pystyy käyttämään ruotsia työ- ja opiskelutilanteissa. Lisäksi hän osaa jonkin verran saksaa ja ranskaa.',
  'Äidinkieli suomi, sujuva englanti, virkamiesruotsi sekä hieman saksaa ja ranskaa.',
  'Mitä kieliä Timo Lampinen osaa? Äidinkieli suomi, englanti, ruotsi, virkamiesruotsi, saksa, ranska, kielitaito, kielet.',
  array['kielet','suomi','englanti','ruotsi','virkamiesruotsi','saksa','ranska'],
  array['Timo Lampinen'],
  '{"source":"manual+portfolio+cv","source_type":"combined","visibility":"public","audience":"general","confidence":"high","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-003',
  'tv-ura',
  0,
  'Tv- ja elokuvauran yhteenveto',
  'career',
  'fi',
  'Timo Lampisella on yli 20 vuoden kokemus tv- ja elokuva-alalta. Hänen pääroolinsa ovat olleet ohjaaja, käsikirjoittaja ja leikkaaja, mutta työ on sisältänyt myös tuottamista, location scoutingia, fixerin töitä, kuvauksia, ohjelmakehitystä ja muita tuotannollisia vastuita. Hän on työskennellyt muun muassa Warner Bros International Television Production Finlandilla, ITV:llä, Rabbit Filmsillä, YLEn projekteissa sekä useissa muissa tuotannoissa. Ura alkoi leikkaamisesta, mutta hän siirtyi melko varhain myös ohjaamiseen.',
  'Yli 20 vuoden kokemus tv- ja elokuva-alalta. Pääroolit ohjaaja, käsikirjoittaja ja leikkaaja, mutta mukana myös tuottamista, kehitystä ja muita tuotannollisia vastuita.',
  'Millainen tv-ura Timo Lampisella on? Ohjaaja, käsikirjoittaja, leikkaaja, tuottaja, location scout, fixer, pitkä kokemus televisiosta ja elokuvasta.',
  array['tv-ura','elokuva','ohjaaja','käsikirjoittaja','leikkaaja','tuottaja'],
  array['Timo Lampinen','Warner Bros','ITV','Rabbit Films','YLE'],
  '{"source":"portfolio+cv","source_type":"combined","visibility":"public","audience":"general","confidence":"high","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-004',
  'valikoidut-tuotannot',
  0,
  'Valikoidut tuotannot',
  'career',
  'fi',
  'Valikoituihin Timo Lampisen tuotantoihin kuuluvat muun muassa Love Island Suomi, Remppa vai Muutto Suomi, Myyrä, Myyrä Johtolangat, Unelma Asunto Espanjasta, Koko Suomi Leipoo, Sukuni Salat, Huvila ja Huussi, Supernanny Suomi, Amanda ja Tomi sekä Seikkailija Saku. Näissä hänen roolinsa on vaihdellut ohjaajasta käsikirjoittajaan, leikkaajaan, tuottajaan ja ohjelmakehittäjään. Hänen kokemuksensa kattaa viihteen, lifestyle-ohjelmat, dokumentit, lastensisällöt ja lyhytelokuvat.',
  'Tunnettuja tuotantoja ovat esimerkiksi Supernanny Suomi, Myyrä, Koko Suomi Leipoo, Sukuni Salat ja Remppa vai Muutto Suomi.',
  'Missä ohjelmissa Timo Lampinen on ollut mukana? Supernanny Suomi, Myyrä, Koko Suomi Leipoo, Sukuni Salat, Huvila ja Huussi, Love Island, Amanda ja Tomi, Seikkailija Saku.',
  array['tuotannot','Supernanny Suomi','Myyrä','Koko Suomi Leipoo','Sukuni Salat'],
  array['Love Island Suomi','Remppa vai Muutto Suomi','Myyrä','Supernanny Suomi','Amanda ja Tomi','Seikkailija Saku'],
  '{"source":"portfolio+cv+imdb_support","source_type":"combined","visibility":"public","audience":"general","confidence":"high","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-005',
  'palkinnot-ja-tunnustus',
  0,
  'Palkinnot ja tunnustus',
  'career',
  'fi',
  'Timo Lampinen on palkittu tv-ohjaaja. Supernanny Suomi voitti Kultaisen Venlan parhaana lifestyle-ohjelmana, ja hänen portfoliomateriaalinsa mukaan tuotannot ovat olleet useita kertoja shortlistalla sekä saaneet muitakin ehdokkuuksia. Palkinnot ja ehdokkuudet tukevat käsitystä siitä, että hänen työnsä on ollut näkyvää ja tunnustettua suomalaisessa televisiossa.',
  'Palkittu tv-ohjaaja. Supernanny Suomi voitti Kultaisen Venlan, ja muitakin shortlistauksia ja ehdokkuuksia on kertynyt.',
  'Onko Timo Lampinen palkittu? Kultainen Venla, Supernanny Suomi, palkinnot, shortlist, tunnustus, ehdokkuudet.',
  array['palkinnot','Kultainen Venla','Supernanny Suomi','ehdokkuudet','tunnustus'],
  array['Timo Lampinen','Kultainen Venla','Supernanny Suomi'],
  '{"source":"portfolio+cv","source_type":"combined","visibility":"public","audience":"general","confidence":"high","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-006',
  'siirtyma-ohjelmistokehitykseen',
  0,
  'Siirtymä ohjelmistokehitykseen',
  'career_transition',
  'fi',
  'Timo Lampinen on siirtymässä tv-alalta ohjelmistokehitykseen. Hän ei kuvaa tätä täytenä suunnanmuutoksena vaan paluuna nuoruuden kiinnostukseen koodaamisesta. Samalla hän tuo ohjelmistokehitykseen mukanaan kykyä johtaa ihmisiä, hahmottaa kokonaisuuksia, toimia paineessa ja rakentaa käyttäjälle ymmärrettäviä kokemuksia. Hänen profiilinsa on poikkeuksellinen yhdistelmä junioritason ohjelmistokehittäjää ja kokeneen ammattilaisen vastuunkantoa.',
  'Siirtymä tv-alalta ohjelmistokehitykseen on samalla paluu vanhaan kiinnostukseen koodaamisesta. Mukana siirtyy paljon kokemusta johtamisesta ja kokonaisuuksien hallinnasta.',
  'Miksi Timo Lampinen siirtyy ohjelmistokehitykseen? Tv-alalta IT-alalle, uramuutos, paluu koodaamiseen, junior developer mutta paljon kokemusta.',
  array['siirtymä','ohjelmistokehitys','uramuutos','koodaaminen','junior developer'],
  array['Timo Lampinen'],
  '{"source":"cv+portfolio+github","source_type":"combined","visibility":"public","audience":"recruiters","confidence":"high","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-007',
  'opinnot-haaga-helia',
  0,
  'Opinnot Haaga-Heliassa',
  'education',
  'fi',
  'Timo Lampinen opiskelee tietojenkäsittelyä ja ohjelmistokehitystä Haaga-Helia ammattikorkeakoulussa. Portfolion mukaan opinnot alkoivat syksyllä 2024 ja tavoitteena on valmistuminen vuoden 2026 loppuun mennessä. Hän kuvaa opintomenestystään vahvaksi ja on kiinnostunut myös palvelumuotoilusta ja käytettävyydestä. Tämä näkyy tavassa, jolla hän puhuu ohjelmistoista: niiden pitää olla intuitiivisia, selkeitä ja ihmisille helppoja käyttää.',
  'IT-opinnot Haaga-Heliassa alkoivat 2024. Kiinnostuksen kohteita ovat ohjelmistokehitys, käytettävyys ja palvelumuotoilu.',
  'Missä Timo Lampinen opiskelee? Haaga-Helia, tietojenkäsittely, IT-tradenomi, ohjelmistokehitys, palvelumuotoilu, käytettävyys.',
  array['Haaga-Helia','opinnot','IT-tradenomi','ohjelmistokehitys','käytettävyys'],
  array['Timo Lampinen','Haaga-Helia'],
  '{"source":"portfolio+cv+internship_report","source_type":"combined","visibility":"public","audience":"general","confidence":"high","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-008',
  'tekniset-taidot',
  0,
  'Tekniset taidot',
  'skills',
  'fi',
  'Timo Lampisen tekniseen osaamiseen kuuluvat muun muassa Java, JavaScript, TypeScript, Python, React, Next.js, Tailwind CSS, HTML, CSS, React Native, Expo, Spring Boot, Node.js, REST-rajapinnat, GraphQL, PostgreSQL, Firebase, Supabase, SQLite, Linux, Bash, SSH, Apache, GitHub, GitLab, JUnit, Mockito ja AI-avusteinen kehitys esimerkiksi ChatGPT:n ja Codexin avulla. Portfolio on rakennettu Next.js:llä, TypeScriptillä, Tailwindilla, Vercelillä ja Supabasella.',
  'Tekninen stack sisältää moderneja web- ja mobiiliteknologioita, tietokantoja, backendiä, Linux-osaamista ja AI-avusteista kehitystä.',
  'Mitä teknologioita Timo Lampinen osaa? React, Next.js, TypeScript, Java, Spring Boot, Supabase, Firebase, Linux, React Native, Expo, Node.js.',
  array['React','Next.js','TypeScript','Java','Spring Boot','Supabase','Firebase','Linux'],
  array['React','Next.js','TypeScript','Spring Boot','Supabase','Firebase','Vercel'],
  '{"source":"portfolio+github+internship_report","source_type":"combined","visibility":"public","audience":"recruiters","confidence":"high","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-009',
  'it-projektit',
  0,
  'IT-projektit',
  'projects',
  'fi',
  'Keskeisiä IT-projekteja ovat henkilökohtainen portfolio, joka on rakennettu Next.js:llä, Reactilla, TypeScriptillä ja Tailwindilla, Bonakota-sovellus kotitavaroiden hallintaan ja myyntiin, Kimara.ai-harjoittelussa tehty frontend- ja UI/UX-työ, Linux-palvelinharjoitukset sekä kouluprojektit kuten Personal Trainer -sovellus. Projektit osoittavat, että osaaminen ei rajoitu yksittäiseen teknologiaan, vaan mukana on sekä frontend-, backend-, mobiili- että tuotetason ajattelua.',
  'Portfolio, Bonakota, Kimara.ai ja muut koulu- ja harjoitteluprojektit muodostavat ohjelmistokehityksen käytännön näytöt.',
  'Mitä ohjelmistoprojekteja Timo Lampinen on tehnyt? Portfolio, Bonakota, Kimara.ai, Linux-palvelimet, Personal Trainer, frontend, backend, full stack.',
  array['projektit','portfolio','Bonakota','Kimara.ai','Linux','Personal Trainer'],
  array['Bonakota','Kimara.ai','Next.js','React'],
  '{"source":"portfolio+cv","source_type":"combined","visibility":"public","audience":"general","confidence":"high","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-010',
  'bonakota',
  0,
  'Bonakota-projekti',
  'projects',
  'fi',
  'Bonakota on Timo Lampisen oma sovellusprojekti. Sen idea on auttaa käyttäjää hallitsemaan kodin tavaroita ja mahdollistaa tavaroiden myynti muille käyttäjille. Projekti toimii näyttönä siitä, että hän ei ainoastaan opiskele ohjelmistokehitystä vaan rakentaa myös omia tuotteita. Bonakota yhdistää käytännöllisen arjen ongelmanratkaisun, mobiilikehityksen ja tuoteajattelun.',
  'Bonakota on oma sovellus kodin tavaroiden hallintaan ja myyntiin. Se toimii vahvana käytännön näyttönä omasta tuotekehityksestä.',
  'Mikä on Bonakota? Timo Lampisen oma sovellus, kotitavaroiden hallinta, tavaroiden myynti, mobiilisovellus, oma projekti.',
  array['Bonakota','oma projekti','mobiilisovellus','tuoteajattelu','inventaario'],
  array['Bonakota','Timo Lampinen'],
  '{"source":"portfolio+cv","source_type":"combined","visibility":"public","audience":"recruiters","confidence":"high","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-011',
  'kimara-harjoittelu',
  0,
  'Kimara.ai-harjoittelu',
  'experience',
  'fi',
  'Kimara.ai-harjoittelussa Timo Lampinen työskenteli frontend-painotteisesti ohjelmistokehityksen, UI/UX-suunnittelun, käyttäjäkontaktien ja AI-avusteisen koodaamisen parissa. Harjoittelu antoi käytännön kokemusta Next.js:stä, TypeScriptistä, Tailwindista, startup-ympäristöstä, käyttäjähaastatteluista ja siitä, miten tekninen kehitys, arkkitehtuuri ja käyttäjien tarpeet kohtaavat tai törmäävät. Raportissa korostuu ajatus siitä, että loppukäyttäjää ei saa unohtaa, vaikka teknologia olisi monimutkaista.',
  'Kimara.ai-harjoittelu toi käytännön kokemusta frontendistä, UI/UX:stä, startup-työstä, käyttäjäpalautteesta ja AI-avusteisesta koodaamisesta.',
  'Mitä Timo Lampinen teki Kimara.ai:ssa? Harjoittelu, frontend, UI UX, Next.js, TypeScript, startup, käyttäjähaastattelut, AI-koodaus.',
  array['Kimara.ai','harjoittelu','frontend','UI/UX','startup','AI-koodaus'],
  array['Kimara.ai','Next.js','TypeScript','Tailwind','ComfyUI'],
  '{"source":"internship_report+cv+portfolio","source_type":"combined","visibility":"public","audience":"recruiters","confidence":"high","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-012',
  'tyotyyli-ja-vahvuudet',
  0,
  'Työtyyli ja vahvuudet',
  'strengths',
  'fi',
  'Timo Lampisen vahvuuksia ovat paineensietokyky, kommunikointi, isojen kokonaisuuksien hallinta, kirjoittaminen ja ihmisten johtaminen. Hän korostaa, että ohjaajan työ on opettanut saamaan ihmiset tekemään parhaansa ja rakentamaan työilmapiiriä, jossa työnteko on tehokasta mutta mielekästä. Tiimityö- ja projektiraportissa hän pohtii luottamusta, motivaatiota, projektin onnistumista ja sitä, miten hyvä ilmapiiri parantaa myös lopputulosta. Hänen ajattelussaan yhdistyvät käytännöllisyys, luovuus ja systeeminen hahmotuskyky.',
  'Vahvuuksia ovat paineensietokyky, johtaminen, kirjoittaminen, kommunikointi ja suurten kokonaisuuksien hallinta.',
  'Mitkä ovat Timo Lampisen vahvuudet? Johtaminen, paineensietokyky, kommunikointi, tiimityö, kirjoittaminen, kokonaisuuksien hallinta.',
  array['vahvuudet','johtaminen','paineensietokyky','tiimityö','kommunikointi','kirjoittaminen'],
  array['Timo Lampinen'],
  '{"source":"cv+teamwork_report","source_type":"combined","visibility":"public","audience":"recruiters","confidence":"high","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-013',
  'persoona',
  0,
  'Persoona ja ajattelutapa',
  'profile',
  'fi',
  'Timon persoonasta nousevat esiin maanläheisyys, analyyttisyys, käytännöllisyys ja luovuus. Hän pitää todellisten ongelmien ratkaisemisesta, ihmisten kanssa puhumisesta ja siitä, että ohjelmistot tai tuotannot eivät jää pelkäksi tekniikaksi vaan palvelevat käyttäjiä ja katsojia. Häntä kiinnostavat rakenteet, arkkitehtuuri, käyttökokemus ja se, miten idea saadaan muutettua toimivaksi kokonaisuudeksi. Hän ei korosta itseään turhaan, mutta ottaa vastuuta ja pohtii asioita syvällisesti.',
  'Persoonassa yhdistyvät luovuus, analyyttisyys, käytännöllisyys ja kiinnostus ihmisiin sekä käyttäjäkokemukseen.',
  'Millainen persoona Timo Lampisella on? Maanläheinen, analyyttinen, luova, käytännöllinen, kiinnostunut käyttäjäkokemuksesta ja kokonaisuuksista.',
  array['persoona','analyyttinen','luova','maanläheinen','käyttäjäkokemus','arkkitehtuuri'],
  array['Timo Lampinen'],
  '{"source":"manual+reports_inference","source_type":"inferred","visibility":"public","audience":"general","confidence":"medium","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-014',
  'harrastukset',
  0,
  'Harrastukset ja kiinnostuksen kohteet',
  'personal_profile',
  'fi',
  'Timo Lampinen harrastaa jääkiekon pelaamista ja seuraamista, roolipelejä erityisesti Dungeons & Dragonsia, videopelejä sekä grillaamista hiiligrillillä. CV- ja GitHub-materiaaleissa näkyy myös laajempi kiinnostus peleihin: video-, mobiili-, lauta- ja roolipelit kuuluvat samaan jatkumoon. Harrastukset kertovat sosiaalisesta, luovasta ja leikkisästä puolesta sekä kiinnostuksesta strategiaan, tarinoihin ja yhdessä tekemiseen.',
  'Harrastuksia ovat jääkiekko, Dungeons & Dragons, videopelit ja hiiligrillaus.',
  'Mitä Timo Lampinen harrastaa? Jääkiekko, Dungeons and Dragons, roolipelit, videopelit, grillaus, hiiligrilli.',
  array['harrastukset','jääkiekko','Dungeons & Dragons','videopelit','grillaus'],
  array['Dungeons & Dragons','Timo Lampinen'],
  '{"source":"manual+cv+github","source_type":"combined","visibility":"public","audience":"general","confidence":"high","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-015',
  'tyonhakutilanne',
  0,
  'Työnhakutilanne',
  'career',
  'fi',
  'Timo Lampinen hakee tällä hetkellä mahdollisuuksia ohjelmistokehityksessä, erityisesti junior developer -tasoisissa tai vastaavissa tehtävissä. Samalla hän on yhä kiinnostunut valikoiduista tv-alan ohjaus- ja käsikirjoitustöistä siirtymävaiheen aikana. Portfolio esittelee hänet tarkoituksella sekä ohjelmistokehittäjänä että tv-ammattilaisena, koska uusi tekninen ura rakentuu aiemman kokemuksen päälle eikä sitä vastaan.',
  'Tällä hetkellä painopiste on ohjelmistokehityksen työmahdollisuuksissa, mutta myös valikoidut tv-työt kiinnostavat edelleen.',
  'Etsiikö Timo Lampinen töitä? Junior developer, ohjelmistokehitys, urasiirtymä, avoin myös tv-ohjaus- ja käsikirjoitustöille.',
  array['työnhaku','junior developer','ohjelmistokehitys','tv-työt','urasiirtymä'],
  array['Timo Lampinen'],
  '{"source":"portfolio+cv","source_type":"combined","visibility":"public","audience":"recruiters","confidence":"high","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-016',
  'vahvuudet-tyonantajalle',
  0,
  'Yhteenveto vahvuuksista työnantajalle',
  'recruitment',
  'fi',
  'Työnantajan näkökulmasta Timo Lampinen yhdistää poikkeuksellisella tavalla pitkän ammatillisen kokemuksen ja modernin ohjelmistokehityksen opettelun. Hän tuo junioritason teknisiin tehtäviin kypsyyttä, vastuunkantoa, viestintätaitoa, asiakasymmärrystä, luovuutta ja kykyä hahmottaa isoja kokonaisuuksia. Erityisen vahva yhdistelmä on frontend-painotteinen kehitys, UI/UX-ajattelu, käyttäjien kuunteleminen ja paineen alla toimiminen. Hän ei ole vain koodin kirjoittaja vaan ihminen, joka ymmärtää myös tuotteen, käyttäjän ja tiimin.',
  'Työnantajalle vahvuuksia ovat kypsyys, viestintä, paineensietokyky, frontend- ja UI/UX-ajattelu sekä kokonaisuuksien hallinta.',
  'Miksi palkata Timo Lampinen? Vahvuudet työnantajalle, junior developer jolla paljon kokemusta, frontend, UI UX, tiimityö, vastuu, viestintä.',
  array['työnantajalle','vahvuudet','rekrytointi','frontend','UI/UX','vastuunkanto'],
  array['Timo Lampinen'],
  '{"source":"synthesized_from_all_sources","source_type":"synthesized","visibility":"public","audience":"recruiters","confidence":"high","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-017',
  'perhe-ja-koti',
  0,
  'Perhe ja koti',
  'personal_profile',
  'fi',
  'Timo Lampinen asuu Espoossa vaimonsa, kolmen poikansa ja kahden koiran kanssa. Kaksi pojista on jo täysi-ikäisiä ja nuorin on peruskoulun loppuvaiheessa. Puolison kanssa yhteistä taivalta on 24 vuotta. Koirat ovat villakoira Usva ja cockapoo Myrsky. Tämä puoli elämästä kuuluu yksityisempään profiiliin, mutta auttaa ymmärtämään hänen arkeaan, vakaata elämäntilannettaan ja sitä, että perhe on hänelle tärkeä.',
  'Asuu Espoossa vaimon, kolmen pojan ja kahden koiran kanssa. Koirat ovat Usva ja Myrsky.',
  'Millainen perhe Timo Lampisella on? Vaimo, kolme poikaa, kaksi koiraa, Espoo, Usva, Myrsky.',
  array['perhe','Espoo','vaimo','pojat','koirat','Usva','Myrsky'],
  array['Timo Lampinen','Espoo','Usva','Myrsky'],
  '{"source":"manual","source_type":"manual","visibility":"private","audience":"private_assistant","confidence":"high","updated_at":"2026-03-31"}'::jsonb
),
(
  'chunk-fi-018',
  'suku-ja-henkiloehistoria',
  0,
  'Suku ja henkilökohtainen historia',
  'personal_history',
  'fi',
  'Timo Lampinen on syntynyt Kuhmossa ja käynyt siellä lukion. Hänen isänsä Pentti Lampinen toimi opinto-ohjaajana Kuhmossa, ja äitinsä Irma Lampinen perushoitajana. Hänen isänsä kuoli syöpään vuonna 2015. Timolla oli sisko Päivi Lampinen, joka kuoli vuonna 1997. Nämä tiedot ovat henkilökohtaisia ja soveltuvat vain yksityiseen tietokantaan, eivät julkiseen portfoliochattiin.',
  'Syntynyt Kuhmossa. Vanhemmat Pentti ja Irma Lampinen. Isä kuoli 2015 ja sisko Päivi 1997.',
  'Missä Timo Lampinen syntyi? Kuhmo. Ketkä ovat hänen vanhempansa? Pentti Lampinen, Irma Lampinen. Sisko Päivi Lampinen. Henkilöhistoria.',
  array['Kuhmo','Pentti Lampinen','Irma Lampinen','Päivi Lampinen','henkilöhistoria'],
  array['Timo Lampinen','Kuhmo','Pentti Lampinen','Irma Lampinen','Päivi Lampinen'],
  '{"source":"manual","source_type":"manual","visibility":"private","audience":"private_assistant","confidence":"high","updated_at":"2026-03-31"}'::jsonb
);
