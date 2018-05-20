
using Microsoft.AspNetCore.Mvc;

[Route("api/Test")]
public class TestController : Controller
{
    [HttpGet] 
    public JsonResult GetTestData()
    {
        var result =  Json(new Person() {name = "Leo"});
        result.StatusCode = 203;
        return result;
    }
}

public class Person 
{
    public string name;
}