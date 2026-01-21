# 📝 Hoe Voeg Je een Nieuw Blog Artikel Toe?

Deze gids legt uit hoe je eenvoudig nieuwe blog artikelen kunt toevoegen aan de website. Het is zo simpel dat een 10-jarige het kan!

## 🎯 Stap 1: Maak een Nieuw Markdown Bestand

1. Ga naar de map `blog/posts/`
2. Maak een nieuw bestand aan met de naam: `jouw-artikel-titel.md`
   - Gebruik kleine letters
   - Gebruik streepjes (-) in plaats van spaties
   - Voorbeeld: `tips-voor-hardlopen.md`

## ✍️ Stap 2: Schrijf Je Artikel

Open het nieuwe bestand en schrijf je artikel in **Markdown** formaat.

### Markdown Basics

```markdown
# Dit is een Hoofdtitel (H1)

## Dit is een Subtitel (H2)

### Dit is een Kleinere Subtitel (H3)

Dit is gewone tekst. Je kunt **vetgedrukte tekst** maken of *schuine tekst*.

- Dit is een lijst
- Met meerdere items
- Heel makkelijk!

1. Dit is een genummerde lijst
2. Tweede item
3. Derde item

[Dit is een link](https://movetofit.be)

![Dit is een afbeelding](pad/naar/afbeelding.jpg)
```

### Voorbeeld Artikel Structuur

```markdown
# Jouw Artikel Titel

Een korte introductie over waar het artikel over gaat.

## Eerste Sectie

Schrijf hier je content...

### Subsectie

Meer details...

## Tweede Sectie

Nog meer content...

## Conclusie

Sluit je artikel af met een conclusie.

---

*Geschreven door Fara Truyens*
```

## 📋 Stap 3: Voeg Je Artikel Toe aan de Index

Open het bestand `blog/blog-posts.json` en voeg je nieuwe artikel toe aan de lijst:

```json
{
  "posts": [
    {
      "slug": "jouw-artikel-titel",
      "title": "Jouw Artikel Titel",
      "excerpt": "Een korte samenvatting van je artikel (1-2 zinnen)",
      "category": "Fitness",
      "date": "2026-01-21",
      "readTime": 5,
      "file": "jouw-artikel-titel.md"
    },
    ... andere artikelen ...
  ]
}
```

### Velden Uitleg

- **slug**: De URL-vriendelijke naam (zelfde als bestandsnaam zonder .md)
- **title**: De volledige titel van je artikel
- **excerpt**: Korte samenvatting (verschijnt op de blog pagina)
- **category**: Kies uit: "Fitness", "Dans", "Voeding", "Lifestyle", etc.
- **date**: Publicatiedatum in formaat YYYY-MM-DD
- **readTime**: Geschatte leestijd in minuten (tel ~200 woorden per minuut)
- **file**: Bestandsnaam van je markdown bestand

## ✅ Stap 4: Test Je Artikel

1. Open `blog.html` in je browser
2. Controleer of je nieuwe artikel verschijnt in de lijst
3. Klik op het artikel om te zien of het correct wordt weergegeven
4. Controleer of alle opmaak goed is

## 🎨 Markdown Cheat Sheet

### Tekst Opmaak

```markdown
**Vetgedrukt**
*Cursief*
***Vet en cursief***
~~Doorgestreept~~
```

### Links en Afbeeldingen

```markdown
[Link tekst](https://example.com)
![Alt tekst voor afbeelding](images/foto.jpg)
```

### Lijsten

```markdown
- Ongeordende lijst
- Item 2
  - Sub-item (2 spaties inspringen)

1. Geordende lijst
2. Item 2
3. Item 3
```

### Citaten

```markdown
> Dit is een citaat
> Het kan meerdere regels hebben
```

### Code

```markdown
Inline `code` met backticks

```
Code blok
met meerdere regels
```
```

### Horizontale Lijn

```markdown
---
```

## 📁 Bestandsstructuur

```
blog/
├── posts/
│   ├── artikel-1.md
│   ├── artikel-2.md
│   └── jouw-nieuwe-artikel.md
├── blog-posts.json
└── HOW-TO-ADD-POSTS.md (dit bestand)
```

## 💡 Tips

### 1. Schrijf Eerst in een Teksteditor

Schrijf je artikel eerst in een normale teksteditor of Word, en converteer het dan naar Markdown.

### 2. Gebruik Duidelijke Titels

Maak je titels beschrijvend en SEO-vriendelijk:
- ✅ "5 Tips voor Betere Hardlooptechniek"
- ❌ "Tips"

### 3. Voeg Afbeeldingen Toe

Afbeeldingen maken je artikel aantrekkelijker:
1. Plaats afbeeldingen in `images/blog/`
2. Verwijs ernaar in je markdown: `![Beschrijving](images/blog/foto.jpg)`

### 4. Houd Het Leesbaar

- Gebruik korte paragrafen (3-4 zinnen)
- Voeg tussenkopjes toe
- Gebruik lijsten voor overzichtelijkheid
- Voeg witruimte toe tussen secties

### 5. SEO Vriendelijk

- Gebruik relevante keywords in je titel
- Schrijf een goede excerpt (samenvatting)
- Gebruik beschrijvende alt-tekst voor afbeeldingen
- Link naar andere relevante artikelen

## 🔧 Problemen Oplossen

### Artikel Verschijnt Niet

1. Controleer of de bestandsnaam correct is
2. Controleer of je het artikel hebt toegevoegd aan `blog-posts.json`
3. Controleer of de JSON syntax correct is (geen komma's vergeten!)
4. Ververs de pagina (Ctrl+F5 of Cmd+Shift+R)

### Opmaak Ziet Er Raar Uit

1. Controleer je Markdown syntax
2. Test je Markdown in een online editor: https://dillinger.io/
3. Zorg dat er lege regels zijn tussen paragrafen

### Datum Formaat

Gebruik altijd: `YYYY-MM-DD`
- ✅ `2026-01-21`
- ❌ `21-01-2026`
- ❌ `21/01/2026`

## 📞 Hulp Nodig?

Als je vastloopt, geen probleem! Neem contact op via:
- E-mail: web@movetofit.be
- Of vraag het aan iemand die de website beheert

## 🎉 Klaar!

Dat is alles! Je hebt nu een nieuw blog artikel toegevoegd. Veel plezier met schrijven!

---

**Laatste update:** 21 januari 2026
