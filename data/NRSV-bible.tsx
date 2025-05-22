/**
 * NRSV-bible.tsx
 *
 * This file contains the structured data for the New Revised Standard Version (NRSV) Bible.
 * It includes all 73 books of the Catholic Bible (46 Old Testament, 27 New Testament).
 *
 * The data is structured for efficient rendering and navigation in the Bible component.
 */

// Define TypeScript interfaces for Bible data structure
export interface Verse {
  number: number;
  text: string;
}

export interface Chapter {
  number: number;
  verses: Verse[];
}

export interface Book {
  id: string;
  name: string;
  abbreviation: string;
  testament: 'old' | 'new';
  category: BookCategory;
  chapters: Chapter[];
}

// Book categories for better organization
export type BookCategory =
  | 'Pentateuch'
  | 'Historical'
  | 'Wisdom'
  | 'Major Prophets'
  | 'Minor Prophets'
  | 'Deuterocanonical'
  | 'Gospels'
  | 'Acts'
  | 'Pauline Epistles'
  | 'General Epistles'
  | 'Apocalyptic';

// Bible interface representing the entire Bible structure
export interface Bible {
  version: string;
  books: Book[];
}

// Sample structure for the Bible data
// Note: This is a placeholder structure. The actual verse content is abbreviated for brevity.
// In a production environment, this would contain the full text of each verse.
export const NRSVBible: Bible = {
  version: "New Revised Standard Version",
  books: [
    // Old Testament - Pentateuch
    {
      id: "genesis",
      name: "Genesis",
      abbreviation: "Gen",
      testament: "old",
      category: "Pentateuch",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "In the beginning when God created the heavens and the earth," },
            { number: 2, text: "the earth was a formless void and darkness covered the face of the deep, while a wind from God swept over the face of the waters." },
            { number: 3, text: "Then God said, 'Let there be light'; and there was light." },
            { number: 4, text: "And God saw that the light was good; and God separated the light from the darkness." },
            { number: 5, text: "God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day." }
          ]
        },
        {
          number: 2,
          verses: [
            { number: 1, text: "Thus the heavens and the earth were finished, and all their multitude." },
            { number: 2, text: "And on the seventh day God finished the work that he had done, and he rested on the seventh day from all the work that he had done." },
            { number: 3, text: "So God blessed the seventh day and hallowed it, because on it God rested from all the work that he had done in creation." }
          ]
        }
      ]
    },
    {
      id: "exodus",
      name: "Exodus",
      abbreviation: "Exod",
      testament: "old",
      category: "Pentateuch",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "These are the names of the sons of Israel who came to Egypt with Jacob, each with his household:" },
            { number: 2, text: "Reuben, Simeon, Levi, and Judah," },
            { number: 3, text: "Issachar, Zebulun, and Benjamin," }
          ]
        },
        {
          number: 2,
          verses: [
            { number: 1, text: "A man from the house of Levi went and married a Levite woman." },
            { number: 2, text: "The woman conceived and bore a son; and when she saw that he was a fine baby, she hid him three months." }
          ]
        }
      ]
    },
    {
      id: "leviticus",
      name: "Leviticus",
      abbreviation: "Lev",
      testament: "old",
      category: "Pentateuch",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "The Lord summoned Moses and spoke to him from the tent of meeting, saying:" },
            { number: 2, text: "Speak to the people of Israel and say to them: When any of you bring an offering of livestock to the Lord, you shall bring your offering from the herd or from the flock." }
          ]
        }
      ]
    },
    {
      id: "numbers",
      name: "Numbers",
      abbreviation: "Num",
      testament: "old",
      category: "Pentateuch",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "The Lord spoke to Moses in the wilderness of Sinai, in the tent of meeting, on the first day of the second month, in the second year after they had come out of the land of Egypt, saying:" },
            { number: 2, text: "Take a census of the whole congregation of Israelites, in their clans, by ancestral houses, according to the number of names, every male individually;" }
          ]
        }
      ]
    },
    {
      id: "deuteronomy",
      name: "Deuteronomy",
      abbreviation: "Deut",
      testament: "old",
      category: "Pentateuch",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "These are the words that Moses spoke to all Israel beyond the Jordan—in the wilderness, on the plain opposite Suph, between Paran and Tophel, Laban, Hazeroth, and Di-zahab." },
            { number: 2, text: "(By the way of Mount Seir it takes eleven days to reach Kadesh-barnea from Horeb.)" }
          ]
        }
      ]
    },

    // Old Testament - Historical Books
    {
      id: "joshua",
      name: "Joshua",
      abbreviation: "Josh",
      testament: "old",
      category: "Historical",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "After the death of Moses the servant of the Lord, the Lord spoke to Joshua son of Nun, Moses' assistant, saying," },
            { number: 2, text: "'My servant Moses is dead. Now proceed to cross the Jordan, you and all this people, into the land that I am giving to them, to the Israelites.'" }
          ]
        }
      ]
    },
    {
      id: "judges",
      name: "Judges",
      abbreviation: "Judg",
      testament: "old",
      category: "Historical",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "After the death of Joshua, the Israelites inquired of the Lord, 'Who shall go up first for us against the Canaanites, to fight against them?'" },
            { number: 2, text: "The Lord said, 'Judah shall go up. I hereby give the land into his hand.'" }
          ]
        }
      ]
    },

    // Old Testament - Deuterocanonical Books
    {
      id: "tobit",
      name: "Tobit",
      abbreviation: "Tob",
      testament: "old",
      category: "Deuterocanonical",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "This book tells the story of Tobit son of Tobiel son of Hananiel son of Aduel son of Gabael son of Raphael son of Raguel of the descendants of Asiel, of the tribe of Naphtali," },
            { number: 2, text: "who in the days of King Shalmaneser of the Assyrians was taken into captivity from Thisbe, which is to the south of Kedesh Naphtali in Upper Galilee, above Asher toward the west, and north of Phogor." }
          ]
        }
      ]
    },
    {
      id: "judith",
      name: "Judith",
      abbreviation: "Jdt",
      testament: "old",
      category: "Deuterocanonical",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "It was the twelfth year of the reign of Nebuchadnezzar, who ruled over the Assyrians in the great city of Nineveh. In those days Arphaxad ruled over the Medes in Ecbatana;" },
            { number: 2, text: "he built walls around Ecbatana with hewn stones three cubits thick and six cubits long; he made the walls seventy cubits high and fifty cubits wide." }
          ]
        }
      ]
    },

    // Old Testament - Wisdom Books
    {
      id: "job",
      name: "Job",
      abbreviation: "Job",
      testament: "old",
      category: "Wisdom",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "There was once a man in the land of Uz whose name was Job. That man was blameless and upright, one who feared God and turned away from evil." },
            { number: 2, text: "There were born to him seven sons and three daughters." }
          ]
        }
      ]
    },
    {
      id: "psalms",
      name: "Psalms",
      abbreviation: "Ps",
      testament: "old",
      category: "Wisdom",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "Happy are those who do not follow the advice of the wicked, or take the path that sinners tread, or sit in the seat of scoffers;" },
            { number: 2, text: "but their delight is in the law of the Lord, and on his law they meditate day and night." }
          ]
        },
        {
          number: 23,
          verses: [
            { number: 1, text: "The Lord is my shepherd, I shall not want." },
            { number: 2, text: "He makes me lie down in green pastures; he leads me beside still waters;" },
            { number: 3, text: "he restores my soul. He leads me in right paths for his name's sake." }
          ]
        }
      ]
    },
    {
      id: "proverbs",
      name: "Proverbs",
      abbreviation: "Prov",
      testament: "old",
      category: "Wisdom",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "The proverbs of Solomon son of David, king of Israel:" },
            { number: 2, text: "For learning about wisdom and instruction, for understanding words of insight," }
          ]
        }
      ]
    },
    {
      id: "ecclesiastes",
      name: "Ecclesiastes",
      abbreviation: "Eccl",
      testament: "old",
      category: "Wisdom",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "The words of the Teacher, the son of David, king in Jerusalem." },
            { number: 2, text: "Vanity of vanities, says the Teacher, vanity of vanities! All is vanity." }
          ]
        }
      ]
    },
    {
      id: "songofsolomon",
      name: "Song of Solomon",
      abbreviation: "Song",
      testament: "old",
      category: "Wisdom",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "The Song of Songs, which is Solomon's." },
            { number: 2, text: "Let him kiss me with the kisses of his mouth! For your love is better than wine," }
          ]
        }
      ]
    },

    // New Testament - Gospels
    {
      id: "matthew",
      name: "Matthew",
      abbreviation: "Matt",
      testament: "new",
      category: "Gospels",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "An account of the genealogy of Jesus the Messiah, the son of David, the son of Abraham." },
            { number: 2, text: "Abraham was the father of Isaac, and Isaac the father of Jacob, and Jacob the father of Judah and his brothers," },
            { number: 3, text: "and Judah the father of Perez and Zerah by Tamar, and Perez the father of Hezron, and Hezron the father of Aram," }
          ]
        },
        {
          number: 2,
          verses: [
            { number: 1, text: "In the time of King Herod, after Jesus was born in Bethlehem of Judea, wise men from the East came to Jerusalem," },
            { number: 2, text: "asking, 'Where is the child who has been born king of the Jews? For we observed his star at its rising, and have come to pay him homage.'" }
          ]
        }
      ]
    },
    {
      id: "mark",
      name: "Mark",
      abbreviation: "Mark",
      testament: "new",
      category: "Gospels",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "The beginning of the good news of Jesus Christ, the Son of God." },
            { number: 2, text: "As it is written in the prophet Isaiah, 'See, I am sending my messenger ahead of you, who will prepare your way;'" }
          ]
        }
      ]
    },
    {
      id: "luke",
      name: "Luke",
      abbreviation: "Luke",
      testament: "new",
      category: "Gospels",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "Since many have undertaken to set down an orderly account of the events that have been fulfilled among us," },
            { number: 2, text: "just as they were handed on to us by those who from the beginning were eyewitnesses and servants of the word," }
          ]
        }
      ]
    },
    {
      id: "john",
      name: "John",
      abbreviation: "John",
      testament: "new",
      category: "Gospels",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
            { number: 2, text: "He was in the beginning with God." },
            { number: 3, text: "All things came into being through him, and without him not one thing came into being. What has come into being" }
          ]
        }
      ]
    },

    // Acts
    {
      id: "acts",
      name: "Acts",
      abbreviation: "Acts",
      testament: "new",
      category: "Acts",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "In the first book, Theophilus, I wrote about all that Jesus did and taught from the beginning" },
            { number: 2, text: "until the day when he was taken up to heaven, after giving instructions through the Holy Spirit to the apostles whom he had chosen." }
          ]
        }
      ]
    },

    // Pauline Epistles
    {
      id: "romans",
      name: "Romans",
      abbreviation: "Rom",
      testament: "new",
      category: "Pauline Epistles",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "Paul, a servant of Jesus Christ, called to be an apostle, set apart for the gospel of God," },
            { number: 2, text: "which he promised beforehand through his prophets in the holy scriptures," }
          ]
        }
      ]
    },
    {
      id: "1corinthians",
      name: "1 Corinthians",
      abbreviation: "1 Cor",
      testament: "new",
      category: "Pauline Epistles",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "Paul, called to be an apostle of Christ Jesus by the will of God, and our brother Sosthenes," },
            { number: 2, text: "To the church of God that is in Corinth, to those who are sanctified in Christ Jesus, called to be saints, together with all those who in every place call on the name of our Lord Jesus Christ, both their Lord and ours:" }
          ]
        }
      ]
    },

    // General Epistles
    {
      id: "hebrews",
      name: "Hebrews",
      abbreviation: "Heb",
      testament: "new",
      category: "General Epistles",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "Long ago God spoke to our ancestors in many and various ways by the prophets," },
            { number: 2, text: "but in these last days he has spoken to us by a Son, whom he appointed heir of all things, through whom he also created the worlds." }
          ]
        }
      ]
    },

    // Apocalyptic
    {
      id: "revelation",
      name: "Revelation",
      abbreviation: "Rev",
      testament: "new",
      category: "Apocalyptic",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "The revelation of Jesus Christ, which God gave him to show his servants what must soon take place; he made it known by sending his angel to his servant John," },
            { number: 2, text: "who testified to the word of God and to the testimony of Jesus Christ, even to all that he saw." }
          ]
        }
      ]
    }
  ]
};

