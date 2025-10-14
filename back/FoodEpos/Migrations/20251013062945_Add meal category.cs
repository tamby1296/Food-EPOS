using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FoodEpos.API.Migrations
{
    /// <inheritdoc />
    public partial class Addmealcategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "ImgURL",
                table: "Meals",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "MealCategoryId",
                table: "Meals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "MealCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealCategories", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "MealCategories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { -6, "Dessert" },
                    { -5, "Appetizer" },
                    { -4, "Grill" },
                    { -3, "Soup" },
                    { -2, "Cold dishes" },
                    { -1, "Hot dishes" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Meals_MealCategoryId",
                table: "Meals",
                column: "MealCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_MealCategories_MealCategoryId",
                table: "Meals",
                column: "MealCategoryId",
                principalTable: "MealCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_MealCategories_MealCategoryId",
                table: "Meals");

            migrationBuilder.DropTable(
                name: "MealCategories");

            migrationBuilder.DropIndex(
                name: "IX_Meals_MealCategoryId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "MealCategoryId",
                table: "Meals");

            migrationBuilder.AlterColumn<string>(
                name: "ImgURL",
                table: "Meals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "Meals",
                columns: new[] { "Id", "ImgURL", "Name", "Price" },
                values: new object[,]
                {
                    { "13674975-5f6a-4b79-9f17-cfea791d28a2", "https://example.com/images/margherita.jpg", "Margherita Pizza", 9.99f },
                    { "16677470-2c6b-446b-847f-f0b28b46ed0e", "https://example.com/images/caesar.jpg", "Chicken Caesar Salad", 8.5f },
                    { "2b267a03-dfa8-4f40-b0bb-f14b211ec3b4", "https://example.com/images/bolognese.jpg", "Spaghetti Bolognese", 11.25f },
                    { "307b2786-62ac-42e8-8f7b-f2910184e435", "https://example.com/images/salmon.jpg", "Grilled Salmon", 14.95f },
                    { "54835e48-1cec-4163-be1a-030a901e7d85", "https://example.com/images/buddha.jpg", "Vegan Buddha Bowl", 10.5f },
                    { "7d3a1483-002d-42bc-8ef4-18c018b10e12", "https://example.com/images/burger.jpg", "Beef Burger", 12f },
                    { "8b6d9548-287e-404a-984a-dfdf2a39acf3", "https://example.com/images/lava_cake.jpg", "Chocolate Lava Cake", 6.75f }
                });
        }
    }
}
