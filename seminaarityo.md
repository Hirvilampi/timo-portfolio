# Tämä dokumentti kertoo chatbotin AI-Timo luomisesta Seminaarityönä  

Botti on seminaarityö Haaga-Helian ammattikorkeakoulun kurssille Ohjelmistokehityksen teknologioita (kevät 2026).   
Kurssin sivu löytyy osoitteesta ![https://github.com/haagahelia/ohke-teknologiat](https://github.com/haagahelia/ohke-teknologiat). 

Tämän seminaarityön on tehnyt Haaga-Helian opiskelija Timo Lampinen.  

Sisällysluettelo 



## Projekti ja sen tarkoitus 
  
Tarkoituksenani on rakentaa chatbot Timo, joka toimii portfolio sivullani. Chatbot vastaa kysymyksiin  
kokemuksestani, opiskeluistani, tv-projekteista, koodausprojekteista, minusta sekä tietenkin tämän chatbotin luomisesta.  

Valitsin chatbotin, koska halusin oppia käyttämään laajaa kielimallia chatbotin tekemiseen. Samalla voisin saada sivuilleni toimivan elementin, joka myös pystyy antamaan minusta lisätietoa.  
  
## Käytetyt teknologiat  
next.js  - next.js toimii koko portfolion pohjana  
typescript and tailwind - ohjelmointikieli ja muotoilu  
vercel.com - portfolio pyörii vercel.com palvelun alla ja on ohjattu cname asetuksella verceliin   
Vercel AI SDK - tookit, mitä on käytetty chatbotin rakentamisessa.  
gpt-4o-mini-2024-07-18 - OPENAI kielimalli, jota käytetään luomaan vastaukset 
text-embedding-3-small - OPENAI embedding malli, joka muuttaa tekstin numerovektoreiksi. Vektoreita käytetään RAG hakuun
supabase - database, johon tallennetaan RAG tietokanta sekä chatin kysymykset ja vastaukset 

**Miksi valitsin nämä teknologiat**

Olin jo tehnyt portfolion käyttäen next.js, supabase, vercel yhdistelmää, joten sain pistettyä enemmän paukkuja itse asiaan, eli chatbottiin. Samassa ympäristössä ne toimivat parhaiten yhteen.  
Samalla typescript ja tailwind olivat tutuiksi.

Lähtiessäni rakentamaan chatbottia, löysin AI Hero videosarjan, jossa opetettiin käyttämään Vercel AI SDK:ta. Koska käytin myös verceliä jo muutenkin alustana, päätin ottaa kyseisen teknologian käyttööni. Kyseinen tutoriaali toimi pääasiallisena lähteenä sovellusta rakentaessa.

Vercel SDK AI tutoriaali AIHero sivuilla https://www.aihero.dev/tool-calls-with-vercel-ai-sdk

Portfolioni käytti jo Supabasea ja kun huomasin sen tukevan RAG tietokantoja. Päätin käyttää Supabasea. 


## Kuinka chatbot toimii  

I am using Retrieval-augmented generetion (RAG) system + AI agent  

```mermaid
flowchart TD
    A[User Input] --> B[Frontend Chat UI]
    B --> C[/api/chat route]
    C --> D[Validate Request]
    D --> E[Load Conversation History]
    D --> F[Create Embedding]
    F --> G[Vector Search in Supabase]
    G --> H[Retrieved Context]
    E --> I[LLM Prompt]
    H --> I
    I --> J[OpenAI Model]
    J --> K[Assistant Response]
    K --> L[Store Response in Supabase]
    L --> B
```

![kuvio siitä mikä on systeemin rakenne](assets/chatbot-rakenne.png)


## What files are in chatbot

This is my portfolio also, so it has quite many files/directories.  
These links go straight to the directories about chatbot.  
  
[app/chatbot/: client has the main interface for individual chatbot page](app/chatbot) 
  
[api/chat/: route.ts handels sending data to LLM and retrieving vector findings from Supabase](api/chat)  
  
[components/chatbot/: ask.tsx is client that creates and passes on the asked question, chatbotpanel is the interface](components/chatbot). 
  
[types/: embedding-types.ts has the different types stored here](types). 
  
[scripts/: embedding-document-chunks.ts has script that turn on creating embedding vectors in Supabase](scripts). 
