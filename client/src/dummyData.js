export const posts = [
    {
        _id: 1,
        title: "BMW",
        description: "BMW is a world-renowned German automobile brand known for luxury, performance, and innovation. It stands for “Bayerische Motoren Werke”, meaning Bavarian Motor Works.BMW cars are celebrated for their sporty design, powerful engines, and advanced technology.They offer a perfect blend of comfort, precision handling, and driving pleasure.From sedans to SUVs and electric models, BMW continues to redefine modern mobility.",
        category: "cars",
        image: "/images/bmw.jpg",
        likes: [1,2],
        createdAt: "Fri Nov 04 2022",
        user: {
            username: "Youssef Abbas",
            image: "/images/user-avatar.png"
        },
    },
    {
        _id: 2,
        title: "JavaScript",
        description: "JavaScript is a versatile programming language used to make web pages interactive and dynamic.It runs directly in the browser, allowing developers to create engaging user experiences.Alongside HTML and CSS, it forms the core foundation of web development.JavaScript powers both front-end and back-end applications using frameworks like React and Node.js.Its flexibility and vast ecosystem make it one of the most popular languages in the world.",
        category: "programming",
        image: "/images/javascript.jpeg",
        likes: [1,2,3,4],
        createdAt: "Sun Feb 06 2022",
        user: {
            username: "Hassan Bahr",
            image: "/images/user-avatar.png"
        }
    },
    {
        _id: 3,
        title: "good destination for summer",
        description: "Istanbul is a vibrant city that uniquely connects Europe and Asia across the Bosphorus Strait.It’s famous for its rich history, stunning architecture, and cultural diversity.Landmarks like the Hagia Sophia, Blue Mosque, and Grand Bazaar attract millions of visitors each year.The city blends ancient traditions with modern life, creating a truly unique atmosphere.Istanbul’s energy, cuisine, and scenic views make it one of the world’s most captivating destinations.",
        category: "travelling",
        image: "/images/istanbul.jpg",
        likes: [],
        createdAt: "Fri Oct 08 2021",
        user: {
            username: "Ali Abdo",
            image: "/images/user-avatar.png"
        }
    },
    {
        _id: 4,
        title: "Italy",
        description: "Italy is a beautiful country known for its rich history, art, and breathtaking landscapes. 🇮🇹It’s home to iconic cities like Rome, Venice, Florence, and Milan, each filled with culture and charm.Italian cuisine—pizza, pasta, and gelato—is loved all around the world. From ancient ruins to stunning coastlines, Italy offers endless beauty and inspiration.Its passion for fashion, design, and tradition makes it a true heart of European culture.",
        category: "nature",
        image: "/images/Italy2.jpg",
        likes: [1,2,3,4,5],
        createdAt: "Mon Jul 06 2023",
        user: {
            username: "Youssef Abbas",
            image: "/images/user-avatar.png"
        },
    },
    {
        _id: 5,
        title: "Baghdad",
        description: "Baghdad, the capital of Iraq, is one of the oldest and most historic cities in the world. Founded in the 8th century by the Abbasid Caliph Al-Mansur, it became the heart of the Islamic Golden Age.The city was once a global center of learning, science, and culture, home to the famous House of Wisdom.Its location along the Tigris River made it a vital hub for trade and communication.Despite facing wars and challenges, Baghdad remains a symbol of resilience and heritage.It’s known for its traditional architecture, bustling markets, and warm hospitality.Modern Baghdad blends history with contemporary life, reflecting Iraq’s rich identity.The city continues to inspire hope and pride among its people and across the Arab world.",
        category: "travelling",
        image: "/images/baghdad.jpg",
        likes: [1,2,3],
        createdAt: "Fri May 12 2022",
        user: {
            username: "Mona Samy",
            image: "/images/user-avatar.png"
        }
    },
    {
        _id: 6,
        title: "Turkish Coffee",
        description: "Turkish coffee is a traditional and richly flavored beverage enjoyed across the Middle East and the Balkans. It’s made by finely grinding coffee beans and brewing them slowly in a special pot called a cezve.The coffee is served unfiltered, with grounds settling at the bottom of the cup.Often enjoyed with sweets like Turkish delight, it’s a symbol of hospitality and culture. More than just a drink, Turkish coffee represents friendship, conversation, and centuries of tradition.",
        category: "coffee & tea",
        image: "/images/coffee.jpg",
        likes: [1],
        createdAt: "Fri Oct 21 2024",
        user: {
            username: "Yehia Younes",
            image: "/images/user-avatar.png"
        }
    },
];


export const categories = [
    {
        _id: 1,
        title: 'travelling',
    },
    {
        _id: 2,
        title: 'movies',
    },
    {
        _id: 3,
        title: 'programming',
    },
    {
        _id: 4,
        title: 'cars',
    },
    {
        _id: 5,
        title: 'music',
    },
    {
        _id: 6,
        title: 'drinks',
    },
]
