// using DAWEB.Models;
// using System;
// using System.Data.Entity;
// using System.Collections.Generic;
// using System.Linq;
// using System.Web;
// using System.Web.Mvc;


// namespace DAWEB.Areas.Admin.Controllers
// {
//     public class DanhMucSanPhamController : Controller
//     {
//         WebDataEntities3 db = new WebDataEntities3();

//         // GET: Admin/DanhMucSanPham
//         public ActionResult DanhMucSanPham()
//         {
//             var lst = db.DanhMucSanPham.ToList();
//             return View(lst);
//         }
//         public ActionResult Add()
//         {
//             return View();
//         }

//         //POST: Add category from model
//         [HttpPost]
//         public ActionResult Add(DanhMucSanPham obj)
//         {
//             try
//             {
//                 //B2: thực hiện truy vấn thêm dữ liệu
//                 db.DanhMucSanPham.Add(obj);
//                 db.SaveChanges();
//                 ViewBag.Message = "Thêm mới thành công";
//                 return RedirectToAction("DanhMucSanPham");
//             }
//             catch
//             {
//                 ViewBag.Message = "Thêm mới thất bại";
//             }
//             return View();
//         }
//         public ActionResult Delete(int id)
//         {
//             // lấy dữ liệu của Khachhang theo MaKH tương ứng
//             DanhMucSanPham obj = db.DanhMucSanPham.Find(id);
//             return View(obj);
//         }
//         public ActionResult DeleteByID(int id)
//         {
//             DanhMucSanPham obj = db.DanhMucSanPham.Find(id);
//             db.DanhMucSanPham.Remove(obj);
//             db.SaveChanges();
//             return RedirectToAction("DanhMucSanPham");
//         }
//         public ActionResult Edit(int id)
//         {
//             // lấy dữ liệu của Khachhang theo MaKH tương ứng
//             DanhMucSanPham ID = db.DanhMucSanPham.Find(id);
//             return View(ID);
//         }
//         public ActionResult EditbyID(DanhMucSanPham DMSP)
//         {
//             // lấy dữ liệu của Khachhang theo MaKH tương ứng
//             db.Entry(DMSP).State = EntityState.Modified;
//             db.SaveChanges();
//             return RedirectToAction("DanhMucSanPham");
//         }
//     }
// }