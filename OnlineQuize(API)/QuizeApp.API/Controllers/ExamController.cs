using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Quize.BAL.Services;
using Quize.DAL.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JwtWebApiTutorial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : ControllerBase
    {
       private readonly IExamService _examService;

        public ExamController(IExamService ExamService)
        {
            _examService = ExamService;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            return Ok(_examService.GetAll());
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(int id)
        {
            var Exam = _examService.GetById(id);
            if (Exam == null)
                return NotFound();

            return Ok(Exam);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult Post([FromBody]  Exame exame)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _examService.Insert(exame);
            return Ok(exame);

        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(int id)
        {
            _examService.Delete(id);
            return Ok(id);
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public IActionResult Put([FromBody] Exame exam)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var Exist = _examService.GetByIdAsNoTracking(exam.ID);
            if (Exist == null)
            {
                return NotFound("Exam Not found");
            }

            _examService.Update(exam);
            return Ok(exam);

        }
    }
}
