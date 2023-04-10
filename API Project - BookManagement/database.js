const books = [
    {
      ISBN: "12345Book",
      title: "Getting started with MERN",
      pubDate: "2021-11-25",
      language: "english",
      numPage: 250,
      author: [1,2],
      publications: [1],
      category: ["tech", "programming", "education"]
    },
    {
        ISBN: "1222Lore",
        title: "Greek myths",
        pubDate: "1905-11-06",
        language: "deutsch",
        numPage: 1500,
        author: [1],
        publications: [2],
        category: ["greek", "history", "lore","myths"]
    },
    {
        ISBN: "897Bsd",
        title: "API",
        pubDate: "2015-01-12",
        language: "italian",
        numPage: 550,
        author: [3],
        publications: [1],
        category: ["tech", "programming", "education"]
    }

  ];
  
const authors = [
    {
      id: 1,
      name: "Ravi H",
      books: ["12345Book", "1222Lore"]
    },
    {
      id: 2,
      name: "Talia S",
      books: ["12345Book"]
    },
    {
        id: 3,
        name: "Sara L",
        books: ["897Bsd"]
    }
];
  
const publications = [
    {
      id: 1,
      name: "Pearson",
      books: ["12345Book","897Bsd"]
    },
    {
      id: 2,
      name: "OXFORD",
      books: ["1222Lore"]
    }
];
  
module.exports = {books, authors, publications};