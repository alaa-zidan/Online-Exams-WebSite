using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quize.BAL.Services;
using Quize.DAL.Models;

namespace QuizeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChoiceController : ControllerBase
    {
        private readonly IChoicesServices _choiceService;

        public ChoiceController(IChoicesServices choiceService)
        {
            _choiceService = choiceService;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            return Ok(_choiceService.GetAll());
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(int id)
        {
            var Question = _choiceService.GetById(id);
            if (Question == null)
                return NotFound();

            return Ok(Question);
        }

        [HttpGet("Question/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetQuestionChoices(int id)
        {
            var Question = _choiceService.GetQuestionChoices(id);
            if (Question == null)
                return NotFound();

            return Ok(Question);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult Post([FromBody] Choices choice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _choiceService.Insert(choice);
            return Ok(choice);
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public IActionResult Put([FromBody] Choices choice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var Exist = _choiceService.GetByIdAsNoTracking(choice.Id);
            if (Exist == null)
            {
                return NotFound("choice Not found");
            }

            _choiceService.Update(choice);
            return Ok(choice);

        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(int id)
        {
            _choiceService.Delete(id);
            return Ok(id);
        }
    }
}
