/**
 * ============================================================================
 *  siteData.js — the only file you need to edit to personalise this website.
 * ============================================================================
 *
 *  Change the names, date, photos, letters, memories and wishes below.
 *  Layout, colours, stickers and animation timings are fixed in the components,
 *  so you do not need to touch them unless you want to redesign something.
 *
 *  Quick checklist when reusing this for someone else:
 *   1. Update `person` and `sender`.
 *   2. Replace the photo in `src/assets/orihime.jpg` (or change `person.photo`).
 *   3. Rewrite `littleLetter`, `bigLetter` and `loveNotes`.
 *   4. Edit `memories`, `timeline`, `reasons` and `wishes`.
 *   5. Optionally change `scrapbook.title` and `scrapbook.intro`.
 *
 *  Sticker / paper artwork lives in `public/stickers/`. If you replace those
 *  files, keep the same filenames and nothing else needs to change.
 * ============================================================================
 */

import portrait from '../assets/rajshree.jpeg';
import stamp from '../assets/love.png';
import heartLetter from '../assets/heart_letter.png';
import mewmew from '../assets/mewmew.gif';

/* ---------------------------------------------------------------------------
 * 1. The people
 * ------------------------------------------------------------------------ */

export const person = {
  name: 'Rajshree',
  shortName: 'Raju panmasala',
  age: 23,
  birthday: '21 November',
  photo: portrait,
  photoAlt: 'A portrait of Rajshree',
};

export const sender = {
  name: 'SKD',
  signature: 'Your SKD',
};

/* ---------------------------------------------------------------------------
 * 2. The little letter (the small animated envelope on the home page)
 * ------------------------------------------------------------------------ */

export const littleLetter = {
  from: 'SKD',
  date: '20 · 11 · 2026',
  greeting: `My dearest ${person.name},`,
  paragraphs: [
    'Happy 23th birthday! I hope this little letter finds you smiling in that way that makes every room feel warmer.',
    'Thank you for being the softest, cutiest , most beautifull part of my days.',
    'May this year be gentle with your heart, loud with your laughter, and full of every little thing you quietly wish for.',
  ],
  closing: 'Always in your corner,',
  signature: 'SKD',
  stamp,
};

/* ---------------------------------------------------------------------------
 * 3. The big fold-out letter (opened with “Click Here …”)
 * ------------------------------------------------------------------------ */

export const bigLetter = {
  coverTo: `Dear ${person.name}`,
  coverTitle: 'Happy Birthday!',
  coverSubtitle: 'A purr-fect message just for you... 💌',
  heading: 'To You!',
  paragraphs: [
    `Happy Birthday, ${person.name} ❤️`,
    'From the moment I met you, something in my life shifted — like the universe quietly guiding me. You brought warmth into the parts of me I didn’t even know were cold, and you expanded my life with a dimension.',
    'On your birthday, I just want you to know this: I want you with me in every chapter, every sunshine, every tomorrow. No matter what comes, I’ll be on your side — always. I’ll choose you, protect you, stand with you, and from my side you’re never alone.',
    'You’re not just another year older today… you’re the reason my life feels softer, brighter, and endlessly worth living. Happy Birthday.',
  ],
  signature: sender.signature,
};

/* ---------------------------------------------------------------------------
 * 4. The floating notes page
 * ------------------------------------------------------------------------ */

export const loveNotes = [
  "I don't know if I have the perfect words to describe what makes you special, but there are a few things I genuinely admire about you.",
  "Your kind nature, your simplicity, your beautiful smile, and the way you carry yourself make you truly unique.",
  "There's a certain charm in your personality that is difficult to explain but easy to appreciate. Your smile has its own magic, and I hope life always gives you reasons to wear it.",
  "I wish you never lose the innocence in your laughter, the kindness in your heart, or the simplicity that makes you who you are.",
  "May you become stronger with every challenge, wiser with every experience, and happier with every passing year.",
  "This little painting is just a small attempt to make your birthday a little more memorable.",
  "I hope whenever you look at it, it brings a smile to your face.",
];

/* ---------------------------------------------------------------------------
 * 5. Home page labels
 * ------------------------------------------------------------------------ */

