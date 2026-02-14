export const userData = {
    name: "Kanishk Raj",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
};

export const weatherData = {
    temp: "28°",
    location: "New Delhi",
    condition: "Sunny"
};

export const trendingData = [
    {
        id: 1,
        icon: "sports-cricket",
        overline: "T20 International",
        mainText: "India vs Australia",
        statusText: "Live",
        statusStyle: "pill"
    },
    {
        id: 2,
        icon: "trending-up",
        overline: "Market",
        mainText: "Sensex hits 75k",
        statusText: "+1.24%",
        statusStyle: "text-green"
    },
    {
        id: 3,
        icon: "movie",
        overline: "Entertainment",
        mainText: "New release this Friday",
        statusText: null,
        statusStyle: null
    }
];

export const exploreCategories = [
    { id: 1, name: "Nature", icon: "forest", color: "#22c55e" },
    { id: 2, name: "History", icon: "museum", color: "#eab308" },
    { id: 3, name: "Food", icon: "restaurant", color: "#ef4444" },
    { id: 4, name: "Tech", icon: "computer", color: "#3b82f6" },
];

export const explorePlaces = [
    { id: 1, title: "Taj Mahal", location: "Agra, India", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop", rating: "4.8" },
    { id: 2, title: "Varanasi Ghats", location: "Varanasi, India", image: "https://images.unsplash.com/photo-1561361513-35bdcd255aeb?q=80&w=2070&auto=format&fit=crop", rating: "4.7" },
    { id: 3, title: "Hawa Mahal", location: "Jaipur, India", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop", rating: "4.6" },
    { id: 4, title: "Kerala Backwaters", location: "Alleppey, India", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1932&auto=format&fit=crop", rating: "4.9" },
];

export const savedItems = [
    { id: 1, title: "Top 10 Places to Visit in Summer", category: "TRAVEL", date: "2 days ago", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, title: "Understanding India's New Budget", category: "FINANCE", date: "5 days ago", image: "https://plus.unsplash.com/premium_photo-1681487767138-ddf2d67b35c1?q=80&w=2055&auto=format&fit=crop" },
    { id: 3, title: "Traditional Recipes from Rajasthan", category: "FOOD", date: "1 week ago", image: "https://images.unsplash.com/photo-1606491956689-2ea28c674675?q=80&w=1974&auto=format&fit=crop" },
];

export const menuItems = [
    { id: 1, title: "Edit Profile", icon: "person", color: "#3b82f6" },
    { id: 2, title: "Notifications", icon: "notifications", color: "#f59e0b" },
    { id: 3, title: "Language", icon: "language", color: "#10b981" },
    { id: 4, title: "Settings", icon: "settings", color: "#64748b" },
    { id: 5, title: "Help & Support", icon: "help", color: "#8b5cf6" },
    { id: 6, title: "Log Out", icon: "logout", color: "#ef4444" },
];

export const languages = ["English", "हिन्दी", "தமிழ்", "తెలుగు", "বাংলা"];

export const notificationData = [
    {
        id: 1,
        type: "sports",
        title: "Cricket Update",
        subtitle: "India won by 5 wickets",
        description: "Final match: IND vs AUS. Clinical finish by the middle order.",
        time: "2m ago",
        read: false,
        icon: "sports-cricket",
        color: "blue",
        section: "Today"
    },
    {
        id: 2,
        type: "finance",
        title: "Market Alert",
        subtitle: "Sensex hits new high",
        description: "BSE Sensex crosses the 75,000 mark for the first time.",
        time: "45m ago",
        read: false,
        icon: "trending-up",
        color: "green",
        section: "Today"
    },
    {
        id: 3,
        type: "utility",
        title: "Utility",
        subtitle: "Your FastTag balance is low",
        description: "Wallet balance: ₹142. Recharge soon to avoid tolls.",
        time: "1d ago",
        read: true,
        icon: "payment",
        color: "amber",
        section: "Yesterday"
    },
    {
        id: 4,
        type: "news",
        title: "ProXplore News",
        subtitle: "New Metro line inaugurated",
        description: "The Aqua Line extension is now open for public commute.",
        time: "1d ago",
        read: true,
        icon: "campaign",
        color: "purple",
        section: "Yesterday"
    }
];
