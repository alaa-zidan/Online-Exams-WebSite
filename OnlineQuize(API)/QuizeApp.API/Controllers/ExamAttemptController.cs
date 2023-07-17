using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quize.BAL.Services;
using Quize.DAL.Models;
using Quize.DAL.Models.DTO;

namespace QuizeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ExamAttemptController : ControllerBase
    {

        private readonly IExamAttemptService _examAttemptService;
        public ExamAttemptController(IExamAttemptService examAttemptService)
        {
            _examAttemptService = examAttemptService;
        }


        [HttpPost]
        
        public IActionResult Post([FromBody] ExameAttempt exameAttempt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _examAttemptService.Insert(exameAttempt);
            return Ok(exameAttempt);

        }

        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var Exam = _examAttemptService.GetAllByUserID(userId); 

            List<ExamAttempDTO> examAttemps = new List<ExamAttempDTO>();
            foreach (var item in Exam)
            {
                ExamAttempDTO ExamViewModel = new ExamAttempDTO();

                ExamViewModel.UserName = item.User.Name;
                ExamViewModel.ExamName = item.Exame.Name;
                ExamViewModel.Grade = item.Score;
                ExamViewModel.HighGrade = item.HighScore;

                examAttemps.Add(ExamViewModel);
            }


            if (Exam == null)
            {
                return NotFound("this user has no grades");
            }
            else
            {
                return Ok(examAttemps);
            }
        }


    }
}

