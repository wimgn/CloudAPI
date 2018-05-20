using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;

[Route("api/v1/authors")]
public class AuthorsController : Controller
{
    private readonly LibraryContext context;

    public AuthorsController(LibraryContext context)
    {
        this.context = context;
    }

    [HttpGet]         // api/v1/books
    public List<Author> GetAllAuthors()
    {
        return context.Authors.ToList();
    }

    [Route("{id}")]   // api/v1/books/2
    [HttpGet]
    public IActionResult GetAuthor(int id)
    {
        var author = context.Authors.Find(id);
        if (author == null)
            return NotFound();

        return Ok(author);
    }

    [Route("{id}/books")]   // api/v1/books/2
    [HttpGet]
    public IActionResult GetBooksForAuthor(int id)
    {
        var author = context.Authors
                .Include(d => d.Books)
                .SingleOrDefault(d => d.Id == id);

        if (author == null)
            return NotFound();

        return Ok(author.Books);
    }

    [HttpPost]
    public IActionResult CreateAuthor([FromBody] Author newAuthor)
    {
        //Book toevoegen in de databank, Id wordt dan ook toegekend
        context.Authors.Add(newAuthor);
        context.SaveChanges();
        // Stuur een result 201 met het boek als content
        return Created("", newAuthor);
    }

    [HttpPut]
    public IActionResult UpdateAuthor([FromBody] Author updateAuthor)
    {
        var orgAuthor = context.Authors.Find(updateAuthor.Id);
        if (orgAuthor == null)
            return NotFound();

        orgAuthor.Name = updateAuthor.Name;
        orgAuthor.FirstName = updateAuthor.FirstName;
        
        context.SaveChanges();
        return Ok(orgAuthor);
    }

    [Route("{id}")]
    [HttpDelete]
    public IActionResult DeleteAuthor(int id)
    {
        var author = context.Authors.Find(id);
        if (author == null)
            return NotFound();

        //book verwijderen ..
        context.Authors.Remove(author);
        context.SaveChanges();
        //Standaard response 204 bij een gelukte delete
        return NoContent();
    }
}