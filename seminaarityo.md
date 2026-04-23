# Tämä dokumentti kertoo chatbotin AI-Timo luomisesta Seminaarityönä  

Botti on seminaarityö Haaga-Helian ammattikorkeakoulun kurssille Ohjelmistokehityksen teknologioita (kevät 2026).   
Kurssin sivu löytyy osoitteesta ![https://github.com/haagahelia/ohke-teknologiat](https://github.com/haagahelia/ohke-teknologiat). 

Tämän seminaarityön on tehnyt Haaga-Helian opiskelija Timo Lampinen.  

Sisällysluettelo 



## Projekti ja sen tarkoitus 
  
Tarkoituksenani on rakentaa chatbot Timo, joka toimii portfolio sivullani. Chatbot vastaa kysymyksiin  
kokemuksestani, opiskeluistani, tv-projekteista, koodausprojekteista, minusta sekä tietenkin tämän chatbotin luomisesta.  
  
## Käytetyt teknologiat  
next.js  - next.js toimii koko portfolion pohjana  
typescript and tailwind - ohjelmointikieli ja muotoilu  
vercel.com - portfolio pyörii vercel.com palvelun alla ja on ohjattu cname asetuksella verceliin   
Vercel AI SDK - tookit, mitä on käytetty chatbotin rakentamisessa.  
gpt-4o-mini-2024-07-18 - OPENAI kielimalli, jota käytetään luomaan vastaukset 
text-embedding-3-small - OPENAI embedding malli, joka muuttaa tekstin numerovektoreiksi. Vektoreita käytetään RAG hakuun
supabase - database, johon tallennetaan RAG tietokanta sekä chatin kysymykset ja vastaukset 

**Miksi valitsin nämä teknologiat**

Valitsin chatbotin, koska halusin oppia käyttämään laajaa kielimallia chatbotin tekemiseen. Samalla voisin saada sivuilleni toimivan elementin, joka myös pystyy antamaan minusta lisätietoa.  

Olin jo tehnyt portfolion käyttäen next.js, supabase, vercel yhdistelmää, joten sain pistettyä enemmän paukkuja itse asiaan, eli chatbottiin. Samassa ympäristössä ne toimivat parhaiten yhteen.  

I tried to search what should I use to build and the suggestion was: vercel AI SDK, a ready llm model that is cheap to use and RAG vector database. 

I was already using Supabase in my portforlio and I quickly found you can use Supabase for RAG database. 

## How the AI System works  

I am using Retrieval-augmented generetion (RAG) system + AI agent  

![kuvio siitä mikä on systeemin rakenne](assets/chatbot-rakenne.png)


## What files are in chatbot

This is my portfolio also, so it has quite many files/directories.  
These links go straight to the directories about chatbot.  
  
[app/chatbot/: client has the main interface for individual chatbot page](app/chatbot) 
  
[api/chat/: route.ts handels sending data to LLM and retrieving vector findings from Supabase](api/chat)  
  
[components/chatbot/: ask.tsx is client that creates and passes on the asked question, chatbotpanel is the interface](components/chatbot). 
  
[types/: embedding-types.ts has the different types stored here](types). 
  
[scripts/: embedding-document-chunks.ts has script that turn on creating embedding vectors in Supabase](scripts). 
