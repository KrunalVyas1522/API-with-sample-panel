"use client";
import { useState } from "react";

interface Translation {
  fr?: string;
  es?: string;
}

interface DataType {
  id: number;
  phrase: string;
  status: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  translations: Translation;
}

export default function PhraseTabuler() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DataType[]>([]);
  const [sortField, setSortField] = useState<keyof DataType | "translations.fr" | "translations.es">("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState("");

  const buildQueryParams = () => {
    const params: URLSearchParams = new URLSearchParams();

    if (query) {
      params.append("phase", query);
    }

    if (statusFilter) {
      params.append("status", statusFilter);
    }

    return params.toString();
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const queryString = buildQueryParams();
    const response = await fetch(`http://localhost:3001/phases?${queryString}`);
    const data = await response.json();

    const filteredResults = data.filter((item: any) => {
      const matchesQuery = item.phrase.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter ? item.status === statusFilter : true;
      return matchesQuery && matchesStatus;
    });

    const sortedResults = sortResults(filteredResults);
    setResults(sortedResults);
  };

  const sortResults = (data: DataType[]) => {
    return data.sort((a, b) => {
      const aValue = sortField.includes(".")
        ? a.translations[sortField.split(".")[1] as keyof Translation]
        : a[sortField];

      const bValue = sortField.includes(".")
        ? b.translations[sortField.split(".")[1] as keyof Translation]
        : b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (sortField === "createdAt" || sortField === "updatedAt") {
        const aDate = new Date(aValue as string).getTime();
        const bDate = new Date(bValue as string).getTime();
        return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
      }

      return 0; // Default case for unexpected types
    });
  };

  const handleSortChange = (field: keyof DataType | "translations.fr" | "translations.es") => {
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
    setResults(prevResults => sortResults([...prevResults]));
  };

  return (
    <div>
      <h1>Phrase Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a phrase..."
        />
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="spam">Spam</option>
          <option value="deleted">Deleted</option>
        </select>
        <button type="submit">Search</button>
      </form>

      {results.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>
                Phrase 
                <button onClick={() => handleSortChange("phrase")}>
                  {sortField === "phrase" && sortOrder === "asc" ? "▲" : "▼"}
                </button>
              </th>
              <th>
                Status 
                <button onClick={() => handleSortChange("status")}>
                  {sortField === "status" && sortOrder === "asc" ? "▲" : "▼"}
                </button>
              </th>
              <th>
                Created At 
                <button onClick={() => handleSortChange("createdAt")}>
                  {sortField === "createdAt" && sortOrder === "asc" ? "▲" : "▼"}
                </button>
              </th>
              <th>
                Updated At 
                <button onClick={() => handleSortChange("updatedAt")}>
                  {sortField === "updatedAt" && sortOrder === "asc" ? "▲" : "▼"}
                </button>
              </th>
              <th>
                Translations (FR) 
                <button onClick={() => handleSortChange("translations.fr")}>
                  {sortField === "translations.fr" && sortOrder === "asc" ? "▲" : "▼"}
                </button>
              </th>
              <th>
                Translations (ES) 
                <button onClick={() => handleSortChange("translations.es")}>
                  {sortField === "translations.es" && sortOrder === "asc" ? "▲" : "▼"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((phrase) => (
              <tr key={phrase.id}>
                <td>{phrase.id}</td>
                <td>{phrase.phrase}</td>
                <td>{phrase.status}</td>
                <td>{phrase.createdAt}</td>
                <td>{phrase.updatedAt}</td>
                <td>{phrase.translations.fr}</td>
                <td>{phrase.translations.es}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
