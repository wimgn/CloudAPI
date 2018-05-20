using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;

[Route("api/v1/artists")]
public class ArtistsController : Controller
{
    private readonly LibraryContext context;

    public ArtistsController(LibraryContext context)
    {
        this.context = context;
    }

    [HttpGet]         // api/v1/artists
    public List<Artist> GetAllAuthors()
    {
        return context.Artists.ToList();
    }

    [Route("{id}")]   // api/v1/artists/2
    [HttpGet]
    public IActionResult GetArtist(int id)
    {
        var artist = context.Artists.Find(id);
        if (artist == null)
            return NotFound();

        return Ok(artist);
    }

    [Route("{id}/songs")]   // api/v1/artists/2/songs
    [HttpGet]
    public IActionResult GetSongsForArtist(int id)
    {
        var artist = context.Artists
                .Include(d => d.Songs)
                .SingleOrDefault(d => d.Id == id);

        if (artist == null)
            return NotFound();

        return Ok(artist.Songs);
    }

    [HttpPost]
    public IActionResult CreateArtist([FromBody] Artist newArtist)
    {
        //Book toevoegen in de databank, Id wordt dan ook toegekend
        context.Artists.Add(newArtist);
        context.SaveChanges();
        // Stuur een result 201 met het boek als content
        return Created("", newArtist);
    }

    [HttpPut]
    public IActionResult UpdateAuthor([FromBody] Artist updateArtist)
    {
        var orgArtist = context.Artists.Find(updateArtist.Id);
        if (orgArtist == null)
            return NotFound();

        orgArtist.Name = updateArtist.Name;
        
        context.SaveChanges();
        return Ok(orgArtist);
    }

    [Route("{id}")]
    [HttpDelete]
    public IActionResult DeleteArtist(int id)
    {
        var author = context.Artists.Find(id);
        if (author == null)
            return NotFound();

        //Artist verwijderen ..
        context.Artists.Remove(author);
        context.SaveChanges();
        //Standaard response 204 bij een gelukte delete
        return NoContent();
    }
}