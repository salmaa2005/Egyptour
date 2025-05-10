using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace EgyptTour.API.Migrations
{
    /// <inheritdoc />
    public partial class AddMoreProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Category", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[,]
                {
                    { 3, "Artwork", "Authentic Egyptian papyrus paintings with ancient motifs.", "https://images.unsplash.com/photo-1565992441121-4367c2967103", "Handcrafted Papyrus Art", 45m, 20 },
                    { 4, "Souvenirs", "Hand-carved replicas of famous Egyptian deities.", "https://images.unsplash.com/photo-1598188306155-25e8eb807948", "Alabaster Statues", 120m, 15 },
                    { 5, "Jewelry", "Inspired by ancient Egyptian designs with modern craftsmanship.", "https://images.unsplash.com/photo-1611591437281-460bfbe1220a", "Gold-Plated Jewelry", 85m, 25 },
                    { 6, "Beauty", "Traditional Egyptian scents like lotus and amber.", "https://images.unsplash.com/photo-1615368144592-6a8d1dfc9f5c", "Perfume Oils", 35m, 40 },
                    { 7, "Clothing", "Traditional Egyptian garments in vibrant colors.", "https://images.unsplash.com/photo-1551232864-3f0890e580d9", "Cotton Galabeyas", 55m, 30 },
                    { 8, "Home Decor", "Hand-hammered copper plates and bowls with Egyptian patterns.", "https://images.unsplash.com/photo-1584735422189-fbd9e34104b2", "Copper Tableware", 75m, 20 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);
        }
    }
}