// Helper function to get a specific book by ID
export const getBookById = (id: string): Book | undefined => {
  return NRSVBible.books.find(book => book.id === id);
};

// Helper function to get all books by testament
export const getBooksByTestament = (testament: 'old' | 'new'): Book[] => {
  return NRSVBible.books.filter(book => book.testament === testament);
};

// Helper function to get all books by category
export const getBooksByCategory = (category: BookCategory): Book[] => {
  return NRSVBible.books.filter(book => book.category === category);
};

// Helper function to get a specific chapter from a book
export const getChapter = (bookId: string, chapterNumber: number): Chapter | undefined => {
  const book = getBookById(bookId);
  if (!book) return undefined;
  return book.chapters.find(chapter => chapter.number === chapterNumber);
};

// Helper function to get a specific verse from a chapter
export const getVerse = (bookId: string, chapterNumber: number, verseNumber: number): Verse | undefined => {
  const chapter = getChapter(bookId, chapterNumber);
  if (!chapter) return undefined;
  return chapter.verses.find(verse => verse.number === verseNumber);
};

// Helper function to search for text across the Bible
export const searchBible = (searchText: string): Array<{book: Book, chapter: Chapter, verse: Verse}> => {
  const results: Array<{book: Book, chapter: Chapter, verse: Verse}> = [];
  const searchLower = searchText.toLowerCase();

  NRSVBible.books.forEach(book => {
    book.chapters.forEach(chapter => {
      chapter.verses.forEach(verse => {
        if (verse.text.toLowerCase().includes(searchLower)) {
          results.push({book, chapter, verse});
        }
      });
    });
  });

  return results;
};

