// pages/api/search.ts
export default async function handler(req, res) {
    const { query } = req.query;
    const response = await fetch(`http://localhost:3000/phrase/search?query=${query}`);
    const data = await response.json();
    res.status(200).json(data);
  }
  