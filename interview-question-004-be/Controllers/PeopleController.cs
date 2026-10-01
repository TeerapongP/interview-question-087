using Microsoft.AspNetCore.Mvc;
using Example.Interview.Data;
using Example.Interview.Models;

namespace Example.Interview.Controllers;

[ApiController]
[Route("api/people")]
public sealed class PeopleController(AppDbContext db) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create(Person person)
    {
        db.People.Add(person);
        await db.SaveChangesAsync();
        return StatusCode(StatusCodes.Status201Created);
    }
}
