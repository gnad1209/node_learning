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
//     public class BaoCaoController : Controller
//     {
//         // GET: Admin/BaoCao
//         WebDataEntities3 db = new WebDataEntities3();
//         public ActionResult Index()
//         {
//             List<DatHang> lst = db.DatHang.ToList();
//             ViewBag.MaKH = new SelectList(db.KhachHang, "MaKH", "TenKH");
//             ViewBag.IdTrangThai = new SelectList(db.TrangThai, "IdTrangThai", "Name");
//             //ViewBag.MaPhieuDat = new SelectList(db.Dathang, "MaPhieuDat", "MaCTPhieuDat");
//             ViewBag.Id = new SelectList(db.SanPham, "Id", "Name");
//             return View(lst);
//         }
//         //public ActionResult Index(int? searchBy, string Search)
//         //{
//         //    List<DatHang> lst;
//         //    if (searchBy == null && Search == null)
//         //    {
//         //        lst = db.DatHang.ToList();
//         //    }
//         //    else
//         //    {
//         //        if (searchBy == null)
//         //        {
//         //            lst = db.DatHang.Where(x => x.ThoiGianDat == Search.date).ToList();
//         //        }
//         //    }
//         //    ViewBag.MaKH = new SelectList(db.KhachHang, "MaKH", "TenKH");
//         //    ViewBag.IdTrangThai = new SelectList(db.TrangThai, "IdTrangThai", "Name");
//         //    ViewBag.Id = new SelectList(db.SanPham, "Id", "Name");
//         //    return View(lst);
//         //}
//     }
// }