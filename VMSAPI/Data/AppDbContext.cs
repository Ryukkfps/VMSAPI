using VMSAPI.Models;
using Microsoft.EntityFrameworkCore;


namespace VMSAPI.Data
{
    public class AppDbContext :DbContext
    {
        public DbSet<Society> Societies { get; set; }
        public DbSet<Resident> Residents { get; set; }


        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {

        }
    }
}
