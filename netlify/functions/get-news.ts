import fetch from 'node-fetch';

export default async (req: Request) => {
  const url = new URL(req.url);
  const city = url.searchParams.get('city');

  if (!city) {
    return new Response('City parameter is required', { status: 400 });
  }

  const apiKey = process.env.NEWS_API_KEY;

  const goodNewsKeywords = [
    'breakthrough',
    'uplifting',
    'inspiring',
    'charity',
    'successful',
    'innovative',
    'community',
    'celebrates',
    'achieves',
    'volunteer',
    'discovery',
    'rescued',
    'donates',
    'launches',
    'art',
    'music festival',
  ].join(' OR ');

  const badNewsKeywords = [
    'death',
    'died',
    'killed',
    'murder',
    'crime',
    'war',
    'attack',
    'disaster',
    'crash',
    'explosion',
    'protest',
    'riot',
    'scandal',
    'corruption',
    'disease',
    'pandemic',
    'outbreak',
    'crisis',
    'symptoms',
    'warning',
    'slump',
    'cuts',
    'charges',
    'arrested',
    'accused',
  ].join(' OR ');

  const query = encodeURIComponent(
    `"${city}" AND (${goodNewsKeywords}) NOT (${badNewsKeywords})`
  );

  const newsApiUrl = `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=10&sortBy=relevancy&apiKey=${apiKey}`;

  try {
    const response = await fetch(newsApiUrl);
    const data = await response.json();

    // The function will return the data from NewsAPI back to our Angular app.
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Add a config to tell Netlify to handle this as a function
export const config = {
  path: '/api/get-news', // This makes the function available at yoursite.com/api/get-news
};
