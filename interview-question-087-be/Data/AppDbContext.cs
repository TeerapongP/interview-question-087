using Microsoft.EntityFrameworkCore;
using Example.Interview.Models;

namespace Example.Interview.Data;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Person> People => Set<Person>();
}
