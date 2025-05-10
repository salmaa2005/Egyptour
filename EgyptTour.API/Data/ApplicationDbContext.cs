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
                    Name = "Handcrafted Papyrus Art",
                    Description = "Authentic Egyptian papyrus artwork featuring ancient hieroglyphics and scenes from Egyptian mythology.",
                    Price = 45.00m,
                    ImageUrl = "/images/products/papyrus-art.jpg",
                    Category = "Artifacts",
                    StockQuantity = 15
                },
                new Product
                {
                    Id = 2,
                    Name = "Egyptian Cotton Scarf",
                    Description = "Luxurious hand-woven scarf made from premium Egyptian cotton, featuring traditional patterns.",
                    Price = 35.00m,
                    ImageUrl = "/images/products/cotton-scarf.jpg",
                    Category = "Textiles",
                    StockQuantity = 20
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
                    Name = "Alabaster Vase",
                    Description = "Hand-carved alabaster vase with traditional Egyptian motifs, perfect for home decoration.",
                    Price = 75.00m,
                    ImageUrl = "/images/products/alabaster-vase.jpg",
                    Category = "Artifacts",
                    StockQuantity = 8
                },
                new Product
                {
                    Id = 5,
                    Name = "Egyptian Spice Set",
                    Description = "Collection of authentic Egyptian spices and herbs, perfect for traditional cooking.",
                    Price = 25.00m,
                    ImageUrl = "/images/products/spice-set.jpg",
                    Category = "Food",
                    StockQuantity = 25
                },
                new Product
                {
                    Id = 6,
                    Name = "Handwoven Basket",
                    Description = "Traditional Egyptian handwoven basket made from natural materials.",
                    Price = 30.00m,
                    ImageUrl = "/images/products/basket.jpg",
                    Category = "Textiles",
                    StockQuantity = 12
                }
            );
        }
    }
} 