using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace EgyptTour.API.Migrations
{
    /// <inheritdoc />
    public partial class RecreateDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Category", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { "Artifacts", "Authentic Egyptian papyrus artwork featuring ancient hieroglyphics and scenes from Egyptian mythology.", "/images/products/papyrus-art.jpg", "Handcrafted Papyrus Art", 45.00m, 15 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Category", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { "Textiles", "Luxurious hand-woven scarf made from premium Egyptian cotton, featuring traditional patterns.", "/images/products/cotton-scarf.jpg", "Egyptian Cotton Scarf", 35.00m, 20 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Category", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { "Artifacts", "Hand-carved alabaster vase with traditional Egyptian motifs, perfect for home decoration.", "/images/products/alabaster-vase.jpg", "Alabaster Vase", 75.00m, 8 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Category", "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Food", "Collection of authentic Egyptian spices and herbs, perfect for traditional cooking.", "/images/products/spice-set.jpg", "Egyptian Spice Set", 25.00m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Category", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { "Textiles", "Traditional Egyptian handwoven basket made from natural materials.", "/images/products/basket.jpg", "Handwoven Basket", 30.00m, 12 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Category", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { "Tours", "Experience the ancient wonders of Egypt with our guided tour of the Pyramids of Giza.", "/images/pyramids.jpg", "Pyramids Tour", 99.99m, 50 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Category", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { "Cruises", "Enjoy a luxurious cruise along the Nile River with stunning views and cultural experiences.", "/images/nile-cruise.jpg", "Nile Cruise", 299.99m, 30 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Category", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { "Souvenirs", "Hand-carved replicas of famous Egyptian deities.", "https://images.unsplash.com/photo-1598188306155-25e8eb807948", "Alabaster Statues", 120m, 15 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Category", "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Jewelry", "Inspired by ancient Egyptian designs with modern craftsmanship.", "https://images.unsplash.com/photo-1611591437281-460bfbe1220a", "Gold-Plated Jewelry", 85m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Category", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { "Beauty", "Traditional Egyptian scents like lotus and amber.", "https://images.unsplash.com/photo-1615368144592-6a8d1dfc9f5c", "Perfume Oils", 35m, 40 });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Category", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[,]
                {
                    { 7, "Clothing", "Traditional Egyptian garments in vibrant colors.", "https://images.unsplash.com/photo-1551232864-3f0890e580d9", "Cotton Galabeyas", 55m, 30 },
                    { 8, "Home Decor", "Hand-hammered copper plates and bowls with Egyptian patterns.", "https://images.unsplash.com/photo-1584735422189-fbd9e34104b2", "Copper Tableware", 75m, 20 }
                });
        }
    }
}
