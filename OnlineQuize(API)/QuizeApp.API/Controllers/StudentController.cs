using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JwtWebApiTutorial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        //private readonly IBookService _BookService;

        //  public BookController(IBookService BookService)
        //{
        //    _BookService = BookService;
        //}
        //Get info student
        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(int id)
        {
            //var Book = _BookService.GetById(id);
            //if (Book == null)
            //    return NotFound();

            //return Ok(Book);
            return Ok("Question");
        }

        //set result of exam for stuent
        //[HttpPost, Authorize]
        //public IActionResult Post([FromBody] Degree degree)
        //{
        //    _BookService.Insert(Book);
        //    return Ok(Book);
        //}
    }
}
