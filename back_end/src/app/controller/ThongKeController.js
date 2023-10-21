// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Web;
// using System.Web.Mvc;
// using System.Data.Entity;
// using System.Net;
// using System.Data;
// using DAWEB.Models;

// namespace DAWEB.Areas.Admin.Controllers
// {
//     public class ThongKeController : Controller
//     {
//         WebDataEntities3 db = new WebDataEntities3();

//         // GET: Admin/ThongKe
//         public ActionResult Index()
//         {
//             List<DatHang> lst = db.DatHang.ToList();
//             ViewBag.MaKH = new SelectList(db.KhachHang, "MaKH", "TenKH");
//             ViewBag.IdTrangThai = new SelectList(db.TrangThai, "IdTrangThai", "Name");
//             //ViewBag.MaPhieuDat = new SelectList(db.Dathang, "MaPhieuDat", "MaCTPhieuDat");
//             ViewBag.Id = new SelectList(db.SanPham, "Id", "Name");
//             return View(lst);
//         }
//         public ActionResult Edit(int? ID)
//         {
//             if (ID == null)
//             {
//                 return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
//             }
//             DatHang SP = db.DatHang.Find(ID);

//             if (SP == null)
//             {
//                 return HttpNotFound();
//             }
//             ViewBag.IdTrangThai = new SelectList(db.TrangThai, "Id", "Name", SP.IdTrangThai);
//             return View(SP);
//         }

//         // POST: Admin/Products/Edit/5
//         // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
//         // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
//         [HttpPost]
//         [ValidateAntiForgeryToken]
//         public ActionResult Edit([Bind(Include = "Id,IdSanPham,ThoiGianDat,DiaChi,MaKH,SoLuong,ThanhTien,IdTrangThai")] DatHang SP)
//         {

//             if (ModelState.IsValid)
//             {
//                 try
//                 {

//                     //string fileName = "";
//                     //var f = Request.Files["fileImg"];
//                     //if (f != null && f.ContentLength > 0)
//                     //{
//                     //    string[] ext = f.FileName.Split('.');
//                     //    fileName = DateTime.Now.ToString("yyyyMMddHHmmssffff") + "." + ext[ext.Length - 1];
//                     //    string path = Server.MapPath("~/images/" + fileName);
//                     //    f.SaveAs(path);
//                     //}
//                     //SP.images = fileName;
//                     db.Entry(SP).State = EntityState.Modified;
//                     db.SaveChanges();

//                     return RedirectToAction("Index");
//                 }
//                 catch (Exception ex)
//                 {
//                     ViewBag.Message = ex.ToString();
//                 }
//                 return RedirectToAction("Index");
//             }
//             ViewBag.DatHang = new SelectList(db.DatHang, "Id", "IdTrangThai", SP.Id);
//             return View(SP);
//         }
//     }
// }