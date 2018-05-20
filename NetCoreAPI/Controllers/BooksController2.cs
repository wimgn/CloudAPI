using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;

[Route("api/v1/books")]
public class BooksController2 : Controller
{
    private readonly LibraryContext context;

    public BooksController2(LibraryContext context)
    {
        this.context = context;
    }

    [HttpGet]         // api/v1/books
    public List<Book> GetAllBooks(string genre, string title, int? page, string sort, int length = 2, string dir = "asc")
    {
        IQueryable<Book> query = context.Books;

        if (!string.IsNullOrWhiteSpace(genre))
            query = query.Where(d => d.Genre == genre);
        if (!string.IsNullOrWhiteSpace(title))
            query = query.Where(d => d.Title == title);

        if (!string.IsNullOrWhiteSpace(sort))
        {
            switch (sort)
            {
                case "title":
                    if (dir == "asc")
                        query = query.OrderBy(d => d.Title);
                    else if (dir == "desc")
                        query = query.OrderByDescending(d => d.Title);
                    break;
                case "isbn":
                    if (dir == "asc")
                        query = query.OrderBy(d => d.ISBN);
                    else if (dir == "desc")
                        query = query.OrderByDescending(d => d.ISBN);
                    break;
            }
        }

        if (page.HasValue)
            query = query.Skip(page.Value * length);
        query = query.Take(length);

        return query.ToList();
    }

    [Route("{id}")]   // api/v1/books/2
    [HttpGet]
    public IActionResult GetBook(int id)
    {
        var book = context.Books
                    .Include(d => d.Author)
                    .SingleOrDefault(d => d.Id == id);

        if (book == null)
            return NotFound();

        return Ok(book);
    }

    [Route("{id}/author")]   // api/v1/books/2
    [HttpGet]
    public IActionResult GetAuthorForBook(int id)
    {
        var book = context.Books
                    .Include(d => d.Author)
                    .SingleOrDefault(d => d.Id == id);
        if (book == null)
            return NotFound();

        return Ok(book.Author);
    }

    [HttpPost]
    public IActionResult CreateBook([FromBody] Book newBook)
    {
        //Book toevoegen in de databank, Id wordt dan ook toegekend
        context.Books.Add(newBook);
        context.SaveChanges();
        // Stuur een result 201 met het boek als content
        return Created("", newBook);
    }

    [HttpPut]
    public IActionResult UpdateBook([FromBody] Book updateBook)
    {
        var orgBook = context.Books.Find(updateBook.Id);
        if (orgBook == null)
            return NotFound();

        orgBook.Title = updateBook.Title;
        orgBook.Pages = updateBook.Pages;
        orgBook.ISBN = updateBook.ISBN;
        orgBook.Genre = updateBook.Genre;

        context.SaveChanges();
        return Ok(orgBook);
    }

    [Route("{id}")]
    [HttpDelete]
    public IActionResult DeleteBook(int id)
    {
        var book = context.Books.Find(id);
        if (book == null)
            return NotFound();

        //book verwijderen ..
        context.Books.Remove(book);
        context.SaveChanges();
        //Standaard response 204 bij een gelukte delete
        return NoContent();
    }
}