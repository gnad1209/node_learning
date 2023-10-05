using DAWEB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DAWEB.Areas.Admin.Controllers
{
    public class HomeController : Controller
    {
        WebDataEntities3 db = new WebDataEntities3();
        // GET: Admin/Home
        public ActionResult Index()
        {
            if (Session["User"] == null)
            {
                return RedirectToAction("DangNhap");
            }


                // lấy ra danh sách các sản phẩm truy vấn dữ liệu từ Category
                List<SanPham> lst = db.SanPham.ToList();
                //var check1 = (from item in db.SanPham orderby item.Gia ascending select item).ToList();
            return View(lst);
        }
        public ActionResult DangNhap()
        {
            return View();
        }
        [HttpPost]
        public ActionResult DangNhap(string username, string password)
        {

            int demtk = db.TaiKhoan.Count(m => m.TaiKhoan1.ToLower() == username.ToLower() && m.MatKhau == password);

            if (demtk > 0)
            {
                Session.Add("user", username);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }
        public ActionResult Add()
        {
            return View();
        }

        //POST: Add category from model
        [HttpPost]
        public ActionResult Add(TaiKhoan obj)
        {
            //Thuc hien insert obj vao db
            try
            {
                //B2: thuc thi truy van LinQ
                db.TaiKhoan.Add(obj);
                db.SaveChanges();
                //ViewBag.Message = "Them moi thanh cong";
                return RedirectToAction("Add");
            }
            catch
            {
                ViewBag.Message = "Them moi that bai";
            }
            return View();
        }

    }
}