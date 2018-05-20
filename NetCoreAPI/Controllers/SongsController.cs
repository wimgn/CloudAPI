using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;

[Route("api/v1/songs")]
public class SongsController : Controller
{
    private readonly LibraryContext context;

    public SongsController(LibraryContext context)
    {
        this.context = context;
    }

    [HttpGet]         // api/v1/songs
    public List<Song> GetAllSongs(string genre, string title, int? page, string sort, int length = 2, string dir = "asc")
    {
        IQueryable<Song> query = context.Songs;

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
                case "artist":
                    if (dir == "asc")
                        query = query.OrderBy(d => d.Artist.Name);
                    else if (dir == "desc")
                        query = query.OrderByDescending(d => d.Artist.Name);
                    break;
            }
        }

        if (page.HasValue)
            query = query.Skip(page.Value * length);
        query = query.Take(length);

        return query.ToList();
    }

    [Route("{id}")]   // api/v1/songs/2
    [HttpGet]
    public IActionResult GetSong(int id)
    {
        var song = context.Songs
                    .Include(d => d.Artist)
                    .SingleOrDefault(d => d.Id == id);

        if (song == null)
            return NotFound();

        return Ok(song);
    }

    [Route("{id}/artist")]   // api/v1/songs/2
    [HttpGet]
    public IActionResult GetArtistForSong(int id)
    {
        var song = context.Songs
                    .Include(d => d.Artist)
                    .SingleOrDefault(d => d.Id == id);
        if (song == null)
            return NotFound();

        return Ok(song.Artist);
    }

    [HttpPost]
    public IActionResult CreateSong([FromBody] Song newSong)
    {
        //song toevoegen in de databank, Id wordt dan ook toegekend
        context.Songs.Add(newSong);
        context.SaveChanges();
        // Stuur een result 201 met het boek als content
        return Created("", newSong);
    }

    [HttpPut]
    public IActionResult UpdateSong([FromBody] Song updateSong)
    {
        var orgSong = context.Songs.Find(updateSong.Id);
        if (orgSong == null)
            return NotFound();

        orgSong.Title = updateSong.Title;
        orgSong.Genre = updateSong.Genre;

        context.SaveChanges();
        return Ok(orgSong);
    }

    [Route("{id}")]
    [HttpDelete]
    public IActionResult DeleteSong(int id)
    {
        var song = context.Songs.Find(id);
        if (song == null)
            return NotFound();

        //song verwijderen ..
        context.Songs.Remove(song);
        context.SaveChanges();
        //Standaard response 204 bij een gelukte delete
        return NoContent();
    }
}