export const home = {
  greeting: `Dear ${person.name}`,
  date: person.birthday,
  letterButton: `Click Here ${person.name}`,
  notesButton: `From ${sender.name}`,
  scrapbookLabel: 'Our Scrapbook',
};

/* ---------------------------------------------------------------------------
 * 6. Scrapbook: memories
 * ------------------------------------------------------------------------ */

export const memories = [
  {
    title: 'The first hello',
    date: 'Where it all began',
    caption: 'A simple hello that quietly turned into the best part of my life.',
    image: person.photo,
    imageAlt: person.photoAlt,
    imageFit: 'cover',
  },
  {
    title: 'Late-night talks',
    date: '12 a.m',
    caption: 'Conversations that never enough for me, even when the sun came up.',
    image: mewmew,
    imageAlt: 'A tiny cat holding a heart',
    imageFit: 'contain',
  },
  {
    title: 'You',
    date: 'My favourite equation',
    caption: 'Two little cats, one very big feeling. It has always been us.',
    image: '/stickers/cat-hugging.webp',
    imageAlt: 'Two kittens hugging',
    imageFit: 'contain',
  },
  {
    title: 'Flowers for you',
    date: 'Just because',
    caption: 'A tiny bouquet for the girl who makes absolutely everything bloom.',
    image: '/stickers/sticker-3.webp',
    imageAlt: 'Pressed flower bouquet sticker',
    imageFit: 'contain',
  },
  {
    title: 'The little things',
    date: 'Kept on purpose',
    caption: 'Songs, screenshots, inside jokes, and moments I kept because they were ours.',
    image: heartLetter,
    imageAlt: 'A fabric heart with a stitched arrow',
    imageFit: 'cover',
  },
  {
    title: 'Your main-character era',
    date: `Turning ${person.age}`,
    caption: 'Glasses on, peace sign up, absolutely unstoppable. The world is yours.',
    image: '/stickers/cat-glasses.webp',
    imageAlt: 'A cat wearing glasses and a bow',
    imageFit: 'contain',
  },
];

/* ---------------------------------------------------------------------------
 * 7. Scrapbook: timeline
 * ------------------------------------------------------------------------ */

export const timeline = [
  {
    date: 'Day one',
    title: 'The first hello',
    text: 'One message. No idea that it would become the start of something I would want to remember forever.',
  },
  {
    date: 'A favourite chapter',
    title: 'The first “I like you which i have said”',
    text: 'Three little words that made the whole world feel quieter, warmer, and a lot more like home.',
  },
  {
    date: person.birthday,
    title: `Today — your ${person.age}th birthday`,
    text: 'And here I: celebrates you, the person who made all of these little moments add up to something beautiful.',
    highlight: true,
  },
];

/* ---------------------------------------------------------------------------
 * 8. Scrapbook: reasons + wish jar
 * ------------------------------------------------------------------------ */

export const reasons = [
  {
    front: 'Your smile',
    back: 'It arrives before you even say a word — and somehow fixes the whole day.',
  },
  {
    front: 'Your laugh',
    back: 'Loud, ridiculous, contagious. My favourite sound in any room.',
  },
  {
    front: 'Your kindness',
    back: 'You notice the little things people need before they even ask.',
  },
  {
    front: 'Your strength',
    back: 'You keep going, keep growing, keep becoming — and you make it look beautiful.',
  },
  {
    front: 'Your presence',
    back: 'Everything feels calmer, softer, and a little more like home when you are around.',
  },
];

export const wishes = [
  'A guy who is always with you.',
  'The courage to chase the things that make your eyes light up.',
  'People who love you loudly, exactly as you are.',
  'God will give hundred tiny moments that make u feel ridiculously lucky.',
  'A life that feels as beautiful as the way you make other people feel.',
  'More laughter than your ribs can handle, and someone always there 4u .',
];

/* ---------------------------------------------------------------------------
 * 9. Scrapbook: page copy
 * ------------------------------------------------------------------------ */

export const scrapbook = {
  title: 'Our Scrapbook',
  intro:
    'Some people are made of moments. This is a handful of mine with you — the memories, the tiny milestones, the wishes, and the stickers I could not resist.',
  footer: 'Made with love, a little bit of code, and far too many stickers.',
};
