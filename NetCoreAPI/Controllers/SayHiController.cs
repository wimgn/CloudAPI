using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

public class SayHiController : Controller
{
    // This action is accessible via the url (route): http://localhost:5000/hi    
    [Route("hi")]
    [HttpGet]
    [Authorize]
    public IActionResult Hello()
    {
        var result = Content("Hello world !");
        result.ContentType = "text/plain";
        result.StatusCode = 200;
        return result;
    }

    [Route("thiswillreturn404")]
    [HttpGet]
    public IActionResult ReturnStatus404()
    {
        return Forbid();
    }

    // [Route("books")]
    // [HttpGet]
    // public List<Book> GetBooks()
    // {
    //    return null;
    // }


    [Route("books")]
    [HttpPost]
    public void AddBook()
    {
        //Book toevoegen        
    }
}


