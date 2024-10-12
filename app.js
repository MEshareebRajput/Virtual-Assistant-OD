let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = 'en'; // Set language to English
    window.speechSynthesis.speak(text_speak);
}

async function translateText(text) {
    return text; // Placeholder for translation logic
}

async function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    let greeting;

    if (hours >= 0 && hours < 12) {
        greeting = "Good Morning Sir! I'm OD, created by Muhammad Eshareeb Rajput (MER). How can I assist you today?";
    } else if (hours >= 12 && hours < 16) {
        greeting = "Good Afternoon Sir! I'm OD, created by Muhammad Eshareeb Rajput (MER). How can I assist you today?";
    } else {
        greeting = "Good Evening Sir! I'm OD, created by Muhammad Eshareeb Rajput (MER). How can I assist you today?";
    }

    speak(greeting);
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (speechRecognition) {
    let recognition = new speechRecognition();
    recognition.onresult = async (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        content.innerText = transcript;

        await takeCommand(transcript.toLowerCase());
    }

    btn.addEventListener("click", () => {
        recognition.start();
        voice.style.display = "block";
        btn.style.display = "none";
    });

    async function takeCommand(message) {
        voice.style.display = "none";
        btn.style.display = "flex";

        let responseText = "";

        // Core Commands
        const coreCommands = {
            "hello": "Hello Sir, how can I assist you today?",
            "hey": "Hello Sir, how can I assist you today?",
            "who are you": "I am OD, your virtual assistant created by Muhammad Eshareeb Rajput.",
            "how are you": "I am OD, I am your virtual assistant created by Muhammad Eshareeb Rajput."
        };

        // Websites and Actions
        const websiteCommands = {
            "open youtube": "Opening YouTube...",
            "open google": "Opening Google...",
            "open linkedin": "Opening LinkedIn...",
            "open github": "Opening GitHub...",
            "open vercel": "Opening Vercel...",
            "open whatsapp": "Opening WhatsApp Web...",
            "open twitter": "Opening Twitter...",
            "open facebook": "Opening Facebook...",
            "open instagram": "Opening Instagram...",
            "open netflix": "Opening Netflix...",
            "open amazon": "Opening Amazon...",
            "open udemy": "Opening Udemy...",
            "open coursera": "Opening Coursera...",
            "open dropbox": "Opening Dropbox...",
            "open dribbble": "Opening Dribbble...",
            "open medium": "Opening Medium...",
            "open pinterest": "Opening Pinterest...",
            "open quora": "Opening Quora...",
            "open stackoverflow": "Opening Stack Overflow...",
            "open bbc": "Opening BBC...",
            "open cnn": "Opening CNN...",
            "open theguardian": "Opening The Guardian...",
            "open github": "Opening GitHub...",
            "open reddit": "Opening Reddit...",
            "open zoom": "Opening Zoom...",
            "open teams": "Opening Microsoft Teams...",
            "open slack": "Opening Slack...",
            "open telegram": "Opening Telegram...",
            "open tiktok": "Opening TikTok...",
            "open soundcloud": "Opening SoundCloud...",
            "open spotify": "Opening Spotify...",
            "open lastfm": "Opening Last.fm...",
            "open aliexpress": "Opening AliExpress...",
            "open etsy": "Opening Etsy...",
            "open walmart": "Opening Walmart...",
            "open bestbuy": "Opening Best Buy...",
            "open home depot": "Opening Home Depot...",
            "open airbnb": "Opening Airbnb...",
            "open yelp": "Opening Yelp...",
            "open tripadvisor": "Opening TripAdvisor...",
            "open indeed": "Opening Indeed...",
            "open glassdoor": "Opening Glassdoor...",
            "open upwork": "Opening Upwork...",
            "open fiverr": "Opening Fiverr...",
            "open freelancer": "Opening Freelancer...",
            "open github": "Opening GitHub...",
            "open deviantart": "Opening DeviantArt...",
            "open vk": "Opening VK...",
            "open myspace": "Opening MySpace...",
            "open scribd": "Opening Scribd...",
            "open scribd": "Opening Scribd...",
            "open last.fm": "Opening Last.fm...",
            "open angel.co": "Opening AngelList...",
            "open producthunt": "Opening Product Hunt...",
            "open hackernews": "Opening Hacker News...",
            "open criteo": "Opening Criteo...",
            "open cnet": "Opening CNET...",
            "open techcrunch": "Opening TechCrunch...",
            "open wired": "Opening Wired...",
            "open engadget": "Opening Engadget...",
            "open gizmodo": "Opening Gizmodo...",
            "open theverge": "Opening The Verge...",
            "open xda": "Opening XDA Developers...",
            "open macrumors": "Opening MacRumors...",
            "open 9to5mac": "Opening 9to5Mac...",
            "open cnet": "Opening CNET...",
            "open tomsguide": "Opening Tom's Guide...",
            "open ign": "Opening IGN...",
            "open kotaku": "Opening Kotaku...",
            "open metacritic": "Opening Metacritic...",
            "open rotten tomatoes": "Opening Rotten Tomatoes...",
            "open voat": "Opening Voat...",
            "open openculture": "Opening Open Culture...",
            "open archive": "Opening Internet Archive...",
            "open pbs": "Opening PBS...",
            "open nationalgeographic": "Opening National Geographic...",
            "open smithsonian": "Opening Smithsonian...",
            "open history": "Opening History...",
            "open discovery": "Opening Discovery...",
            "open bbcnews": "Opening BBC News...",
            "open theatlantic": "Opening The Atlantic...",
            "open newyorktimes": "Opening The New York Times...",
            "open washingtonpost": "Opening The Washington Post...",
            "open la times": "Opening Los Angeles Times...",
            "open forbes": "Opening Forbes...",
            "open bloomberg": "Opening Bloomberg...",
            "open financialtimes": "Opening Financial Times...",
            "open economictimes": "Opening Economic Times...",
            "open nbcnews": "Opening NBC News...",
            "open abcnews": "Opening ABC News...",
            "open skynews": "Opening Sky News...",
            "open euronews": "Opening Euronews...",
            "open aljazeera": "Opening Al Jazeera...",
            "open france24": "Opening France 24...",
            "open rt": "Opening RT...",
            "open cgtn": "Opening CGTN...",
            "open voanews": "Opening VOA News...",
            "open bbc": "Opening BBC...",
            "open news24": "Opening News24...",
            "open time": "Opening Time...",
            "open fortune": "Opening Fortune...",
            "open thehill": "Opening The Hill...",
            "open axios": "Opening Axios...",
            "open politico": "Opening Politico...",
            "open vice": "Opening Vice...",
            "open slate": "Opening Slate...",
            "open thedailybeast": "Opening The Daily Beast...",
            "open salon": "Opening Salon...",
            "open axios": "Opening Axios...",
            "open thehill": "Opening The Hill...",
            "open politico": "Opening Politico...",
            "open bbc": "Opening BBC...",
            "open newsweek": "Opening Newsweek...",
            "open thedailybeast": "Opening The Daily Beast...",
            "open theverge": "Opening The Verge...",
            "open wired": "Opening Wired...",
            "open techcrunch": "Opening TechCrunch...",
            "open engadget": "Opening Engadget...",
            "open gizmodo": "Opening Gizmodo...",
            "open macrumors": "Opening MacRumors...",
            "open xda": "Opening XDA Developers...",
            "open tomsguide": "Opening Tom's Guide...",
            "open ign": "Opening IGN...",
            "open kotaku": "Opening Kotaku...",
            "open metacritic": "Opening Metacritic...",
            "open rotten tomatoes": "Opening Rotten Tomatoes...",
            "open myspace": "Opening MySpace...",
            "open voat": "Opening Voat...",
            "open open culture": "Opening Open Culture...",
            "open pbs": "Opening PBS...",
            "open national geographic": "Opening National Geographic...",
            "open smithsonian": "Opening Smithsonian...",
            "open history": "Opening History...",
            "open discovery": "Opening Discovery...",
            "open abc": "Opening ABC...",
            "open nbc": "Opening NBC...",
            "open aljazeera": "Opening Al Jazeera...",
            "open skynews": "Opening Sky News...",
            "open euronews": "Opening Euronews...",
            "open france24": "Opening France 24...",
            "open rt": "Opening RT...",
            "open voanews": "Opening VOA News...",
            "open bbc": "Opening BBC...",
            "open news24": "Opening News24...",
            "open time": "Opening Time...",
            "open fortune": "Opening Fortune...",
            "open thehill": "Opening The Hill...",
            "open axios": "Opening Axios...",
            "open politico": "Opening Politico...",
            "open vice": "Opening Vice...",
            "open slate": "Opening Slate...",
            "open thedailybeast": "Opening The Daily Beast...",
            "open salon": "Opening Salon..."
        };

        if (coreCommands[message]) {
            responseText = coreCommands[message];
        } else if (websiteCommands[message]) {
            responseText = websiteCommands[message];
            window.open(`https://${message.split(" ")[1]}.com`, "_blank");
        } else {
            responseText = "Sorry, I didn't understand that command.";
        }

        speak(responseText);
    }
} else {
    content.innerText = "Sorry, your browser doesn't support Speech Recognition.";
}

wishMe();
