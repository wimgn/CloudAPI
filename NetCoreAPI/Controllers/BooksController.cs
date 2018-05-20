using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Model;

[Route("api/v1/booksold")]
public class BooksController : Controller
{
    private static List<Book> list = new List<Book>();
    private LibraryContext _ctxt;
    public BooksController(LibraryContext ctxt)
    {
        _ctxt = ctxt;
    }

    static BooksController()
    {
        list.Add(new Book()
        {
            Id = 1,
            Title = "Living on Mars in 2043",
            ISBN = "444-332-3473663",
            Author = null,
            Pages = 438
        });
        list.Add(new Book()
        {
            Id = 2,
            Title = "Living on Mars in 2043",
            ISBN = "444-332-3473663",
            Author = null,
            Pages = 438
        });
        list.Add(new Book()
        {
            Id = 3,
            Title = "Living on Mars in 2043",
            ISBN = "444-332-3473663",
            Author = null,
            Pages = 438
        });
    }

    [Route("{id}")]   // api/v1/books/2
    [HttpGet]
    public IActionResult GetBook(int id)
    {
        if (list.Exists(d => d.Id == id))
            return NotFound();

        return Ok(list.FirstOrDefault(d => d.Id == id));
    }

    [HttpGet]         // api/v1/books
    public List<Book> GetAllBooks()
    {
        return _ctxt.Books.ToList();
    }

    [Route("{id}")]
    [HttpDelete]
    public IActionResult DeleteBook(int id)
    {
        if (list.Exists(d => d.Id == id))
            return NotFound();
        else list.Remove(list.FirstOrDefault(d => d.Id == id));
        //book verwijderen ..
        return NoContent();
    }

    [HttpPost]
    public IActionResult CreateBook([FromBody] Book newBook)
    {
        //Book toevoegen in de databank, Id wordt dan ook toegekend
        newBook.Id = 3;
        // Stuur een result 201 terug met daarin het aangemaakte object  
        return Created("", newBook);
        // Alternatief met url naar action om deze resource op te halen
        // return CreatedAtAction(nameof(GetBook), new { id = newBook.Id }, newBook);
    }

    [HttpPut]
    public IActionResult UpdateBook([FromBody] Book updateBook)
    {
        var orgbook = list.FirstOrDefault(d => d.Id == updateBook.Id);
        if(orgbook == null)
            return NotFound();

        orgbook.Title = updateBook.Title;
        orgbook.Pages = updateBook.Pages;
        orgbook.ISBN = updateBook.ISBN;
        
        return Ok(orgbook);
    }
}

