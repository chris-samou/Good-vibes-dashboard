import fetch from 'node-fetch';

export default async (req: Request) => {
  const url = new URL(req.url);
  const city = url.searchParams.get('city');
  if (!city) return new Response('City parameter is required', { status: 400 });

  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) return new Response('API key not configured', { status: 500 });

  const positiveKeywords = [
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

  const query = `"${city}" AND (${positiveKeywords})`;

  const gnewsUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
    query
  )}&lang=en&max=10&token=${apiKey}`;

  try {
    const response = await fetch(gnewsUrl);
    if (!response.ok)
      throw new Error(`GNews API error: ${response.statusText}`);
    const data = await response.json();

    const badWordsRegex =
      /death|funeral|coffin|cemetery|crime|war|attack|disaster|scandal/i;
    data.articles = (data.articles || []).filter(
      (article) => !badWordsRegex.test(article.title)
    );

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

export const config = { path: '/api/get-news' };