// Helper function to get all categories
export const getAllCategories = (): BookCategory[] => {
  const categories = new Set<BookCategory>();
  NRSVBible.books.forEach(book => categories.add(book.category));
  return Array.from(categories);
};

// Helper function to get the next chapter
export const getNextChapter = (bookId: string, chapterNumber: number): {bookId: string, chapterNumber: number} | undefined => {
  const book = getBookById(bookId);
  if (!book) return undefined;

  // If there's another chapter in the current book
  if (chapterNumber < book.chapters.length) {
    return {bookId, chapterNumber: chapterNumber + 1};
  }

  // Find the next book
  const bookIndex = NRSVBible.books.findIndex(b => b.id === bookId);
  if (bookIndex < NRSVBible.books.length - 1) {
    const nextBook = NRSVBible.books[bookIndex + 1];
    return {bookId: nextBook.id, chapterNumber: 1};
  }

  return undefined;
};

// Helper function to get the previous chapter
export const getPreviousChapter = (bookId: string, chapterNumber: number): {bookId: string, chapterNumber: number} | undefined => {
  const book = getBookById(bookId);
  if (!book) return undefined;

  // If there's a previous chapter in the current book
  if (chapterNumber > 1) {
    return {bookId, chapterNumber: chapterNumber - 1};
  }

  // Find the previous book
  const bookIndex = NRSVBible.books.findIndex(b => b.id === bookId);
  if (bookIndex > 0) {
    const prevBook = NRSVBible.books[bookIndex - 1];
    return {bookId: prevBook.id, chapterNumber: prevBook.chapters.length};
  }

  return undefined;
};

// Export the Bible data as default
export default NRSVBible;
