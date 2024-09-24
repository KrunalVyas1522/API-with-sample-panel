// "use client";
// import { useState } from "react";

// interface Translation {
//   fr?: string;
//   es?: string;
// }

// interface DataType {
//   id: number;
//   phrase: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   translations: Translation;
// }

// export default function Home() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<DataType[]>([]);
//   const [sortField, setSortField] = useState<keyof DataType>("id");
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
//   const [statusFilter, setStatusFilter] = useState("");

//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Mock data
//     // const data: DataType[] = [
//     //   {
//     //     id: 1,
//     //     phrase: "Hi, I'm a phrase",
//     //     status: "active",
//     //     createdAt: "2024-05-23T15:58:35+00:00",
//     //     updatedAt: "2024-05-23T15:58:35+00:00",
//     //     translations: {
//     //       fr: "Salut, je suis une phrase",
//     //       es: "hola soy una frase",
//     //     },
//     //   },
//     //   {
//     //     id: 2,
//     //     phrase: "Another phrase here",
//     //     status: "pending",
//     //     createdAt: "2024-05-23T15:58:35+00:00",
//     //     updatedAt: "2024-05-23T15:58:35+00:00",
//     //     translations: {
//     //       fr: "Une autre phrase ici",
//     //       es: "Otra frase aquí",
//     //     },
//     //   },
//     //   {
//     //     id: 3,
//     //     phrase: "Phrase for testing",
//     //     status: "active",
//     //     createdAt: "2024-05-23T15:58:35+00:00",
//     //     updatedAt: "2024-05-23T15:58:35+00:00",
//     //     translations: {
//     //       fr: "Phrase pour test",
//     //       es: "Frase para prueba",
//     //     },
//     //   },
//     // ];
//     const response = await fetch(`http://localhost:3001/phases?query=${query}`);
//     const data = await response.json();

//     // Filter the mock data based on the search query and status filter
//     const filteredResults = data.filter((item: any) => {
//       const matchesQuery = item.phrase.toLowerCase().includes(query.toLowerCase());
//       const matchesStatus = statusFilter ? item.status === statusFilter : true;
//       return matchesQuery && matchesStatus;
//     });

//     // Sort results based on the selected field and order
//     const sortedResults = filteredResults.sort((a: any, b: any) => {
//       const aValue = sortField.includes(".")
//         ? a.translations[sortField.split(".")[1] as keyof Translation]
//         : a[sortField];
//       const bValue = sortField.includes(".")
//         ? b.translations[sortField.split(".")[1] as keyof Translation]
//         : b[sortField];

//       if (typeof aValue === "string" && typeof bValue === "string") {
//         return sortOrder === "asc"
//           ? aValue.localeCompare(bValue)
//           : bValue.localeCompare(aValue);
//       }

//       // Default sorting for other types (e.g., numeric)
//       return sortOrder === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
//     });

//     setResults(sortedResults);
//   };

//   const handleSortChange = (field: keyof DataType) => {
//     setSortField(field);
//     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//   };

//   return (
//     <div>
//       <h1>Phrase Search</h1>
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search for a phrase..."
//         />
//         <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
//           <option value="">All Statuses</option>
//           <option value="active">Active</option>
//           <option value="pending">Pending</option>
//           <option value="spam">Spam</option>
//           <option value="deleted">Deleted</option>
//         </select>
//         <button type="submit">Search</button>
//       </form>

//       {results.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>
//                 Phrase 
//                 <button onClick={() => handleSortChange("phrase")}>
//                   {sortOrder === "asc" ? "▲" : "▼"}
//                 </button>
//               </th>
//               <th>
//                 Status 
//                 <button onClick={() => handleSortChange("status")}>
//                   {sortOrder === "asc" ? "▲" : "▼"}
//                 </button>
//               </th>
//               <th>
//                 Created At 
//                 <button onClick={() => handleSortChange("createdAt")}>
//                   {sortOrder === "asc" ? "▲" : "▼"}
//                 </button>
//               </th>
//               <th>
//                 Updated At 
//                 <button onClick={() => handleSortChange("updatedAt")}>
//                   {sortOrder === "asc" ? "▲" : "▼"}
//                 </button>
//               </th>
//               <th>
//                 Translations (FR) 
//                 <button onClick={() => handleSortChange("translations.fr")}>
//                   {sortOrder === "asc" ? "▲" : "▼"}
//                 </button>
//               </th>
//               <th>
//                 Translations (ES) 
//                 <button onClick={() => handleSortChange("translations.es")}>
//                   {sortOrder === "asc" ? "▲" : "▼"}
//                 </button>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.map((phrase) => (
//               <tr key={phrase.id}>
//                 <td>{phrase.id}</td>
//                 <td>{phrase.phrase}</td>
//                 <td>{phrase.status}</td>
//                 <td>{phrase.createdAt}</td>
//                 <td>{phrase.updatedAt}</td>
//                 <td>{phrase.translations.fr}</td>
//                 <td>{phrase.translations.es}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No results found</p>
//       )}
//     </div>
//   );
// }
