using BookmarkManager.Data;
using BookmarkManager.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private readonly string _connectionString;

        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet("getTopBookmarks")]
        public List<TopBookmark> GetTopBookmarks()
        {
            var repo = new BookmarkManagerRepository(_connectionString);
            return repo.GetTopFiveBookmarks();
        }

        [HttpGet("getBookmarks")]
        [Authorize]
        public List<Bookmark> GetBookmarks()
        {
            var repo = new BookmarkManagerRepository(_connectionString);
            var user = repo.GetByEmail(User.Identity.Name);
            return repo.GetBookmarksByUserId(user.Id);
        }

        [HttpPost("addbookmark")]
        [Authorize]
        public void AddBookmark(Bookmark bookmark)
        {
            var repo = new BookmarkManagerRepository(_connectionString);
            bookmark.UserId = GetCurrentUser().Id;
            repo.AddBookmark(bookmark);
        }

        [HttpPost("update")]
        [Authorize]
        public void UpdateBookmarkTitle(UpdateTitleViewModel vm)
        {
            var repo = new BookmarkManagerRepository(_connectionString);
            repo.UpdateBookmark(vm.Title, vm.BookmarkId);
        }

        [HttpPost("delete")]
        [Authorize]
        public void DeleteBookmark(DeleteBookmarkViewModel vm)
        {
            var repo = new BookmarkManagerRepository(_connectionString);
            repo.DeleteBookmark(vm.BookmarkId);
        }

        public User GetCurrentUser()
        {
            var repo = new BookmarkManagerRepository(_connectionString);
            var user = repo.GetByEmail(User.Identity.Name);
            return user;
        }
    }
}
