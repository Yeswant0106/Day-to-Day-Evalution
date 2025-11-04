import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch("http://localhost:5000/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const addBook = () => {
    fetch("http://localhost:5000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Added:", data);
        fetchBooks();
        setNewBook({ title: "", author: "" });
      });
  };

  const updateBook = (id) => {
    fetch(`http://localhost:5000/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...books.find((book) => book.id === id),
        title: "Updated Book",
        author: "Updated Author",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated:", data);
        fetchBooks();
      });
  };

  const deleteBook = (id) => {
    fetch(`http://localhost:5000/books/${id}`, {
      method: "DELETE",
    }).then(() => {
      console.log("Deleted book with ID:", id);
      fetchBooks();
    });
  };

  return (
    <div className="container">
      <h1>Book Management System</h1>
      
      <div className="add-book">
        <h2>Add New Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      <div className="book-list">
        <h2>Book List</h2>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              {book.title} by {book.author}
              <button onClick={() => updateBook(book.id)}>Update</button>
              <button onClick={() => deleteBook(book.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;