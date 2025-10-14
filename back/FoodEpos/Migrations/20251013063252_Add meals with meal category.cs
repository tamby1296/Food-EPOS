using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FoodEpos.API.Migrations
{
    /// <inheritdoc />
    public partial class Addmealswithmealcategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Meals",
                columns: new[] { "Id", "ImgURL", "MealCategoryId", "Name", "Price" },
                values: new object[,]
                {
                    { "13674975-5f6a-4b79-9f17-cfea791d28a2", "https://example.com/images/margherita.jpg", -1, "Margherita Pizza", 9.99f },
                    { "16677470-2c6b-446b-847f-f0b28b46ed0e", "https://example.com/images/caesar.jpg", -2, "Chicken Caesar Salad", 8.5f },
                    { "2b267a03-dfa8-4f40-b0bb-f14b211ec3b4", "https://example.com/images/bolognese.jpg", -1, "Spaghetti Bolognese", 11.25f },
                    { "307b2786-62ac-42e8-8f7b-f2910184e435", "https://example.com/images/salmon.jpg", -4, "Grilled Salmon", 14.95f },
                    { "54835e48-1cec-4163-be1a-030a901e7d85", "https://example.com/images/buddha.jpg", -2, "Vegan Buddha Bowl", 10.5f },
                    { "7d3a1483-002d-42bc-8ef4-18c018b10e12", "https://example.com/images/burger.jpg", -1, "Beef Burger", 12f },
                    { "8b6d9548-287e-404a-984a-dfdf2a39acf3", "https://example.com/images/lava_cake.jpg", -6, "Chocolate Lava Cake", 6.75f },
                    { "ab6f9c58-9df4-4b2c-930a-112eac5d2b91", "https://example.com/images/tomato_soup.jpg", -3, "Tomato Soup", 7.25f },
                    { "c18af6a8-d90b-49e0-bba4-29fce26acaae", "https://example.com/images/garlic_bread.jpg", -5, "Garlic Bread", 4.25f }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Meals",
                keyColumn: "Id",
                keyValue: "13674975-5f6a-4b79-9f17-cfea791d28a2");

            migrationBuilder.DeleteData(
                table: "Meals",
                keyColumn: "Id",
                keyValue: "16677470-2c6b-446b-847f-f0b28b46ed0e");

            migrationBuilder.DeleteData(
                table: "Meals",
                keyColumn: "Id",
                keyValue: "2b267a03-dfa8-4f40-b0bb-f14b211ec3b4");

            migrationBuilder.DeleteData(
                table: "Meals",
                keyColumn: "Id",
                keyValue: "307b2786-62ac-42e8-8f7b-f2910184e435");

            migrationBuilder.DeleteData(
                table: "Meals",
                keyColumn: "Id",
                keyValue: "54835e48-1cec-4163-be1a-030a901e7d85");

            migrationBuilder.DeleteData(
                table: "Meals",
                keyColumn: "Id",
                keyValue: "7d3a1483-002d-42bc-8ef4-18c018b10e12");

            migrationBuilder.DeleteData(
                table: "Meals",
                keyColumn: "Id",
                keyValue: "8b6d9548-287e-404a-984a-dfdf2a39acf3");

            migrationBuilder.DeleteData(
                table: "Meals",
                keyColumn: "Id",
                keyValue: "ab6f9c58-9df4-4b2c-930a-112eac5d2b91");

            migrationBuilder.DeleteData(
                table: "Meals",
                keyColumn: "Id",
                keyValue: "c18af6a8-d90b-49e0-bba4-29fce26acaae");
        }
    }
}
