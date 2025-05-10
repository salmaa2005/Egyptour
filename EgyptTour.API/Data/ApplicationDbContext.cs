using Microsoft.EntityFrameworkCore;
using EgyptTour.API.Models;

namespace EgyptTour.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed some initial data
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    Name = "Pyramids Tour",
                    Description = "Experience the ancient wonders of Egypt with our guided tour of the Pyramids of Giza.",
                    Price = 99.99m,
                    ImageUrl = "/images/pyramids.jpg",
                    Category = "Tours",
                    StockQuantity = 50
                },
                new Product
                {
                    Id = 2,
                    Name = "Nile Cruise",
                    Description = "Enjoy a luxurious cruise along the Nile River with stunning views and cultural experiences.",
                    Price = 299.99m,
                    ImageUrl = "/images/nile-cruise.jpg",
                    Category = "Cruises",
                    StockQuantity = 30
                },
                new Product
                {
                    Id = 3,
                    Name = "Handcrafted Papyrus Art",
                    Description = "Authentic Egyptian papyrus paintings with ancient motifs.",
                    Price = 45m,
                    ImageUrl = "https://images.unsplash.com/photo-1565992441121-4367c2967103",
                    Category = "Artwork",
                    StockQuantity = 20
                },
                new Product
                {
                    Id = 4,
                    Name = "Alabaster Statues",
                    Description = "Hand-carved replicas of famous Egyptian deities.",
                    Price = 120m,
                    ImageUrl = "https://images.unsplash.com/photo-1598188306155-25e8eb807948",
                    Category = "Souvenirs",
                    StockQuantity = 15
                },
                new Product
                {
                    Id = 5,
                    Name = "Gold-Plated Jewelry",
                    Description = "Inspired by ancient Egyptian designs with modern craftsmanship.",
                    Price = 85m,
                    ImageUrl = "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",
                    Category = "Jewelry",
                    StockQuantity = 25
                },
                new Product
                {
                    Id = 6,
                    Name = "Perfume Oils",
                    Description = "Traditional Egyptian scents like lotus and amber.",
                    Price = 35m,
                    ImageUrl = "https://images.unsplash.com/photo-1615368144592-6a8d1dfc9f5c",
                    Category = "Beauty",
                    StockQuantity = 40
                },
                new Product
                {
                    Id = 7,
                    Name = "Cotton Galabeyas",
                    Description = "Traditional Egyptian garments in vibrant colors.",
                    Price = 55m,
                    ImageUrl = "https://images.unsplash.com/photo-1551232864-3f0890e580d9",
                    Category = "Clothing",
                    StockQuantity = 30
                },
                new Product
                {
                    Id = 8,
                    Name = "Copper Tableware",
                    Description = "Hand-hammered copper plates and bowls with Egyptian patterns.",
                    Price = 75m,
                    ImageUrl = "https://images.unsplash.com/photo-1584735422189-fbd9e34104b2",
                    Category = "Home Decor",
                    StockQuantity = 20
                }
            );
        }
    }
} 