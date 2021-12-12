using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalesManagementApp.Migrations
{
    public partial class renameproductprice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "price",
                table: "Product",
                newName: "Price");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Product",
                newName: "price");
        }
    }
}
