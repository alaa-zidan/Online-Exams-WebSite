using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quize.BAL.Services;
using Quize.DAL.Models;
using Quize.DAL.Models.DTO;

namespace JwtWebApiTutorial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionsService _questionService;
        private readonly IChoicesServices _choicesService;

        public QuestionController(IQuestionsService questionService, IChoicesServices choicesService)
        {
            _questionService = questionService;
            _choicesService = choicesService;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
           return Ok(_questionService.GetAll());
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(int id)
        {
            var Question = _questionService.GetById(id);
            if (Question == null)
                return NotFound();

            return Ok(Question);
        }


        [HttpGet("Exam/{id}")]
        public IActionResult GetExamQuestions(int id)
        {
            var questions = _questionService.GetAllQuestionOfExam(id);
            if (questions == null)
                return NotFound();
            List<ExamDTO> examDtos = new List<ExamDTO>();
            foreach (var item in questions)
            {
                var examDto = new ExamDTO();
                examDto.Id = item.Id;
                examDto.Text = item.Text;
                examDto.CorrectAnswer = item.CorrectAnswer;
                examDto.ExamID = item.ExameID;
                examDto.choices = item.Choices;
                examDto.SelectedValue = "";
                examDtos.Add(examDto);
            }
            return Ok(examDtos);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult Post([FromBody]Questions question)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _questionService.Insert(question);
            return Ok(question);

        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public IActionResult Put([FromBody] Questions question)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var Exist = _questionService.GetByIdAsNoTracking(question.Id);
            if (Exist == null)
            {
                return NotFound("Question Not found");
            }

            _questionService.Update(question);
            return Ok(question);

        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(int id)
        {
            _questionService.Delete(id);
            return Ok(id);
        }
    }
}
