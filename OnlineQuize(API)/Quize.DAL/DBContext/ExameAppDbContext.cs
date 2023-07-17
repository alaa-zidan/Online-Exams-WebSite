using Microsoft.EntityFrameworkCore;
using Quize.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.DAL.DBContext
{
    public class ExameAppDbContext : DbContext
    {
        public ExameAppDbContext(DbContextOptions<ExameAppDbContext> options) : base(options)
        {
        }
        public DbSet<Users> Users { get; set; }
        public DbSet<Questions> Questions { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Choices> Choices { get; set; }
        public DbSet<Exame> exames { get; set; }
        public DbSet<ExameAttempt> examesAttempt { get; set;}

        
    }
}
